<?php


namespace Palasthotel\WordPress\CommunityParticipation\View;


use Palasthotel\WordPress\CommunityParticipation\Components\Component;
use Palasthotel\WordPress\CommunityParticipation\Plugin;

/**
 * @property MenuProposals proposals
 */
class Menu extends Component {

	const SLUG = "community-participation";

	public function onCreate() {
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
		$this->proposals = new MenuProposals($this->plugin);
	}

	public function admin_menu() {
		add_menu_page(
			__( 'Participations', Plugin::DOMAIN ),
			__( 'Participations', Plugin::DOMAIN ),
			"edit_posts",
			Menu::SLUG,
			null,
			"dashicons-share-alt",
			25
		);
	}
}