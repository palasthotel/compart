<?php


namespace Palasthotel\WordPress\CommunityParticipation\View;


use Palasthotel\WordPress\CommunityParticipation\Data\Database;
use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;

class ProposalEditor {

	public function handleFormRequest( Database $database ) {
		if ( ! isset( $_POST["proposal_id"] ) || empty( $_POST["proposal_id"] ) ) {
			return;
		}
		$proposalId = intval( $_POST["proposal_id"] );
		$proposal = $database->getProposal($proposalId);
		if(!($proposal instanceof Proposal)){
		    return;
        }
		if ( isset( $_POST["proposal_status"] ) && ! empty( $_POST["proposal_status"] ) ) {
		    $proposal->status =  sanitize_text_field( $_POST["proposal_status"] );
		}
		if ( isset( $_POST["proposal_summary"] ) && ! empty( $_POST["proposal_summary"] ) ) {
		    $proposal->summary = sanitize_text_field( $_POST["proposal_summary"]);
		}
		if ( isset( $_POST["proposal_text"] ) && ! empty( $_POST["proposal_text"] ) ) {
			$proposal->text = sanitize_text_field( $_POST["proposal_text"]);
		}
		if ( isset( $_POST["proposal_notes"] ) ) {
			$proposal->notes = sanitize_text_field( $_POST["proposal_notes"]);
		}

		$database->updateProposal($proposal);

	}

	public function render( Proposal $proposal ) {

	    $url = admin_url("admin.php?page=".MenuProposals::SLUG);
		echo "<h2><a href='$url'>Proposals</a> > $proposal->id</h2>";
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
		echo "<p><strong>Community member</strong><br/><a href='$url'>$user->display_name</a></p>";

		echo "<div>";
		echo "<label><strong>Status</strong><br/>";
		echo "<select name='proposal_status'>";
		foreach ( Proposal::STATUSES as $status ) {
			echo $selected = $status === $proposal->status ? "selected='selected'" : "";
			echo "<option value='$status' $selected>$status</option>";
		}
		echo "</select>";
		echo "</label>";
		echo "<p class='description'>Proposal status.</p>";
		echo "</div>";

		echo "<div>";
		echo "<label><strong>Summary</strong><br/>";
		echo "<input id='proposal-summary' name='proposal_summary' value='$proposal->summary' />";
		echo "</label>";
		echo "<p class='description'>Editors summary of the proposal.</p>";
		echo "</div>";

		echo "<div>";
		echo "<label><strong>Proposal</strong><br/>";
		echo "<textarea id='proposal-text' name='proposal_text' rows='14'>$proposal->text</textarea>";
		echo "</label>";
		echo "<p class='description'>The input from a community member.</p>";
		echo "</div>";

		echo "<div>";
		echo "<label><strong>Notes for proposer</strong><br/>";
		echo "<textarea id='proposal-text' name='proposal_notes' rows='5'>$proposal->notes</textarea>";
		echo "</label>";
		echo "<p class='description'>Leave some note for the community member.</p>";
		echo "</div>";

		submit_button( "Save" );

		?></form><?php
	}
}