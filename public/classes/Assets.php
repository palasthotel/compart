<?php


namespace Palasthotel\WordPress\CommunityParticipation;


class Assets extends Component\Assets {

	public function register() {
		// -----------------------------------
		// register public api
		// -----------------------------------
		$this->registerScript(
			Plugin::HANDLE_PROPOSALS_PUBLIC_API_JS,
			"dist/public-api.js"
		);
		$this->localize(Plugin::HANDLE_PROPOSALS_PUBLIC_API_JS);


		// -----------------------------------
		// register app js for default ui interactions
		// -----------------------------------
		$this->registerScript(
			Plugin::HANDLE_PROPOSALS_PUBLIC_APP_JS,
			"dist/public-app.js",
			["jquery", Plugin::HANDLE_PROPOSALS_PUBLIC_API_JS]
		);
		$this->registerStyle(
			Plugin::HANDLE_PROPOSALS_PUBLIC_APP_STYLE,
			"dist/public-app.css"
		);
	}

	public function registerAdmin() {
		// -----------------------------------
		// register admin
		// -----------------------------------
		$this->registerScript(
			Plugin::HANDLE_PROPOSALS_ADMIN_JS,
			"dist/admin.js"
		);
		$this->registerStyle(
			Plugin::HANDLE_PROPOSALS_ADMIN_STYLE,
			"dist/admin.css"
		);

		// -----------------------------------
		// register gutenberg
		// -----------------------------------
		$this->registerScript(
			Plugin::HANDLE_GUTENBERG_JS,
			"dist/gutenberg.js"
		);
		$this->registerStyle(
			Plugin::HANDLE_GUTENBERG_STYLE,
			"dist/gutenberg.css"
		);
	}

	public function onPublicEnqueue( string $hook  ) {
		wp_enqueue_script(Plugin::HANDLE_PROPOSALS_PUBLIC_APP_JS);
		wp_enqueue_style(Plugin::HANDLE_PROPOSALS_PUBLIC_APP_STYLE);
	}


	function onAdminEnqueue( string $hook ) {
		wp_enqueue_style(Plugin::HANDLE_PROPOSALS_ADMIN_STYLE);

		// -----------------------------------
		// gutenberg
		// -----------------------------------
		if("post.php" === $hook){
			wp_enqueue_style(Plugin::HANDLE_GUTENBERG_STYLE);
		}
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