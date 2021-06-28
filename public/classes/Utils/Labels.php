<?php


namespace Palasthotel\WordPress\CommunityParticipation\Utils;


use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Plugin;

class Labels {


	public static function proposalStatus($status){
		$labels = [
			Proposal::STATUS_WAITING  => _x( "Waiting", "Proposal editor status", Plugin::DOMAIN ),
			Proposal::STATUS_ACCEPTED => _x( "Accepted", "Proposal editor status", Plugin::DOMAIN ),
			Proposal::STATUS_REJECTED => _x( "Rejected", "Proposal editor status", Plugin::DOMAIN ),
			Proposal::STATUS_FINISHED => _x( "Finished", "Proposal editor status", Plugin::DOMAIN ),
		];
		return $labels[ $status ] ?? $status;
	}
}