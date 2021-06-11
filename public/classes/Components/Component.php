<?php


namespace Palasthotel\WordPress\CommunityParticipation\Components;

/**
 * Class Component
 *
 * @property \Palasthotel\WordPress\CommunityParticipation\Plugin plugin
 *
 * @version 0.1.1
 */
abstract class Component {
	/**
	 * _Component constructor.
	 *
	 */
	public function __construct(\Palasthotel\WordPress\CommunityParticipation\Plugin $plugin) {
		$this->plugin = $plugin;
		$this->onCreate();
	}

	/**
	 * overwrite this method in component implementations
	 */
	abstract function onCreate();
}