<?php


namespace Palasthotel\WordPress\CommunityParticipation;


class Assets extends \Palasthotel\WordPress\Assets {

	public function onPublicEnqueue( string $hook ) {
		$this->registerScript(
			Plugin::HANDLE_PROPOSALS_PUBLIC_JS,
			"dist/public.js"
		);
		$this->localize(Plugin::HANDLE_PROPOSALS_PUBLIC_JS);
	}

	function onAdminEnqueue( string $hook ) {
		$this->registerScript(
			Plugin::HANDLE_PROPOSALS_ADMIN_JS,
			"dist/admin.js"
		);
		$this->localize(Plugin::HANDLE_PROPOSALS_ADMIN_JS);
	}
	private function localize($handle, $additional = []){
		wp_localize_script(
			Plugin::HANDLE_PROPOSALS_ADMIN_JS,
			"Compart",
			array_merge(
				$additional,
				[ "rest_namespace" => REST::NAMESPACE, ],
			)
		);
	}

}