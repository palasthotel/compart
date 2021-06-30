<?php


namespace Palasthotel\WordPress\CommunityParticipation\Data;

use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Model\ProposalQueryArgs;
use Palasthotel\WordPress\CommunityParticipation\Model\Reaction;
use Palasthotel\WordPress\CommunityParticipation\Model\VoteQueryArgs;
use Palasthotel\WordPress\CommunityParticipation\Model\VotingPostConnection;
use Palasthotel\WordPress\CommunityParticipation\Model\VotingProposal;
use Palasthotel\WordPress\CommunityParticipation\Utils\DatabaseUtils;

/**
 * @property string $tableProposals
 * @property string $tableReactions
 * @property string tableVotingProposals
 * @property string tablePosts
 */
class Database extends \Palasthotel\WordPress\CommunityParticipation\Components\Database {

	private DatabaseUtils $utils;

	function init() {
		$this->tableProposals       = $this->wpdb->prefix . "compart_proposals";
		$this->tableVotingProposals = $this->wpdb->prefix . "compart_voting_proposals";
		$this->tableReactions       = $this->wpdb->prefix . "compart_reactions";
		$this->tablePosts           = $this->wpdb->prefix . "compart_posts";
		$this->utils                = new DatabaseUtils();
	}

	public function addProposal( $user_id, $text ) {
		return $this->wpdb->insert(
			$this->tableProposals,
			[
				"user_id"       => $user_id,
				"proposal"      => $text,
				"status"        => Proposal::STATUS_WAITING,
				"modified_date" => date( "Y-m-d H:i:s" ),
				"created_date"  => date( "Y-m-d H:i:s" )
			],
			[ "%d", "%s", "%s", "%s", "%s" ]
		);
	}

	public function updateProposal( Proposal $proposal ) {
		return $this->wpdb->update(
			$this->tableProposals,
			[
				"proposal"      => $proposal->text,
				"status"        => $proposal->status,
				"summary"       => $proposal->summary,
				"notes"         => $proposal->notes,
				"modified_date" => date( "Y-m-d H:i:s" ),
			],
			[ "id" => $proposal->id ],
			[ "%s", "%s", "%s", "%s", "%s" ],
			[ "%d" ]
		);
	}

	/**
	 * @param int|string $id
	 *
	 * @return Proposal|null
	 */
	public function getProposal( $id ) {
		$result = $this->wpdb->get_row(
			$this->wpdb->prepare( "SELECT * FROM $this->tableProposals WHERE id = %d", $id )
		);
		if ( empty( $result ) ) {
			return null;
		}

		$model = $this->utils->rowToProposal( $result );

		$model->connection = $this->getConnectedProposalConnection($id);

		return $model;
	}

	/**
	 * @return Proposal[]
	 */
	public function queryProposals( ProposalQueryArgs $args ): array {
		list( $whereString, $whereValues ) = $this->utils->buildProposalsWhere( $args );

		$sql    = call_user_func_array(
			[ $this->wpdb, 'prepare' ],
			array_merge(
				[ "SELECT * FROM $this->tableProposals $whereString ORDER BY modified_date DESC LIMIT %d OFFSET %d" ],
				$whereValues,
				[ $args->limit, $args->offset ]
			)
		);
		$result = $this->wpdb->get_results( $sql );

		return array_map( function($item){
			$proposal = $this->utils->rowToProposal($item);
			$proposal->connection = $this->getConnectedProposalConnection($proposal->id);
			return $proposal;
		}, $result );
	}

	public function getVotingsByProposalId($proposalId){
		return $this->wpdb->get_col(
			$this->wpdb->prepare(
				"SELECT voting_id FROM $this->tableVotingProposals WHERE proposal_id = %d", $proposalId
			)
		);
	}

	public function countProposals( ProposalQueryArgs $args ): int {

		list( $whereString, $whereValues ) = $this->utils->buildProposalsWhere( $args );

		if ( ! empty( $whereString ) ) {
			$sql = call_user_func_array(
				[ $this->wpdb, 'prepare' ],
				array_merge(
					[ "SELECT COUNT(*) FROM $this->tableProposals $whereString" ],
					$whereValues
				)
			);
		} else {
			$sql = "SELECT COUNT(*) FROM $this->tableProposals";
		}

		$result = $this->wpdb->get_var( $sql );

		return intval( $result );
	}

