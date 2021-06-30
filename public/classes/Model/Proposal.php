<?php


namespace Palasthotel\WordPress\CommunityParticipation\Model;


use DateTime;

class Proposal {

	const STATUS_WAITING = "waiting";
	const STATUS_REJECTED = "rejected";
	const STATUS_ACCEPTED = "accepted";
	const STATUS_FINISHED = "finished";

	const STATUSES = [
		Proposal::STATUS_WAITING,
		Proposal::STATUS_ACCEPTED,
		Proposal::STATUS_REJECTED,
		Proposal::STATUS_FINISHED
	];

	var $id;
	var $text;
	var $summary;
	var $notes;
	var $userId;
	var $status;
	var $created;
	var $modified;

	var $connection;

	public function __construct() {
		$this->created = new DateTime();
		$this->summary = "";
		$this->notes = "";
	}
}