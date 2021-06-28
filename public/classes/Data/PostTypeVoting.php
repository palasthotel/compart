<?php


namespace Palasthotel\WordPress\CommunityParticipation\Data;


use Palasthotel\WordPress\CommunityParticipation\Components\Component;
use Palasthotel\WordPress\CommunityParticipation\Plugin;
use Palasthotel\WordPress\CommunityParticipation\View\Menu;
use Palasthotel\WordPress\CommunityParticipation\View\VotingMetaBox;
use Palasthotel\WordPress\CommunityParticipation\View\VotingPostContentView;

/**
 * @property VotingMetaBox metaBox
 * @property VotingPostContentView postContent
 */
class PostTypeVoting extends Component {

	const SLUG = "community-voting";

	public function onCreate() {
		add_action( 'init', array( $this, 'init' ) );
		add_action( 'the_post', array( $this, 'the_post' ) );
		$this->metaBox = new VotingMetaBox($this->plugin);
		$this->postContent = new VotingPostContentView($this->plugin);
	}

	public function getSlug() {
		return apply_filters( Plugin::FILTER_CPT_COMMUNITY_VOTING_SLUG, self::SLUG );
	}

	public function the_post(\WP_Post $post){
		$post->votingPostConnection = $this->plugin->repo->getVotingPostConnection($post->ID);
	}

	public function init() {
		$labels  = array(
			'name'                  => _x( 'Votings', 'Post Type General Name', Plugin::DOMAIN ),
			'singular_name'         => _x( 'Voting', 'Post Type Singular Name', Plugin::DOMAIN ),
			'menu_name'             => __( 'Voting', Plugin::DOMAIN ),
			'name_admin_bar'        => __( 'Voting', Plugin::DOMAIN ),
			'archives'              => __( 'Voting', Plugin::DOMAIN ),
			'parent_item_colon'     => __( 'Parent voting:', Plugin::DOMAIN ),
			'all_items'             => __( 'Votings', Plugin::DOMAIN ),
			'add_new_item'          => __( 'Add voting', Plugin::DOMAIN ),
			'add_new'               => __( 'New voting', Plugin::DOMAIN ),
			'new_item'              => __( 'New', Plugin::DOMAIN ),
			'edit_item'             => __( 'Edit', Plugin::DOMAIN ),
			'update_item'           => __( 'Update', Plugin::DOMAIN ),
			'view_item'             => __( 'View', Plugin::DOMAIN ),
			'search_items'          => __( 'Search', Plugin::DOMAIN ),
			'not_found'             => __( 'Not found', Plugin::DOMAIN ),
			'not_found_in_trash'    => __( 'Not found in trash', Plugin::DOMAIN ),
			'featured_image'        => __( 'Featured image', Plugin::DOMAIN ),
			'set_featured_image'    => __( 'Set featured image', Plugin::DOMAIN ),
			'remove_featured_image' => __( 'Remove featured image', Plugin::DOMAIN ),
			'use_featured_image'    => __( 'Use as featured image', Plugin::DOMAIN ),
			'insert_into_item'      => __( 'Insert into item', Plugin::DOMAIN ),
			'uploaded_to_this_item' => __( 'Uploaded to this item', Plugin::DOMAIN ),
			'items_list'            => __( 'Items list', Plugin::DOMAIN ),
			'items_list_navigation' => __( 'Items list navigation', Plugin::DOMAIN ),
			'filter_items_list'     => __( 'Filter items list', Plugin::DOMAIN ),
		);
		$rewrite = array(
			'slug'       => $this->getSlug(),
			'with_front' => true,
			'pages'      => true,
			'feeds'      => true,
		);
		$args    = array(
			'label'               => __( 'Votings', Plugin::DOMAIN ),
			'description'         => __( 'Adds custom post type community voting', Plugin::DOMAIN ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'revisions' ),
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => Menu::SLUG,
			'menu_position'       => 5,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => true,
			'exclude_from_search' => false,
			'publicly_queryable'  => true,
			'rewrite'             => $rewrite,
			'capability_type'     => 'post',
		);
		register_post_type( $this->getSlug(), $args );
	}

}