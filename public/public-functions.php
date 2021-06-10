<?php

use Palasthotel\WordPress\CommunityParticipation\Plugin;

function compart_plugin(){
	return Plugin::instance();
}

function compart_user_proposal_form(){
	include compart_plugin()->templates->get_template_path(Plugin::TEMPLATE_USER_PROPOSAL_FORM);
}