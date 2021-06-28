<?php


namespace Palasthotel\WordPress\CommunityParticipation\View;


use Palasthotel\WordPress\CommunityParticipation\Data\Database;
use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Plugin;
use Palasthotel\WordPress\CommunityParticipation\Utils\Labels;

class ProposalEditor {

	public function handleFormRequest( Database $database ) {
		if ( ! isset( $_POST["proposal_id"] ) || empty( $_POST["proposal_id"] ) ) {
			return;
		}
		$proposalId = intval( $_POST["proposal_id"] );
		$proposal   = $database->getProposal( $proposalId );
		if ( ! ( $proposal instanceof Proposal ) ) {
			return;
		}
		if ( isset( $_POST["proposal_status"] ) && ! empty( $_POST["proposal_status"] ) ) {
			$proposal->status = sanitize_text_field( $_POST["proposal_status"] );
		}
		if ( isset( $_POST["proposal_summary"] ) && ! empty( $_POST["proposal_summary"] ) ) {
			$proposal->summary = sanitize_text_field( $_POST["proposal_summary"] );
		}
		if ( isset( $_POST["proposal_text"] ) && ! empty( $_POST["proposal_text"] ) ) {
			$proposal->text = sanitize_text_field( $_POST["proposal_text"] );
		}
		if ( isset( $_POST["proposal_notes"] ) ) {
			$proposal->notes = sanitize_text_field( $_POST["proposal_notes"] );
		}

		$database->updateProposal( $proposal );

	}

	public function render( Proposal $proposal ) {

		$url = admin_url( "admin.php?page=" . MenuProposals::SLUG );
		printf( "<h2><a href='$url'>%s</a> > $proposal->id</h2>", __( "Proposals", Plugin::DOMAIN ) );
		?>
        <style>
            #proposal-text {
                max-width: 600px;
                width: 100%;
            }

            #proposal-summary {
                padding: 3px 8px;
                font-size: 1.2em;
                line-height: 100%;
                height: 1.7em;
                width: 100%;
                max-width: 600px;
                margin: 0 0 3px;
            }
        </style>
        <form method="post">
        <input type="hidden" name="proposal_id" value="<?php echo $proposal->id; ?>"/>
		<?php

		$user = get_userdata( $proposal->userId );
		$url  = get_edit_user_link( $proposal->userId );
		printf( "<p><strong>%s</strong>", __( "Community member", Plugin::DOMAIN ) );
		echo "<br/><a href='$url'>$user->display_name</a></p>";

		echo "<div>";
		echo "<label><strong>Status</strong><br/>";
		echo "<select name='proposal_status'>";
		$labels = [
			Proposal::STATUS_WAITING  => _x( "Waiting", "Proposal editor status", Plugin::DOMAIN ),
			Proposal::STATUS_ACCEPTED => _x( "Accepted", "Proposal editor status", Plugin::DOMAIN ),
			Proposal::STATUS_REJECTED => _x( "Rejected", "Proposal editor status", Plugin::DOMAIN ),
			Proposal::STATUS_FINISHED => _x( "Finished", "Proposal editor status", Plugin::DOMAIN ),
		];
		foreach ( Proposal::STATUSES as $status ) {
			$selected = $status === $proposal->status ? "selected='selected'" : "";
			$label = Labels::proposalStatus($status);
			echo "<option value='$status' $selected>$label</option>";
		}
		echo "</select>";
		echo "</label>";
		printf( "<p class='description'>%s</p>", __( "Status of the proposal.", Plugin::DOMAIN ) );
		echo "</div>";

		echo "<div>";
		printf( "<label><strong>%s</strong><br/>", __( "Summary", Plugin::DOMAIN ) );
		echo "<input id='proposal-summary' name='proposal_summary' value='$proposal->summary' />";
		echo "</label>";
		printf( "<p class='description'>%s</p>", __( "Editors summary of the proposal.", Plugin::DOMAIN ) );
		echo "</div>";

		echo "<div>";
		printf( "<label><strong>%s</strong><br/>", __( "Proposal", Plugin::DOMAIN ) );
		echo "<textarea id='proposal-text' name='proposal_text' rows='14'>$proposal->text</textarea>";
		echo "</label>";
		printf( "<p class='description'>%s</p>", __( "The input from the community member.", Plugin::DOMAIN ) );
		echo "</div>";

		echo "<div>";
		printf( "<label><strong>%s</strong><br/>", __( "Notes for proposer", Plugin::DOMAIN ) );
		echo "<textarea id='proposal-text' name='proposal_notes' rows='5'>$proposal->notes</textarea>";
		echo "</label>";
		printf( "<p class='description'>%s</p>", __( "Note for the community member.", Plugin::DOMAIN ) );
		echo "</div>";

		submit_button( __( "Save", Plugin::DOMAIN ) );

		?></form><?php
	}
}