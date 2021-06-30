<?php

use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Model\VotingPostConnection;
use Palasthotel\WordPress\CommunityParticipation\Plugin;

function compart_plugin(){
	return Plugin::instance();
}

/**
 * render proposal form
 */
function compart_user_proposal_form(){
	include compart_plugin()->templates->get_template_path(Plugin::TEMPLATE_USER_PROPOSAL_FORM);
}

/**
 * @param int|null $user_id
 *
 * @return Proposal[]
 */
function compart_get_user_proposals($user_id = null){
	return compart_plugin()->repo->getUserProposals($user_id);
}

/**
 * render current users proposals
 */
function compart_user_proposals_list(){
	include compart_plugin()->templates->get_template_path(Plugin::TEMPLATE_USER_PROPOSALS_LIST);
}

/**
 * @param $proposal_id
 *
 * @return null|Proposal
 */
function compart_get_proposal_by_id( $proposal_id ){
	return compart_plugin()->database->getProposal($proposal_id);
}

/**
 * @param $proposal_id
 *
 * @return int[] voting post ids
 */
function compart_get_votings_by_proposal_id($proposal_id){
	return compart_plugin()->database->getVotingsByProposalId($proposal_id);
}

/**
 * @param null|int|string $post_id
 *
 * @return null|VotingPostConnection
 */
function compart_get_voting_post_connection($post_id = null){
	return compart_plugin()->repo->getVotingPostConnection($post_id);
}

