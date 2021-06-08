<?php


namespace Palasthotel\WordPress\CommunityParticipation\View;


use Palasthotel\WordPress\CommunityParticipation\Component\Component;
use Palasthotel\WordPress\CommunityParticipation\Model\VoteQueryArgs;
use Palasthotel\WordPress\CommunityParticipation\Plugin;

class VotingPostContentView extends Component {
	function onCreate() {
		add_filter( 'the_content', [ $this, 'the_content' ] );
	}

	public function the_content( $content ) {

		if ( is_singular( $this->plugin->postTypeVoting->getSlug() ) && in_the_loop() && is_main_query() ) {
			$voting_id      = get_the_ID();
			$proposals      = $this->plugin->database->getProposalsByVoting($voting_id);
			$args           = new VoteQueryArgs();
			$args->votingId = $voting_id;
			$reactions      = $this->plugin->database->queryVotingReactions($args);
			ob_start();
			include $this->plugin->templates->get_template_path(Plugin::TEMPLATE_VOTING);
			$content .= ob_get_contents();
			ob_end_clean();
		}

		return $content;
	}
}