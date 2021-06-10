jQuery(($) => {

    const api = Compart.api;

    const $findProposals = ($voting) => $voting.find("[data-proposal-id]");
    const $findProposal = ($voting, proposalId) => $voting.find("[data-proposal-id=" + proposalId + "]");
    const setIsVoted = ($proposal) => $proposal.attr("data-is-voted", true);
    const unsetIsVoted = ($proposal) => $proposal.removeAttr("data-is-voted");
    const isVoted = ($proposal) => $proposal.attr("data-is-voted") === "true";
    const getProposalId = ($proposal) => $proposal.attr("data-proposal-id");
    const getReactionsCount = ($proposal) => parseInt($proposal.attr("data-reactions-count"));
    const setReactionsCount = ($proposal, count) => $proposal.attr("data-reactions-count", count);
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
            incrementReactionsCount($proposal)
        });
    }

    async function initVoting($voting) {
        const votingId = $voting.data("voting-id");

        const myReactions = await api.queryVoting(votingId);
        updateVotingState($voting, myReactions.map(r => r.proposalId));

        $voting.on("click", "[data-proposal-id]", async (e) => {
            const $el = $(e.target);
            const proposalId = getProposalId($el);
            const _isVoted = isVoted($el);
            if (_isVoted) {
                await api.unvoteForProposal(votingId, proposalId);
            } else {
                await api.voteForProposal(votingId, proposalId, "up")
            }
            updateVotingState($voting, _isVoted ? [] : [proposalId]);
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