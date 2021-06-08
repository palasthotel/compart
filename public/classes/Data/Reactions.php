<?php


namespace Palasthotel\WordPress\CommunityParticipation\Data;


use Palasthotel\WordPress\CommunityParticipation\Plugin;

class Reactions {
	/**
	 * @var null|string[]
	 */
	private static $reactions = null;
	public static function get(): array{
		if(!is_array(self::$reactions)){
			self::$reactions = apply_filters(Plugin::FILTER_REACTIONS, ["up"]);
		}
		return self::$reactions;
	}

}