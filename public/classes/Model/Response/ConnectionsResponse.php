<?php


namespace Palasthotel\WordPress\CommunityParticipation\Model\Response;


use Palasthotel\WordPress\CommunityParticipation\Model\VotingPostConnection;

/**
 * @property VotingPostConnection connection
 * @property string post_title
 * @property string|null edit_post_url
 */
class ConnectionsResponse {

	public function __construct(VotingPostConnection $connection) {
		$this->connection = $connection;
		$this->post_title = get_the_title($connection->postId);
		$this->edit_post_url = get_edit_post_link($connection->postId, '');
	}
}