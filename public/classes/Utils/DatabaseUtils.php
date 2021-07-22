<?php


namespace Palasthotel\WordPress\CommunityParticipation\Utils;


use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Model\ProposalQueryArgs;
use Palasthotel\WordPress\CommunityParticipation\Model\Reaction;
use Palasthotel\WordPress\CommunityParticipation\Model\VotingPostConnection;

class DatabaseUtils {

	public function buildProposalsWhere( ProposalQueryArgs $args ): array {
		$values = [];
		$where  = [];
		if ( ! empty( $args->userId ) ) {
			$where[]  = "user_id = %d";
			$values[] = $args->userId;
		}
		if ( ! empty( $args->status ) ) {
			$where[]  = "status = %s";
			$values[] = $args->status;
		}
		if ( ! empty( $args->search ) ) {
			$where[]  = "(proposal LIKE %s OR summary LIKE %s)";
			$values[] = "%" . $args->search . "%";
			$values[] = "%" . $args->search . "%";
		}
		if( !empty($args->created)){
			$where[] = "created_date BETWEEN %s AND %s";
			$values[] = $args->created." 00:00:00";
			$values[] = $args->created." 23:59:59";
		}

		$whereString = "";
		if ( count( $where ) > 0 ) {
			$whereString = " WHERE " . implode( " AND ", $where );
		}

		return [ $whereString, $values ];
	}

	public function rowToProposal( $row ): Proposal {
		$model           = new Proposal();
		$model->id       = $row->id;
		$model->userId   = $row->user_id;
		$model->text     = $row->proposal;
		$model->summary  = $row->summary;
		$model->notes    = $row->notes;
		$model->status   = $row->status;
		$model->modified = $row->modified_date;
		$model->created  = $row->created_date;

		return $model;
	}

	/**
	 * @param $row
	 *
	 * @return Reaction
	 */
	public function rowToReaction( $row ): Reaction {
		$vote             = new Reaction();
		$vote->id         = $row->id;
		$vote->userId     = $row->user_id;
		$vote->votingId   = $row->voting_id;
		$vote->proposalId = $row->proposal_id;
		$vote->type       = $row->reaction_type;

		return $vote;
	}

	/**
	 * @param $row
	 *
	 * @return VotingPostConnection
	 */
	public function rowToConnection( $row ): VotingPostConnection {
		$item             = new VotingPostConnection();
		$item->votingId   = $row->voting_id;
		$item->proposalId = $row->proposal_id;
		$item->postId     = $row->post_id;

		return $item;
	}

}