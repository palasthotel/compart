<?php


namespace Palasthotel\WordPress\CommunityParticipation\Routing;


use Palasthotel\WordPress\CommunityParticipation\Model\ProposalQueryArgs;
use Palasthotel\WordPress\CommunityParticipation\Plugin;
use Palasthotel\WordPress\CommunityParticipation\REST;
use Palasthotel\WordPress\CommunityParticipation\Utils\Validation;
use WP_REST_Request;
use WP_REST_Server;

/**
 * @property Plugin plugin
 */
class Proposals {

	function __construct( REST $rest) {
		$this->plugin = $rest->plugin;

		register_rest_route( REST::NAMESPACE, '/proposals', array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => [ $this, 'createProposal' ],
			'permission_callback' => function ( WP_REST_Request $request ) {
				// only logged in users may create proposals
				return apply_filters(Plugin::FILTER_USER_CAN_PROPOSE, is_user_logged_in(), $request);
			},
			'args'                => [
				"text" => array(
					'required'          => true,
					'validate_callback' => function ( $param ) {
						return is_string( $param );
					},
					'sanitize_callback' => function ( $value ) {
						return sanitize_textarea_field( $value );
					}
				),
			]
		) );
		register_rest_route( REST::NAMESPACE, '/proposals/(?P<id>\d+)', array(
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => [ $this, 'updateProposal' ],
			'permission_callback' => function ( WP_REST_Request $request ) {
				// only editors
				return current_user_can( 'edit_posts' );
			},
			'args'                => [
				"status" => array(
					'required'          => true,
					'type'              => 'string',
					'validate_callback' => function ( $value, $request ) {
						return Validation::isValidProposalState( $value );
					},
					'sanitize_callback' => 'sanitize_textarea_field',
				),
			]
		) );
		register_rest_route( REST::NAMESPACE, '/proposals', array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => [ $this, 'queryProposals' ],
			'permission_callback' => function ( WP_REST_Request $request ) {

				// only logged in users may query for proposals
				if ( ! is_user_logged_in() ) {
					return false;
				}

				// subscribers may query for their own proposals
				if ( $request->has_param( "user_id" ) &&
				     $request->get_param( "user_id" ) === wp_get_current_user()->ID
				) {
					return true;
				}

				// permission level high enough to query for all?
				return current_user_can( 'edit_posts' );
			},
			'args'                => [
				"page"           => array(
					'required'          => false,
					'validate_callback' => 'is_numeric',
					'sanitize_callback' => function ( $value ) {
						return max( 1, intval( $value ) );
					}
				),
				"items_per_page" => array(
					'required'          => false,
					'validate_callback' => 'is_numeric',
					'sanitize_callback' => function ( $value ) {
						return max( 1, intval( $value ) );
					}
				),
				"search"         => array(
					'required'          => false,
					'type'              => 'string',
					'validate_callback' => 'is_string',
					'sanitize_callback' => 'sanitize_text_field',
				),
				"user_id"        => array(
					'required'          => false,
					'type'              => 'number',
					'validate_callback' => 'is_numeric',
					'sanitize_callback' => 'intval',
				),
				"voting_id"        => array(
					'required'          => false,
					'type'              => 'number',
					'validate_callback' => 'is_numeric',
					'sanitize_callback' => 'intval',
				),
			]
		) );
	}


	public function createProposal( WP_REST_Request $request ) {
		$text    = $request->get_param( "text" );
		$success = $this->plugin->database->addProposal( get_current_user_id(), $text );

		return [
			"success" => $success,
		];
	}

	public function updateProposal( WP_REST_Request $request ) {
		$proposalId = $request->get_param( "id" );
		$proposal   = $this->plugin->database->getProposal( $proposalId );

		$proposal->status = $request->get_param("status");

		return [
			"success" => $this->plugin->database->updateProposal( $proposal ),
		];
	}

	public function queryProposals( WP_REST_Request $request ) {
		$queryArgs = new ProposalQueryArgs();

		if ( is_user_logged_in() && current_user_can( 'subscriber' ) ) {
			$queryArgs->userId = get_current_user_id();
		} else if ( $request->has_param( "user_id" ) ) {
			$queryArgs->userId = $request->get_param( "user_id" );
		}

		if ( $request->has_param( "search" ) ) {
			$queryArgs->search = $request->get_param( "search" );
		}

		if ( $request->has_param( "items_per_page" ) ) {
			$limit            = $request->get_param( "items_per_page" );
			$queryArgs->limit = $limit;
		}

		if ( $request->has_param( "page" ) ) {
			$page              = $request->get_param( "page" );
			$queryArgs->offset = $queryArgs->limit * ( $page - 1 );
		}

		$proposals = $this->plugin->database->queryProposals( $queryArgs );

		return [
			"result"          => array_map( function ( $proposal ) {
				$user = get_userdata( $proposal->userId );

				return [
					"id"   => $proposal->id,
					"user" => $user ? [
						"ID"           => $user->ID,
						"display_name" => $user->display_name,
						"email"        => $user->user_email,
					] : false,
					"text" => $proposal->text,
				];
			}, $proposals ),
			"number_of_items" => $this->plugin->database->countProposals( $queryArgs ),
		];
	}
}