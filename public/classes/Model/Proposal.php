<?php


namespace Palasthotel\WordPress\CommunityParticipation\Model;


use DateTime;

class Proposal {

	const STATUS_WAITING = "waiting";
	const STATUS_REJECTED = "rejected";
	const STATUS_ACCEPTED = "accepted";
	const STATUS_FINISHED = "finished";

	var $id;
	var $text;
	var $userId;
	var $status;
	var $created;
	var $modified;

	public function __construct() {
		$this->created = new DateTime();
	}
}