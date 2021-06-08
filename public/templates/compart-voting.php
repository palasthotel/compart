<?php

use Palasthotel\WordPress\CommunityParticipation\Model\Proposal;
use Palasthotel\WordPress\CommunityParticipation\Model\Reaction;

/**
 * @var $voting_id
 * @var Proposal[] $proposals
 * @var Reaction[] $reactions
 */

?>
<style>
	[data-reactions-count]:before {
		content:attr(data-reactions-count);
	}
</style>
<?php

echo "<ul data-voting-id='$voting_id'>";
foreach ($proposals as $proposal){
	$count = count(array_filter($reactions, function($reaction) use ($proposal){
		return $reaction->proposalId === $proposal->id;
	}));
	echo "<li data-proposal-id='$proposal->id' data-reactions-count='$count'>$proposal->summary</li>";
}
echo "</ul>";