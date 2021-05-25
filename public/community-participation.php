<?php

namespace Palasthotel\WordPress\CommunityParticipation;

use Palasthotel\WordPress\CommunityParticipation\Data\Database;
use Palasthotel\WordPress\CommunityParticipation\Data\PostTypeProposal;
use Palasthotel\WordPress\CommunityParticipation\Data\PostTypeVoting;
use Palasthotel\WordPress\CommunityParticipation\View\Menu;
use Palasthotel\WordPress\CommunityParticipation\View\PostsTable;

/**
 * Plugin Name:       Community participation
 * Description:       Let community participate in the content creation
 * Version:           0.0.1
 * Requires at least: 5.0
 * Tested up to:      5.7.2
 * Text Domain:       compart
 * Author:            PALASTHOTEL by Edward
 * Author URI:        http://www.palasthotel.de
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

require_once dirname( __FILE__ ) . "/vendor/autoload.php";

/**
 * @property Database database
 * @property Menu menu
 * @property PostTypeVoting $postTypeVoting
 * @property PostsTable postsTable
 * @property Assets assets
 * @property REST rest
 */
class Plugin extends \Palasthotel\WordPress\Plugin {

	const DOMAIN = "compart";

	const FILTER_CPT_COMMUNITY_VOTING_SLUG = "compart_community_voting_slug";

	const HANDLE_PROPOSALS_ADMIN_JS = "compart-admin-js";
	const HANDLE_PROPOSALS_PUBLIC_JS = "compart-public-js";

	function onCreate() {

		load_plugin_textdomain(
			static::DOMAIN,
			false,
			dirname( plugin_basename( __FILE__ ) ) . '/languages'
		);


		$this->database = new Database();
		$this->assets = new Assets($this);

		$this->postTypeVoting   = new PostTypeVoting( $this );

		$this->rest = new REST($this);

		$this->menu       = new Menu( $this );
		$this->postsTable = new PostsTable( $this );

		if(WP_DEBUG){
			$this->database->createTables();
		}

	}

	public function onSiteActivation() {
		parent::onSiteActivation();
		$this->database->createTables();
	}

}

Plugin::instance();