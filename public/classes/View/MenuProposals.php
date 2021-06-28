<?php


namespace Palasthotel\WordPress\CommunityParticipation\View;


use Palasthotel\WordPress\CommunityParticipation\Components\Component;
use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Plugin;

class MenuProposals extends Component {

	const SLUG = "community-proposals";

	private ProposalEditor $editor;

	public function onCreate() {
		$this->editor = new ProposalEditor();
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

		$this->editor->handleFormRequest( $this->plugin->database );

		wp_enqueue_script( Plugin::HANDLE_PROPOSALS_ADMIN_JS );

		echo "<div class='wrap'>";
		$proposal = null;
		if ( isset( $_GET["proposal_id"] ) ) {
			$proposalId = intval( $_GET["proposal_id"] );
			$proposal   = $this->plugin->database->getProposal( $proposalId );
		}

		if ( $proposal instanceof Proposal ) {
			$this->editor->render( $proposal );

		} else {
			$table = new ProposalsTable( $this->plugin->database );
			?>
            <style>
                .column-id {
                    width: 40px
                }

                .column-status {
                    width: 140px;
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
		echo "</div>";
	}


}