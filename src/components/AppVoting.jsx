import React from 'react';
import ProposalsList from "./ProposalsList.jsx";
import {ProposalListItemDraft, ProposalsListItemStats} from "./ProposalsListItem.jsx";
import {useState} from "@wordpress/element";
import RequiredFormFields from "./RequiredFormFields.jsx";
import VotingToPostConnectionsList from "./VotingToPostConnectionsList.jsx";
import ProposalSelector from "./ProposalSelector.jsx";
import './AppVoting.scss';
import {VOTING_STATUS} from "../store/constants";
import VotingSteps from "./VotingSteps.jsx";


const AppVoting = (
    {
        proposals,
        reactions,
        status: initStatus,
        selection: initSelection,
        connections: initConnections,
    }
) => {

    const [status, setStatus] = useState(initStatus || VOTING_STATUS.OPEN);
    const [selectionIds, setSelectionIds] = useState(initSelection || []);
    const [connections, setConnections] = useState(initConnections || []);

    const isStatusChanged = status !== initStatus;
    const isSelectionChanged = initSelection.length !== selectionIds.length
        || selectionIds.filter((sid, index) => sid !== initSelection[index]).length > 0;

    const isChanged = isStatusChanged || isSelectionChanged;

    const switchIds = (from, to) => {
        const idFrom = selectionIds[from];
        const idTo = selectionIds[to];
        const newIds = [...selectionIds];
        newIds[from] = idTo;
        newIds[to] = idFrom;
        setSelectionIds(newIds);
    }

    const handleCreatePost = (e) => {
        e.preventDefault();
        const stats = {};
        reactions.forEach(reaction => {
            if (typeof stats[reaction.proposalId] !== "number") {
                stats[reaction.proposalId] = 0;
            }
            stats[reaction.proposalId] += 1;
        });
        let maxProposalId = null;
        for (const proposalId in stats) {
            if (null === maxProposalId || stats[maxProposalId] < stats[proposalId]) {
                maxProposalId = proposalId;
            }
        }
        if (maxProposalId === null) return;

        Compart.api.createPost(Compart.voting_id, maxProposalId).then(connection => {
            if (connection) {
                setConnections([
                    ...connections,
                    connection,
                ]);
            }
        })
    }

    return <div className={`app-voting ${isChanged ? "is-changed" : ""}`}>

        <VotingSteps
            status={status}
            onChange={setStatus}
            canOpen={selectionIds.length > 1}
            canFinish={reactions.length > 1}
        />

        <div className="app-voting__changed-status">Please update post to save changes</div>

        <RequiredFormFields
            status={status}
            selectedProposalIds={selectionIds}
        />

        <div className="app-voting__content">


            {
                status === VOTING_STATUS.DRAFT &&
                <ProposalSelector
                    proposals={proposals.filter(p => !selectionIds.includes(p.id))}
                    onAddProposal={(proposalId) => {
                        setSelectionIds([
                            ...selectionIds,
                            proposalId,
                        ]);
                    }}
                />
            }


            {selectionIds.map((id, idx) => {
                const proposal = proposals.find(p => p.id === id);
                if (!proposal) return null;
                switch (status) {
                    case VOTING_STATUS.DRAFT:
                        return <ProposalsList>
                            <ProposalListItemDraft
                                key={id}
                                {...proposal}
                                canMoveUp={idx !== 0}
                                canMoveDown={idx < selectionIds.length - 1}
                                onMoveUp={() => {
                                    switchIds(idx, idx - 1);
                                }}
                                onMoveDown={() => {
                                    switchIds(idx, idx + 1);
                                }}
                            />
                        </ProposalsList>
                    case VOTING_STATUS.OPEN:
                        const proposalReactions = reactions.filter(r => r.proposalId === proposal.id);
                        const percentage = reactions.length > 0 ? proposalReactions.length / reactions.length : 0;
                        return <ProposalsList>
                            <ProposalsListItemStats
                                key={id}
                                {...proposal}
                                reactions={proposalReactions}
                                percentage={percentage}
                            />
                        </ProposalsList>
                }
                return null
            })}

            {
                status === VOTING_STATUS.FINISHED &&
                <>
                    <VotingToPostConnectionsList
                        connections={connections}
                    />
                    {
                        connections.length === 0 &&
                        status === VOTING_STATUS.FINISHED &&
                        <div>
                            <button onClick={handleCreatePost}>
                                Create post for winning proposal
                            </button>
                        </div>
                    }
                </>
            }


        </div>
    </div>
}

export default AppVoting;