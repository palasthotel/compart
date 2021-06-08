<?php


namespace Palasthotel\WordPress\CommunityParticipation;

use Palasthotel\WordPress\CommunityParticipation\Routing\Proposals;
use Palasthotel\WordPress\CommunityParticipation\Routing\Votings;

class REST extends Component\Component {

	const NAMESPACE = "compart/v1";

	public function onCreate() {
		add_action( 'rest_api_init', [ $this, 'rest_api_init' ] );
	}

	public function rest_api_init() {
		new Proposals($this);
		new Votings($this);
	}

}