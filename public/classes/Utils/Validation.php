<?php


namespace Palasthotel\WordPress\CommunityParticipation\Utils;


use Palasthotel\WordPress\CommunityParticipation\Data\Reactions;
use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;

class Validation {

	public static function isValidProposalState( $value ): bool {
		return is_string( $value ) && in_array( $value, Proposal::STATUSES );
	}

	public static function isValidReaction( $value ): bool {
		return is_string($value) && in_array($value, Reactions::get());
	}
}