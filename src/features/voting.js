document.addEventListener("DOMContentLoaded",() => {

    const api = Compart.api;

    const findProposals = (voting) => voting.querySelectorAll("[data-proposal-id]");
    const findProposal = (voting, proposalId) => voting.querySelector(`[data-proposal-id='${proposalId}']`);
    const setIsVoted = (proposal) => proposal.setAttribute("data-is-voted", "true");
    const unsetIsVoted = (proposal) => proposal.removeAttribute("data-is-voted");
    const isVoted = (proposal) => proposal.getAttribute("data-is-voted") === "true";
    const getProposalId = (proposal) => proposal.getAttribute("data-proposal-id");
    const getReactionsCount = (proposal) => parseInt(proposal.getAttribute("data-reactions-count"));
    const setReactionsCount = (proposal, count) => proposal.setAttribute("data-reactions-count", count);

    const isLoading = (voting, isLoading) => {
        if(typeof isLoading === "boolean"){
            if(isLoading){
                document.body.classList.add("compart-voting__is-loading");
                voting.setAttribute("data-is-loading", "true");
            } else {
                document.body.classList.remove("compart-voting__is-loading");
                voting.removeAttribute("data-is-loading");
            }
        }
        return voting.getAttribute("data-is-loading") === "true";

    }
    const incrementReactionsCount = (proposal, by = 1) => {
        const count = getReactionsCount(proposal);
        setReactionsCount(proposal, count + by);
    }

    const updateVotingState = (voting, proposalIds) => {
        findProposals(voting).forEach((proposal) => {
            if (isVoted(proposal)) {
                unsetIsVoted(proposal);
                incrementReactionsCount(proposal, -1);
            }
        });
        proposalIds.forEach((proposalId) => {
            const proposal = findProposal(voting, proposalId);
            setIsVoted(proposal);
            incrementReactionsCount(proposal);
        });
    }

    async function initVoting(voting) {
        const votingId = voting.getAttribute("data-voting-id");

        isLoading(voting, true);
        const reactions = await api.queryVoting(votingId);
        const myReaction = reactions.filter(r => typeof r.userId !== "undefined").map(r => r.proposalId);
        updateVotingState(
            voting,
            myReaction,
        );
        isLoading(voting, false);

        voting.addEventListener("click", function(e){

            const proposal = e.target.closest("[data-proposal-id]");
            if(!proposal) return;

            (async ()=>{
                isLoading(voting, true);
                const proposalId = getProposalId(proposal);
                const _isVoted = isVoted(proposal);
                updateVotingState(voting, _isVoted ? [] : [proposalId]);
                try{
                    let event = "";
                    if (_isVoted) {
                        await api.unvoteForProposal(votingId, proposalId);
                        event = "compart_unvoted";
                    } else {
                        await api.voteForProposal(votingId, proposalId, "up");
                        event = "compart_voted";
                    }
                    document.dispatchEvent(new CustomEvent(event,{
                        voting: voting,
                        votingId: votingId,
                        proposalId: proposalId
                    }));
                } catch (e) {
                    updateVotingState(voting, myReaction);
                } finally {
                    isLoading(voting, false);
                }
            })();

        });
    }

    // ----------------------------------------------------
    // init applications
    // ----------------------------------------------------
    document.querySelectorAll("[data-voting-id][data-voting-status='open']").forEach(async (voting) => {
        try {
            await initVoting(voting);
        } catch (e) {
            console.error(e);
        }
    });
});