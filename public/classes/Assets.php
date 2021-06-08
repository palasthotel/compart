<?php


namespace Palasthotel\WordPress\CommunityParticipation;


class Assets extends Component\Assets {

	public function onPublicEnqueue( string $hook  ) {

		// -----------------------------------
		// enqueue public api
		// -----------------------------------
		$this->registerScript(
			Plugin::HANDLE_PROPOSALS_PUBLIC_API_JS,
			"dist/public-api.js"
		);
		$this->localize(Plugin::HANDLE_PROPOSALS_PUBLIC_API_JS);

		// -----------------------------------
		// enqueue app js for default ui interactions
		// -----------------------------------
		$this->registerScript(
			Plugin::HANDLE_PROPOSALS_PUBLIC_APP_JS,
			"dist/public-app.js",
			["jquery", Plugin::HANDLE_PROPOSALS_PUBLIC_API_JS]
		);

		if(!is_admin() && is_singular($this->plugin->postTypeVoting->getSlug())){
			wp_enqueue_script(Plugin::HANDLE_PROPOSALS_PUBLIC_APP_JS);
		}
	}

	function onAdminEnqueue( string $hook ) {
		$this->registerScript(
			Plugin::HANDLE_PROPOSALS_ADMIN_JS,
			"dist/admin.js"
		);
		$this->registerStyle(
			Plugin::HANDLE_PROPOSALS_ADMIN_STYLE,
			"dist/admin.css"
		);
		wp_enqueue_style(Plugin::HANDLE_PROPOSALS_ADMIN_STYLE);
	}

	public function localize($handle, $additional = []){
		wp_localize_script(
			$handle,
			"Compart",
			array_merge(
				$additional,
				[ "rest_namespace" => REST::NAMESPACE, ],
			)
		);
	}

}