<?php


namespace Palasthotel\WordPress\CommunityParticipation\Data;

use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Model\ProposalQueryArgs;
use Palasthotel\WordPress\CommunityParticipation\Model\Vote;
use Palasthotel\WordPress\CommunityParticipation\Model\VoteQueryArgs;
use Palasthotel\WordPress\CommunityParticipation\Utils\DBHelper;

/**
 * @property string $tableProposals
 * @property string tableVotes
 */
class Database extends \Palasthotel\WordPress\Database {

	function init() {
		$this->tableProposals = $this->wpdb->prefix . "compart_proposals";
		$this->tableVotes     = $this->wpdb->prefix . "compart_votes";
	}

	/**
	 * @param $user_id
	 * @param $text
	 *
	 * @return bool|int
	 */
	public function addProposal( $user_id, $text ) {
		return $this->wpdb->insert(
			$this->tableProposals,
			[
				"user_id"  => $user_id,
				"proposal" => $text,
				"status"   => Proposal::STATUS_WAITING,
				"modified_date" => date("Y-m-d H:i:s"),
				"created_date" => date("Y-m-d H:i:s")
			],
			[ "%d", "%s", "%s", "%s", "%s" ]
		);
	}

	/**
	 * @param int $id
	 * @param string $status
	 *
	 * @return bool|int
	 */
	public function updateProposalStatus($id, $status){
		return $this->wpdb->update(
			$this->tableProposals,
			[ "status" => $status, "modified_date" => date("Y-m-d H:i:s") ],
			[ "id" => $id ],
			[ "%s", "%s"],
			[ "%d"]
		);
	}

	/**
	 * @param int $id
	 *
	 * @return Proposal
	 */
	public function getProposal( $id ) {
		$result =$this->wpdb->get_row(
			$this->wpdb->prepare("SELECT * FROM $this->tableProposals WHERE id = %d", $id)
		);
		return $this->rowToProposal($result);
	}

	/**
	 * @param ProposalQueryArgs $args
	 *
	 * @return Proposal[]
	 */
	public function queryProposals( ProposalQueryArgs $args ) {
		list($whereString, $whereValues) = DBHelper::buildProposalsWhere($args);

		$sql = call_user_func_array(
			[ $this->wpdb, 'prepare' ],
			array_merge(
				["SELECT * FROM $this->tableProposals $whereString ORDER BY modified_date DESC LIMIT %d OFFSET %d"],
				$whereValues,
				[$args->limit, $args->offset]
			)
		);
		$result = $this->wpdb->get_results($sql);

		return array_map( [ $this, 'rowToProposal' ], $result );
	}

	/**
	 * @param ProposalQueryArgs $args
	 *
	 * @return int
	 */
	public function countProposals( ProposalQueryArgs $args){

		list($whereString, $whereValues) = DBHelper::buildProposalsWhere($args);

		if(!empty($whereString)){
			$sql = call_user_func_array(
				[ $this->wpdb, 'prepare' ],
				array_merge(
					["SELECT COUNT(*) FROM $this->tableProposals $whereString"],
					$whereValues
				)
			);
		} else {
			$sql = "SELECT COUNT(*) FROM $this->tableProposals";
		}

		$result = $this->wpdb->get_var($sql);
		return intval($result);
	}

	/**
	 * @param VoteQueryArgs $args
	 *
	 * @return Vote[]
	 */
	public function queryVotes( VoteQueryArgs $args ) {

		$arr   = [
			"SELECT * from $this->tableVotes"
		];
		$where = [];
		if ( ! empty( $args->postId ) ) {
			$where[] = "post_id = %d";
			$arr[]   = $args->postId;
		}
		if ( ! empty( $args->type ) ) {
			$where[] = "vote_type = %s";
		}

		if ( count( $where ) > 0 ) {
			$arr[0] = "WHERE " . implode( " AND ", $where );
		}

		$result = call_user_func_array( [ $this->wpdb, 'get_results' ], $arr );

		return array_map( [ $this, 'rowToVote' ], $result );
	}

	/**
	 * @param $row
	 *
	 * @return Proposal
	 */
	public function rowToProposal( $row ) {
		$model         = new Proposal();
		$model->id     = $row->id;
		$model->userId = $row->user_id;
		$model->text   = $row->proposal;
		$model->status = $row->status;

		return $model;
	}

	/**
	 * @param $row
	 *
	 * @return Vote
	 */
	public function rowToVote( $row ) {
		$vote         = new Vote();
		$vote->id     = $row->id;
		$vote->userId = $row->user_id;
		$vote->postId = $row->post_id;
		$vote->type   = $row->vote_type;

		return $vote;
	}

	public function createTables() {
		parent::createTables();

		dbDelta( "CREATE TABLE IF NOT EXISTS $this->tableProposals (
		    id bigint(20) unsigned auto_increment,
    		user_id bigint(20) unsigned,
    		proposal TEXT NOT NULL,
			status varchar(20) NOT NULL DEFAULT 'new',
    		created_date TIMESTAMP NOT NULL,
    		modified_date TIMESTAMP NOT NULL,
    		primary key (id),
    		key (user_id),
    		key (status),
    		key (modified_date)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;" );

		dbDelta( "CREATE TABLE IF NOT EXISTS $this->tableVotes (
    		id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  			user_id bigint(20) unsigned NOT NULL,	
  			post_id bigint(20) unsigned NOT NULL,
    		vote_type varchar(20) NOT NULL DEFAULT 'upvote',
    		created_date TIMESTAMP NOT NULL,
    		modified_date TIMESTAMP NOT NULL,
    		primary key (id),	
    		key (user_id),
    		key (post_id),
    		KEY post_user_vote (user_id,post_id),
    		key (vote_type),
			key (modified_date)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;" );
	}


}