	/**
	 * @param $votingId
	 *
	 * @return Proposal[]
	 */
	public function getProposalsByVoting( $votingId ) {
		$result = $this->wpdb->get_results(
			$this->wpdb->prepare(
				"SELECT *, p.id as id FROM $this->tableProposals as p 
    				LEFT JOIN $this->tableVotingProposals vp ON (p.id = vp.proposal_id) 
					WHERE vp.voting_id = %d ORDER BY vp.proposal_position ASC",
				$votingId
			)
		);

		return array_map( [ $this->utils, 'rowToProposal' ], $result );
	}

	/**
	 * @param VotingProposal[] $votingProposals
	 */
	public function setVotingProposals( array $votingProposals ): bool {
		$position = 0;
		foreach ( $votingProposals as $vp ) {
			$this->wpdb->insert(
				$this->tableVotingProposals,
				[
					"proposal_id"       => $vp->proposalId,
					"voting_id"         => $vp->votingId,
					"proposal_position" => $position ++,
				],
				[ "%d", "%d", "%d" ]
			);
		}

		return true;
	}

	public function removeVotingProposals( $votingId ) {
		return $this->wpdb->delete(
			$this->tableVotingProposals,
			[
				"voting_id" => $votingId,
			],
			[ "%d", "%d" ]
		);
	}

	public function setVotingReaction( $userId, $votingId, $proposalId, $type ) {
		return $this->wpdb->replace(
			$this->tableReactions,
			[
				"user_id"       => $userId,
				"voting_id"     => $votingId,
				"proposal_id"   => $proposalId,
				"reaction_type" => $type,
				"created_date"  => date( "Y-m-d H:i:s" ),
			],
			[ "%d", "%d", "%s", "%s", "%s" ]
		);
	}

	public function unsetVotingReaction( $userId, $votingId, $proposalId ) {
		$result = $this->wpdb->delete(
			$this->tableReactions,
			[
				"user_id"     => $userId,
				"proposal_id" => $proposalId,
				"voting_id"   => $votingId
			],
			[ "%d", "%d", "%d" ]
		);

		return $result;
	}

	/**
	 * @param VoteQueryArgs $args
	 *
	 * @return Reaction[]
	 */
	public function queryVotingReactions( VoteQueryArgs $args ) {

		$arr   = [
			"SELECT * from $this->tableReactions"
		];
		$where = [];
		if ( ! empty( $args->votingId ) ) {
			$where[] = "voting_id = %d";
			$arr[]   = $args->votingId;
		}
		if ( is_int( $args->userId ) && $args->userId > 0 ) {
			$where[] = "user_id = %d";
			$arr[]   = $args->userId;
		}
		if ( ! empty( $args->type ) ) {
			$where[] = "reaction_type = %s";
			$arr[]   = $args->type;
		}

		if ( count( $where ) > 0 ) {
			$arr[0] .= " WHERE " . implode( " AND ", $where );
		}

		$sql = call_user_func_array( [ $this->wpdb, 'prepare' ], $arr );

		$result = $this->wpdb->get_results( $sql );

		return array_map( [ $this->utils, 'rowToReaction' ], $result );
	}

	public function setPostConnection( VotingPostConnection $connection ) {
		return $this->wpdb->insert(
			$this->tablePosts,
			[
				"post_id"      => $connection->postId,
				"voting_id"    => $connection->votingId,
				"proposal_id"  => $connection->proposalId,
				"created_date" => date( "Y-m-d H:i:s" ),
			],
			[ "%d", "%d", "%d", "%s" ]
		);
	}

	/**
	 * @param $proposalId
	 *
	 * @return VotingPostConnection|null
	 */
	public function getConnectedProposalConnection($proposalId){
		$row = $this->wpdb->get_row(
			$this->wpdb->prepare(
				"SELECT proposal_id, post_id, voting_id FROM $this->tablePosts WHERE proposal_id = %s LIMIT 1",
				$proposalId
			)
		);

		return is_object($row) ? $this->utils->rowToConnection($row) : null;
	}

