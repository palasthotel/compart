<?php


namespace Palasthotel\WordPress\CommunityParticipation;


use Palasthotel\WordPress\CommunityParticipation\BlockX\UserProposalForm;
use Palasthotel\WordPress\CommunityParticipation\BlockX\UserProposalsList;

class Gutenberg extends Components\Component {

	function onCreate() {
		add_action( 'enqueue_block_editor_assets', function () {
			$this->plugin->assets->enqueueGutenberg();
		} );
		add_action( 'plugins_loaded', [ $this, 'plugins_loaded' ] );
	}

	public function plugins_loaded() {
		if ( ! class_exists( "\Palasthotel\WordPress\BlockX\Plugin" ) ) {
			return;
		}
		add_action( \Palasthotel\WordPress\BlockX\Plugin::ACTION_COLLECT, [ $this, 'collect' ] );
		add_filter( \Palasthotel\WordPress\BlockX\Plugin::FILTER_ADD_TEMPLATES_PATHS, [ $this, 'add_template_paths' ] );
	}

	public function collect( \Palasthotel\WordPress\BlockX\Gutenberg $gutenberg ) {
		$gutenberg->addBlockType( new UserProposalForm() );
		$gutenberg->addBlockType( new UserProposalsList() );
	}

	public function add_template_paths( $paths ) {
		$paths[] = $this->plugin->path . "/templates";

		return $paths;
	}
}