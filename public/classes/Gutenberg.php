<?php


namespace Palasthotel\WordPress\CommunityParticipation;


use Palasthotel\WordPress\CommunityParticipation\BlockX\UserProposalForm;

class Gutenberg extends Components\Component {

	function onCreate() {
		add_action( 'enqueue_block_editor_assets', function () {
			wp_enqueue_script(Plugin::HANDLE_GUTENBERG_JS);
			wp_enqueue_style(Plugin::HANDLE_GUTENBERG_STYLE);
		});
		add_action('plugins_loaded', [$this, 'plugins_loaded']);
	}

	public function plugins_loaded(){
		if(!class_exists("\Palasthotel\WordPress\BlockX\Plugin")){
			return;
		}
		add_action(\Palasthotel\WordPress\BlockX\Plugin::ACTION_COLLECT, [$this, 'collect']);
		add_filter(\Palasthotel\WordPress\BlockX\Plugin::FILTER_ADD_TEMPLATES_PATHS, [$this, 'add_template_paths']);
	}

	public function collect(\Palasthotel\WordPress\BlockX\Gutenberg $gutenberg){
		$gutenberg->addBlockType(new UserProposalForm());
	}

	public function add_template_paths($paths){
		$paths[] = $this->plugin->path."/templates";
		return $paths;
	}
}