	/**
	 * @param $votingId
	 *
	 * @return VotingPostConnection|null
	 */
	public function getConnectedPostConnection( $votingId ) {
		$row = $this->wpdb->get_row(
			$this->wpdb->prepare(
				"SELECT proposal_id, post_id, voting_id FROM $this->tablePosts WHERE voting_id = %s LIMIT 1",
				$votingId
			)
		);

		return is_object($row) ? $this->utils->rowToConnection($row) : null;
	}

	/**
	 * @param $postId
	 *
	 * @return VotingPostConnection|null
	 */
	public function getConnectedVotingConnection($postId){
		$row = $this->wpdb->get_row(
			$this->wpdb->prepare(
				"SELECT proposal_id, post_id, voting_id FROM $this->tablePosts WHERE post_id = %s LIMIT 1",
				$postId
			)
		);

		return is_object($row) ? $this->utils->rowToConnection($row) : null;
	}


	public function createTables() {
		parent::createTables();

		$userTable  = $this->wpdb->users;
		$postsTable = $this->wpdb->posts;

		dbDelta( "CREATE TABLE IF NOT EXISTS $this->tableProposals (
		    id bigint(20) unsigned auto_increment,
    		user_id bigint(20) unsigned NOT NULL,
    		proposal TEXT NOT NULL,
    		summary VARCHAR(190) NOT NULL DEFAULT '',
    		notes TEXT NOT NULL DEFAULT '',
			status varchar(20) NOT NULL DEFAULT 'new',
    		created_date TIMESTAMP NOT NULL,
    		modified_date TIMESTAMP NOT NULL,
    		primary key (id),
    		key (user_id),
    		key (summary),
    		key (status),
    		key (created_date),
    		key (modified_date),
    		foreign key (user_id) references $userTable ( ID ) ON DELETE CASCADE
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;" );

		dbDelta( "CREATE TABLE IF NOT EXISTS $this->tableVotingProposals (
		    id bigint(20) unsigned auto_increment NOT NULL,
    		voting_id bigint(20) unsigned NOT NULL,
    		proposal_id bigint(20) unsigned NOT NULL,
    		proposal_position int(2) unsigned NOT NULL,
    		primary key (id),
    		key (voting_id),
    		key (proposal_id), 
    		key (proposal_position),
    		foreign key (voting_id) references $postsTable ( ID ) ON DELETE CASCADE,
    		foreign key (proposal_id) references $this->tableProposals ( id ) ON DELETE CASCADE
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;" );

		dbDelta( "CREATE TABLE IF NOT EXISTS $this->tableReactions (
    		id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  			user_id bigint(20) unsigned NOT NULL,	
    		proposal_id bigint(20) unsigned NOT NULL,
  			voting_id bigint(20) unsigned NOT NULL,
    		reaction_type varchar(20) NOT NULL DEFAULT 'upvote',
    		created_date TIMESTAMP NOT NULL,
    		primary key (id),
    		key (user_id),
    		key (voting_id),
    		unique key user_reaction_to_voting (user_id, voting_id, reaction_type),
    		key (reaction_type),
    		foreign key (voting_id) references $postsTable ( ID ) ON DELETE CASCADE,
    		foreign key (user_id) references $userTable ( ID ) ON DELETE CASCADE,
    		foreign key (proposal_id) references $this->tableProposals ( id ) ON DELETE CASCADE
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;" );

		dbDelta( "CREATE TABLE IF NOT EXISTS $this->tablePosts (
    		id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  			post_id bigint(20) unsigned NOT NULL,
    		proposal_id bigint(20) unsigned NOT NULL,
  			voting_id bigint(20) unsigned NOT NULL,
    		created_date TIMESTAMP NOT NULL,
    		primary key (id),
    		unique key (post_id),
    		unique key (voting_id),
    		unique key (proposal_id)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;" );
	}


}