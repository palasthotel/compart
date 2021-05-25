<?php


namespace Palasthotel\WordPress\CommunityParticipation\Utils;


use Palasthotel\WordPress\CommunityParticipation\Model\ProposalQueryArgs;

class DBHelper {

	public static function buildProposalsWhere(ProposalQueryArgs $args): array {
		$values=[];
		$where = [];
		if ( ! empty( $args->userId ) ) {
			$where[] = "user_id = %d";
			$values[]   = $args->userId;
		}
		if ( ! empty( $args->status ) ) {
			$where[] = "status = %s";
			$values[] = $args->status;
		}
		if( !empty($args->search)){
			$where[] = "proposal LIKE %s";
			$values[] = "%".$args->search."%";
		}

		$whereString = "";
		if ( count( $where ) > 0 ) {
			$whereString = " WHERE " . implode( " AND ", $where );
		}

		return [$whereString, $values];
	}

}