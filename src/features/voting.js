jQuery(($) => {

    const api = Compart.api;
    const $body = $("body");

    const $findProposals = ($voting) => $voting.find("[data-proposal-id]");
    const $findProposal = ($voting, proposalId) => $voting.find("[data-proposal-id=" + proposalId + "]");
    const setIsVoted = ($proposal) => $proposal.attr("data-is-voted", true);
    const unsetIsVoted = ($proposal) => $proposal.removeAttr("data-is-voted");
    const isVoted = ($proposal) => $proposal.attr("data-is-voted") === "true";
    const getProposalId = ($proposal) => $proposal.attr("data-proposal-id");
    const getReactionsCount = ($proposal) => parseInt($proposal.attr("data-reactions-count"));
    const setReactionsCount = ($proposal, count) => $proposal.attr("data-reactions-count", count);
    const isLoading = ($voting, isLoading) => {
        if(typeof isLoading === "boolean"){
            if(isLoading){
                $body.addClass("compart-voting__is-loading");
                $voting.attr("data-is-loading", "true");
            } else {
                $body.removeClass("compart-voting__is-loading");
                $voting.removeAttr("data-is-loading");
            }
        }
        return $voting.attr("data-is-loading") === "true";

    }
    const incrementReactionsCount = ($proposal, by = 1) => {
        const count = getReactionsCount($proposal);
        setReactionsCount($proposal, count + by);
    }

    const updateVotingState = ($voting, proposalIds) => {
        $findProposals($voting).each((index, el) => {
            const $proposal = $(el);
            if (isVoted($proposal)) {
                unsetIsVoted($proposal);
                incrementReactionsCount($proposal, -1);
            }
        });
        proposalIds.forEach((proposalId) => {
            const $proposal = $findProposal($voting, proposalId);
            setIsVoted($proposal);
            incrementReactionsCount($proposal);
        });
    }

    async function initVoting($voting) {
        const votingId = $voting.data("voting-id");

        isLoading($voting, true);
        const reactions = await api.queryVoting(votingId);
        const myReaction = reactions.filter(r => typeof r.userId !== "undefined").map(r => r.proposalId);
        updateVotingState(
            $voting,
            myReaction,
        );
        isLoading($voting, false);

        $voting.on("click", "[data-proposal-id]", async function(e){
            isLoading($voting, true);
            const $el = $(this);
            const proposalId = getProposalId($el);
            const _isVoted = isVoted($el);
            updateVotingState($voting, _isVoted ? [] : [proposalId]);
            try{
                if (_isVoted) {
                    await api.unvoteForProposal(votingId, proposalId);
                } else {
                    await api.voteForProposal(votingId, proposalId, "up")
                }
            } catch (e) {
                updateVotingState($voting, myReaction);
            } finally {
                isLoading($voting, false);
            }
        });
    }

    // ----------------------------------------------------
    // init applications
    // ----------------------------------------------------
    $("[data-voting-id]").each(async (index, el) => {
        try {
            await initVoting($(el));
        } catch (e) {
            console.error(e);
        }
    });
});