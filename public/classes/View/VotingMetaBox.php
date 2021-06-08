<?php


namespace Palasthotel\WordPress\CommunityParticipation\View;


use Palasthotel\WordPress\CommunityParticipation\Component\Component;
use Palasthotel\WordPress\CommunityParticipation\Data\PostTypeVoting;
use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Model\ProposalQueryArgs;
use Palasthotel\WordPress\CommunityParticipation\Model\VotingProposal;
use Palasthotel\WordPress\CommunityParticipation\Plugin;

class VotingMetaBox extends Component {

	function onCreate() {
		add_action( 'add_meta_boxes', function ( $post_type ) {
			if ( $post_type === $this->plugin->postTypeVoting->getSlug() ) {
				add_meta_box(
					PostTypeVoting::SLUG,
					__( 'Voting configuration', Plugin::DOMAIN ),
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
		$this->plugin->assets->localize(
			Plugin::HANDLE_PROPOSALS_ADMIN_JS,
			[
				"proposals" => array_map( function ( $proposal ) {
					$user = get_userdata( $proposal->userId );

					return [
						"id"      => $proposal->id,
						"summary" => $proposal->summary,
						"user_id" => $proposal->userId,
						"user"    => $user,
					];
				}, $notEmptyItems ),
				"selection" => array_map(function($proposal){
					return $proposal->id;
				}, $this->plugin->database->getProposalsByVoting(get_the_ID())),
			]
		);

		echo "<div id='compart-voting-meta-box'></div>";
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
		if ( ! isset( $_POST["voting_proposals"] ) || ! is_array( $_POST["voting_proposals"] ) ) {
			return;
		}

		$arr = [];
		foreach ($_POST["voting_proposals"]  as $id){
			$arr[] = new VotingProposal(intval($id), intval($post_id));
		}

		$this->plugin->database->removeVotingProposals($post_id);
		$this->plugin->database->setVotingProposals($arr);

	}
}