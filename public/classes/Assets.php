<?php


namespace Palasthotel\WordPress\CommunityParticipation;

use Palasthotel\WordPress\CommunityParticipation\Components\Component;


/**
 * @property Components\Assets utils
 */
class Assets extends Component {

	public function onCreate() {
		$this->utils = new Components\Assets( $this->plugin );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin' ] );
	}

	public function enqueue() {
		// -----------------------------------
		// register public api
		// -----------------------------------
		$this->utils->registerScript(
			Plugin::HANDLE_PROPOSALS_PUBLIC_API_JS,
			"dist/public-api.js"
		);
		$this->localize( Plugin::HANDLE_PROPOSALS_PUBLIC_API_JS );


		// -----------------------------------
		// register app js for default ui interactions
		// -----------------------------------
		$this->utils->registerScript(
			Plugin::HANDLE_PROPOSALS_PUBLIC_APP_JS,
			"dist/public-app.js",
			[ "jquery", Plugin::HANDLE_PROPOSALS_PUBLIC_API_JS ]
		);
		$this->utils->registerStyle(
			Plugin::HANDLE_PROPOSALS_PUBLIC_APP_STYLE,
			"dist/public-app.css"
		);

		wp_enqueue_script( Plugin::HANDLE_PROPOSALS_PUBLIC_APP_JS );
		wp_enqueue_style( Plugin::HANDLE_PROPOSALS_PUBLIC_APP_STYLE );
	}

	public function enqueue_admin( string $hook ) {
		// -----------------------------------
		// register admin
		// -----------------------------------
		$this->utils->registerScript(
			Plugin::HANDLE_PROPOSALS_ADMIN_JS,
			"dist/admin.js"
		);
		$this->utils->registerStyle(
			Plugin::HANDLE_PROPOSALS_ADMIN_STYLE,
			"dist/admin.css"
		);

		wp_enqueue_style( Plugin::HANDLE_PROPOSALS_ADMIN_STYLE );

	}

	public function enqueueGutenberg(){
		$this->utils->registerScript(
			Plugin::HANDLE_GUTENBERG_JS,
			"dist/gutenberg.js"
		);
		$this->utils->registerStyle(
			Plugin::HANDLE_GUTENBERG_STYLE,
			"dist/gutenberg.css"
		);
		wp_enqueue_style( Plugin::HANDLE_GUTENBERG_STYLE );
		wp_enqueue_script(Plugin::HANDLE_GUTENBERG_JS);
	}

	public function localize( $handle, $additional = [] ) {
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