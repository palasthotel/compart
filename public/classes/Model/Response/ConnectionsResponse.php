<?php


namespace Palasthotel\WordPress\CommunityParticipation\Model\Response;


use Palasthotel\WordPress\CommunityParticipation\Model\VotingPostConnection;

/**
 * @property VotingPostConnection connection
 * @property string post_title
 * @property string|null edit_post_url
 * @property string voting_title
 * @property string|null edit_voting_url
 */
class ConnectionsResponse {

	public function __construct(VotingPostConnection $connection) {
		$this->connection = $connection;
		$this->post_title = get_the_title($connection->postId);
		$this->edit_post_url = get_edit_post_link($connection->postId, '');
		$this->voting_title = get_the_title($connection->votingId);
		$this->edit_voting_url = get_edit_post_link($connection->votingId, '');
	}
}