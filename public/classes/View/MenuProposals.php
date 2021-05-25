<?php


namespace Palasthotel\WordPress\CommunityParticipation\View;


use Palasthotel\WordPress\CommunityParticipation\_Component;
use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Plugin;

class MenuProposals extends _Component {

	const SLUG = "community-proposals";

	public function onCreate() {
		parent::onCreate();
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
	}

	public function admin_menu() {
		add_submenu_page(
			Menu::SLUG,
			__( 'Proposals', Plugin::DOMAIN ),
			__( 'Proposals', Plugin::DOMAIN ),
			"manage_options",
			self::SLUG,
			[ $this, 'render_proposals' ]
		);
	}

	public function render_proposals() {
		wp_enqueue_script( Plugin::HANDLE_PROPOSALS_ADMIN_JS );

		echo "<div class='wrap'>";
		$proposal = null;
		if(isset($_GET["proposal_id"])){
            $proposalId = intval($_GET["proposal_id"]);
            $proposal = $this->plugin->database->getProposal($proposalId);

        }
		if($proposal instanceof Proposal){
			$this->renderEditor($proposal);
		} else {
		    $this->renderList();
        }
		echo "</div>";
	}

	private function renderList(){

		$table = new ProposalsTable( $this->plugin->database );
		?>
        <style>
            .column-id {
                width: 40px
            }

            .column-status {
                width: 100px;
            }

            .column-user_id {
                width: 40%;
            }
        </style>
        <h2>Proposals</h2>
		<?php
		$table->views();
		$table->prepare_items();
		$table->display();
	}

	private function renderEditor( Proposal $proposal ) {
	    echo "<h2>Proposal: $proposal->id</h2>";

		?>
        <style>
            #proposal-text {
                max-width: 600px;
                width: 100%;
            }
        </style>
		<?php

        $user = get_userdata($proposal->userId);
        echo "<div>User: $user->display_name</div>";

        echo "<div>";
        echo "<label>Status<br/>";
        echo "<select>";
        foreach (Proposal::STATUSES as $status){
            echo $selected = $status === $proposal->status ? "selected='selected'":"";
            echo "<option value='$status' $selected>$status</option>";
        }
        echo "</select>";
        echo "</label>";
        echo "</div>";


        echo "<div>";
	    echo "<textarea id='proposal-text' readonly rows='14'>$proposal->text</textarea>";
	    echo "</div>";
	}
}