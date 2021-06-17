<?php

use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
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