<?php


namespace Palasthotel\WordPress\CommunityParticipation\View;


use Palasthotel\WordPress\CommunityParticipation\_Component;
use Palasthotel\WordPress\CommunityParticipation\Plugin;
use Palasthotel\WordPress\CommunityParticipation\REST;

class MenuProposals extends _Component {

	const SLUG = "community-participation";

	public function onCreate() {
		parent::onCreate();
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
	}

	public function admin_menu() {
		add_submenu_page(
			Menu::SLUG,
			__('Proposals', Plugin::DOMAIN),
			__('Proposals', Plugin::DOMAIN),
			"manage_options",
			"community-proposals",
			[$this, 'render_proposals']
		);
	}

	public function render_proposals(){
		wp_enqueue_script(Plugin::HANDLE_PROPOSALS_ADMIN_JS);
		echo "<div id='community-proposals'>...</div>";
	}
}