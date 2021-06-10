<?php


namespace Palasthotel\WordPress\CommunityParticipation\BlockX;

use Palasthotel\WordPress\BlockX\Blocks\_BlockType;
use Palasthotel\WordPress\BlockX\Model\BlockId;
use Palasthotel\WordPress\BlockX\Model\ContentStructure;

class UserProposalForm extends _BlockType {

	public function id(): BlockId {
		return BlockId::build("compart", "user-proposal-form");
	}

	public function category(): string {
		return "widget";
	}

	public function title(): string {
		return "User proposal form";
	}

	public function contentStructure(): ContentStructure {
		return new ContentStructure();
	}
}