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
			"edit_posts",
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
		    $dateFilterView = new DateFilterView();
			$table = new ProposalsTable( $this->plugin->database, $dateFilterView );
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
                .proposals__date-filter{
                    float:right;
                }
            </style>
            <h2>Proposals</h2>
			<?php
            echo "<div>";
            echo "<div class='clearfix'>";
			$table->views();
			echo "</div>";
			$table->prepare_items();
			$dateFilterView->display();
			$table->display();
			echo "</div>";

		}
		echo "</div>";
	}


}