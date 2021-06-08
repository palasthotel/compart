<?php


namespace Palasthotel\WordPress\CommunityParticipation\Routing;


use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Model\VoteQueryArgs;
use Palasthotel\WordPress\CommunityParticipation\Plugin;
use Palasthotel\WordPress\CommunityParticipation\REST;
use Palasthotel\WordPress\CommunityParticipation\Utils\Validation;
use WP_REST_Request;
use WP_REST_Server;

/**
 * @property Plugin plugin
 */
class Votings {

	public function __construct( REST $rest ) {
		$this->plugin = $rest->plugin;

		$args = [
			"proposal_id" => array(
				'required'          => true,
				'validate_callback' => function ( $value ) {
					if ( ! is_numeric( $value ) ) {
						return false;
					}
					$proposal = $this->plugin->database->getProposal( $value );

					return $proposal instanceof Proposal;
				},
				'sanitize_callback' => function ( $value ) {
					return abs( intval( $value ) );
				}
			),
			"voting_id"   => array(
				'required'          => true,
				'validate_callback' => function ( $value ) {
					if ( ! is_numeric( $value ) ) {
						return false;
					}
					$proposal = $this->plugin->database->getProposal( $value );

					return $proposal instanceof Proposal;
				},
				'sanitize_callback' => function ( $value ) {
					return abs( intval( $value ) );
				}
			),
			"reaction"    => array(
				'required'          => true,
				'type'              => 'string',
				'validate_callback' => function ( $value, $request ) {
					return Validation::isValidReaction( $value );
				},
				'sanitize_callback' => 'sanitize_text_field',
			),
		];

		register_rest_route( REST::NAMESPACE, '/votings/(?P<voting_id>\d+)', array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => [ $this, 'getVotings' ],
			'permission_callback' => function ( WP_REST_Request $request ) {
				return is_user_logged_in();
			},
		) );
		register_rest_route( REST::NAMESPACE, '/votings/(?P<voting_id>\d+)', array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => [ $this, 'voteForProposal' ],
			'permission_callback' => function ( WP_REST_Request $request ) {
				return is_user_logged_in();
			},
			'args'                => [
				"proposal_id" => $args["proposal_id"],
				"reaction"    => $args["reaction"],
			]
		) );
		register_rest_route( REST::NAMESPACE, '/votings/(?P<voting_id>\d+)', array(
			'methods'             => WP_REST_Server::DELETABLE,
			'callback'            => [ $this, 'unvoteForProposal' ],
			'permission_callback' => function ( WP_REST_Request $request ) {
				// only editors
				return is_user_logged_in();
			},
			'args'                => [
				"proposal_id" => $args["proposal_id"],
			]
		) );
	}

	public function getVotings( WP_REST_Request $request ) {
		$userId         = get_current_user_id();
		$votingId       = $request->get_param( "voting_id" );
		$args           = new VoteQueryArgs();
		$args->votingId = $votingId;

		$votingReactions = $this->plugin->database->queryVotingReactions( $args );

		return is_array( $votingReactions ) ? array_map( function ( $reaction ) use ( $userId ) {
			return $reaction->userId === $userId ? $reaction : [
				"id"         => $reaction->id,
				"votingId"   => $reaction->votingId,
				"proposalId" => $reaction->proposalId,
				"type"       => $reaction->type
			];
		}, $votingReactions ) : [];
	}

	public function voteForProposal( WP_REST_Request $request ) {

		$userId     = get_current_user_id();
		$reaction   = $request->get_param( "reaction" );
		$votingId   = $request->get_param( "voting_id" );
		$proposalId = $request->get_param( "proposal_id" );

		return $this->plugin->database->setVotingReaction( $userId, $votingId, $proposalId, $reaction );
	}

	public function unvoteForProposal( WP_REST_Request $request ) {

		$userId     = get_current_user_id();
		$votingId   = $request->get_param( "voting_id" );
		$proposalId = $request->get_param( "proposal_id" );

		return $this->plugin->database->unsetVotingReaction( $userId, $votingId, $proposalId );
	}
}