<?php


namespace Palasthotel\WordPress\CommunityParticipation\Routing;


use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Model\Response\ConnectionsResponse;
use Palasthotel\WordPress\CommunityParticipation\Model\VotingPostConnection;
use Palasthotel\WordPress\CommunityParticipation\Plugin;
use Palasthotel\WordPress\CommunityParticipation\REST;
use WP_REST_Request;
use WP_REST_Server;

/**
 * @property Plugin plugin
 */
class VotingToPost {

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

					return get_post_status($value) !== false;
				},
				'sanitize_callback' => function ( $value ) {
					return abs( intval( $value ) );
				}
			),
		];

		register_rest_route( REST::NAMESPACE, '/votings/(?P<voting_id>\d+)/proposal/(?P<proposal_id>\d+)/create-post', array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => [ $this, 'createPost' ],
			'permission_callback' => function ( WP_REST_Request $request ) {
				return current_user_can("edit_posts");
			},
			'args'                => [
				"proposal_id" => $args["proposal_id"],
				"voting_id"    => $args["voting_id"],
			]
		) );

	}


	public function createPost( WP_REST_Request $request ) {

		$votingId   = $request->get_param( "voting_id" );
		$proposalId = $request->get_param( "proposal_id" );
		$proposal = $this->plugin->database->getProposal($proposalId);

		$post_id = wp_insert_post([
			"post_title" => $proposal->summary,
			"post_status" => "draft",
		]);

		if($post_id instanceof \WP_Error){
			return $post_id;
		}

		$connection = new VotingPostConnection();
		$connection->postId = $post_id;
		$connection->votingId = $votingId;
		$connection->proposalId = $proposalId;

		$this->plugin->database->setPostConnection($connection);

		return new ConnectionsResponse($connection);
	}

}