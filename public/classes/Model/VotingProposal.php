<?php


namespace Palasthotel\WordPress\CommunityParticipation\Model;


/**
 * @property int|string $proposalId
 * @property int|string $votingId
 */
class VotingProposal {
	public function __construct($proposalId, $votingId) {
		$this->proposalId = $proposalId;
		$this->votingId = $votingId;
	}
}