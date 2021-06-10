<?php

namespace Palasthotel\WordPress\CommunityParticipation;

use Palasthotel\WordPress\CommunityParticipation\Component\Templates;
use Palasthotel\WordPress\CommunityParticipation\Component\TextdomainConfig;
use Palasthotel\WordPress\CommunityParticipation\Data\Database;
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
 * @property Templates templates
 * @property Gutenberg gutenberg
 */
class Plugin extends Component\Plugin {

	const DOMAIN = "compart";

	const THEME = "plugin-parts";
	const TEMPLATE_USER_PROPOSAL_FORM = "compart-user-proposal-form.php";
	const TEMPLATE_VOTING = "compart-voting.php";
	const FILTER_ADD_TEMPLATE_PATHS = "compart_add_template_paths";

	const FILTER_CPT_COMMUNITY_VOTING_SLUG = "compart_community_voting_slug";
	const FILTER_REACTIONS = "compart_reactions";

	const HANDLE_PROPOSALS_ADMIN_JS = "compart-admin-js";
	const HANDLE_PROPOSALS_ADMIN_STYLE = "compart-admin-style";
	const HANDLE_PROPOSALS_PUBLIC_API_JS = "compart-public-api-js";
	const HANDLE_PROPOSALS_PUBLIC_APP_JS = "compart-public-app-js";
	const HANDLE_GUTENBERG_JS = "compart-gutenberg-js";
	const HANDLE_GUTENBERG_STYLE = "compart-gutenberg-css";

	function onCreate() {

		$this->textdomainConfig = new TextdomainConfig(
			Plugin::DOMAIN,
			"languages"
		);

		$this->templates = new Templates( $this );
		$this->templates->useThemeDirectory( self::THEME );
		$this->templates->useAddTemplatePathsFilter( self::FILTER_ADD_TEMPLATE_PATHS );

		$this->database = new Database();
		$this->assets   = new Assets( $this );

		$this->postTypeVoting = new PostTypeVoting( $this );
		$this->menu           = new Menu( $this );
		$this->postsTable     = new PostsTable( $this );
		$this->gutenberg = new Gutenberg($this);

		$this->rest = new REST( $this );

		if ( WP_DEBUG ) {
			$this->database->createTables();
		}

	}

	public function onSiteActivation() {
		parent::onSiteActivation();
		$this->database->createTables();
	}

}

Plugin::instance();

require_once dirname(__FILE__)."/public-functions.php";