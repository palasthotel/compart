<?php


namespace Palasthotel\WordPress\CommunityParticipation\View;

use Palasthotel\WordPress\CommunityParticipation\Components\Component;
use Palasthotel\WordPress\CommunityParticipation\Data\PostTypeVoting;
use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Model\ProposalQueryArgs;
use Palasthotel\WordPress\CommunityParticipation\Model\Response\ConnectionsResponse;
use Palasthotel\WordPress\CommunityParticipation\Model\VoteQueryArgs;
use Palasthotel\WordPress\CommunityParticipation\Model\VotingPostConnection;
use Palasthotel\WordPress\CommunityParticipation\Model\VotingProposal;
use Palasthotel\WordPress\CommunityParticipation\Plugin;

class VotingMetaBox extends Component {

	function onCreate() {
		add_action( 'add_meta_boxes', function ( $post_type ) {
			if ( $post_type === $this->plugin->postTypeVoting->getSlug() ) {
				add_meta_box(
					PostTypeVoting::SLUG,
					__( 'Voting', Plugin::DOMAIN ),
					[ $this, 'render_meta_box' ],
					$post_type,
					"normal",
					"high"
				);
			}
		} );
		add_action( 'save_post', [ $this, 'save_post' ] );
	}

	public function render_meta_box() {

		$args          = new ProposalQueryArgs();
		$args->status  = Proposal::STATUS_ACCEPTED;
		$proposals     = $this->plugin->database->queryProposals( $args );
		$notEmptyItems = array_filter( $proposals, function ( $proposal ) {
			return ! empty( $proposal->summary );
		} );
		usort( $notEmptyItems, function ( $a, $b ) {
			return $a->userId - $b->userId;
		} );

		wp_enqueue_script( Plugin::HANDLE_PROPOSALS_ADMIN_JS );
		$args           = new VoteQueryArgs();
		$args->votingId = get_the_ID();

		$connection         = $this->plugin->database->getConnectedPostConnection( get_the_ID() );
		$connectionResponse = null;
		if ( $connection instanceof VotingPostConnection ) {
			$connectionResponse = new ConnectionsResponse( $connection );
		}

		$this->plugin->assets->localize(
			Plugin::HANDLE_PROPOSALS_ADMIN_JS,
			[
				"i18n"       => [
					"save_changes"     => __( "Please update post to save changes", Plugin::DOMAIN ),
					"step_draft"       => __( "Preparation", Plugin::DOMAIN ),
					"step_open"        => __( "Voting", Plugin::DOMAIN ),
					"step_finished"    => __( "Finish", Plugin::DOMAIN ),
					"add_proposal"     => __( "Add proposal", Plugin::DOMAIN ),
					"add_proposal_btn" => __( "+ Add", Plugin::DOMAIN ),
					"winner_is"        => __( "And the winner is:", Plugin::DOMAIN ),
					"create_post"      => __( "Create post with connection to this voting result", Plugin::DOMAIN ),
					"post"             => __( "Post:", Plugin::DOMAIN ),
					"select_proposal"  => __( "Select proposal", Plugin::DOMAIN ),
					"start_voting_btn" => __( "Start voting", Plugin::DOMAIN ),
					"end_voting_btn"   => __( "End voting", Plugin::DOMAIN ),
				],
				"voting_id"  => get_the_ID(),
				"status"     => get_post_meta( get_the_ID(), Plugin::POST_META_STATUS, true ),
				"proposals"  => $notEmptyItems,
				"selection"  => $this->plugin->database->getProposalsByVoting( get_the_ID() ),
				"reactions"  => $this->plugin->database->queryVotingReactions( $args ),
				"connection" => $connectionResponse,
			]
		);

		echo "<div id='compart-voting-meta-box'>Configuration is loading...</div>";
	}

	public function save_post( $post_id ) {
		if ( get_post_type( $post_id ) !== $this->plugin->postTypeVoting->getSlug() ) {
			return;
		}
		if ( ! current_user_can( "edit_post", $post_id ) ) {
			return;
		}
		if ( ! isset( $_POST["voting_proposal_form"] ) || "true" !== $_POST["voting_proposal_form"] ) {
			return;
		}
		if ( ! isset( $_POST["voting_status"] ) || ! is_string( $_POST["voting_status"] ) ) {
			return;
		}
		if ( ! isset( $_POST["voting_proposals"] ) || ! is_array( $_POST["voting_proposals"] ) ) {
			return;
		}

		update_post_meta( $post_id, Plugin::POST_META_STATUS, sanitize_text_field( $_POST["voting_status"] ) );

		$arr = [];
		foreach ( $_POST["voting_proposals"] as $id ) {
			$arr[] = new VotingProposal( intval( $id ), intval( $post_id ) );
		}

		$this->plugin->database->removeVotingProposals( $post_id );
		$this->plugin->database->setVotingProposals( $arr );

		if ( isset( $_POST["voting_generate_post"] ) && ! empty( $_POST["voting_generate_post"] ) ) {
			$proposalId = intval( $_POST["voting_generate_post"] );
			$proposal   = $this->plugin->database->getProposal( $proposalId );
			if ( $proposal instanceof Proposal ) {
				$connection             = new VotingPostConnection();
				$connection->proposalId = $proposalId;
				$connection->votingId   = $post_id;
				$new_post_id            = wp_insert_post( [
					"post_title"  => $proposal->summary,
					"post_status" => "draft",
				] );

				if ( $new_post_id ) {
					$connection->postId = $new_post_id;
					$this->plugin->database->setPostConnection( $connection );
					$proposal->status = Proposal::STATUS_FINISHED;
					$this->plugin->database->updateProposal($proposal);
				}
			}
		}

	}
}