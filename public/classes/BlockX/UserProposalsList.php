<?php


namespace Palasthotel\WordPress\CommunityParticipation\BlockX;

use Palasthotel\WordPress\BlockX\Blocks\_BlockType;
use Palasthotel\WordPress\BlockX\Model\BlockId;
use Palasthotel\WordPress\BlockX\Model\ContentStructure;
use Palasthotel\WordPress\CommunityParticipation\Plugin;

class UserProposalsList extends _BlockType {

	public function id(): BlockId {
		return BlockId::build("compart", "user-proposals-list");
	}

	public function category(): string {
		return "widget";
	}

	public function title(): string {
		return _x("User proposals list", "blockx title", Plugin::DOMAIN);
	}

	public function contentStructure(): ContentStructure {
		return new ContentStructure();
	}
}