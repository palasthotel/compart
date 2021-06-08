import apiFetch from '@wordpress/api-fetch';

const getApiPath = (path) => `${Compart.rest_namespace}${path}`;

export const createProposal = (text) => {
    return apiFetch({
        path: getApiPath("/proposals"),
        method: "POST",
        data: {text},
    });
}

export const updateProposalStatus = (id, status) => {
    return apiFetch({
        path: getApiPath(`/proposals/${id}`),
        method: "PATCH",
        data: {status},
    });
}

export const queryProposals = (
    {
        page = 1,
        items_per_page = 50,
        search = "",
        user_id = 0,
    } = {}
) => {
    const query = [];
    if (page) {
        query.push(`page=${page}`);
    }
    if (items_per_page) {
        query.push(`items_per_page=${items_per_page}`);
    }
    if (search.length) {
        query.push(`search=${encodeURIComponent(search)}`);
    }
    if (user_id) {
        query.push(`user_id=${user_id}`);
    }
    return apiFetch({path: getApiPath(`/proposals?${query.join("&")}`)});
}

export const queryVoting = (votingId) => {
    return apiFetch({
        path: getApiPath(`/votings/${votingId}`),
        method: "GET",
    })
}

export const voteForProposal = (votingId, proposalId, reaction) => {
    return apiFetch({
        path: getApiPath(`/votings/${votingId}?proposal_id=${proposalId}&reaction=${reaction}`),
        method: "POST",
    });
}

export const unvoteForProposal = (votingId, proposalId) => {
    return apiFetch({
        path: getApiPath(`/votings/${votingId}?proposal_id=${proposalId}`),
        method: "DELETE",
    });
}