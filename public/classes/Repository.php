<?php


namespace Palasthotel\WordPress\CommunityParticipation;


use Palasthotel\WordPress\CommunityParticipation\Components\Component;
use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Model\ProposalQueryArgs;

/**
 * @property Data\Database db
 */
class Repository extends Component {

	public function onCreate() {
		$this->db = $this->plugin->database;
	}

	/**
	 * @param null|int $user_id
	 * @return Proposal[]
	 */
	function getUserProposals($user_id = null): array {
		if(null === $user_id){
			$user_id = get_current_user_id();
		}
		$args = new ProposalQueryArgs();
		$args->userId = $user_id;
		return $this->db->queryProposals($args);
	}

	/**
	 * @param null|string|int $postId
	 *
	 * @return Model\VotingPostConnection|null
	 */
	function getVotingPostConnection($postId = null){
		$post = get_post($postId);
		if($post->post_type === $this->plugin->postTypeVoting->getSlug()){
			return $this->plugin->database->getConnectedPostConnection($post->ID);
		}
		return$this->plugin->database->getConnectedVotingConnection($post->ID);
	}


}