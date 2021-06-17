import React from 'react';
import ProposalsList from "./ProposalsList.jsx";
import {ProposalListItemDraft, ProposalsListItemStats} from "./ProposalsListItem.jsx";
import {useState} from "@wordpress/element";
import RequiredFormFields from "./RequiredFormFields.jsx";
import ProposalSelector from "./ProposalSelector.jsx";
import './AppVoting.scss';
import {VOTING_STATUS} from "../store/constants";
import VotingSteps, {NextStepFinishButton, NextStepOpenButton} from "./VotingSteps.jsx";
import VotingFinish from "./VotingFinish.jsx";


const AppVoting = (
    {
        proposals,
        reactions,
        status: initStatus,
        selection: initSelection,
        connection,
    }
) => {

    const [status, setStatus] = useState(initStatus || VOTING_STATUS.OPEN);
    const [selectionIds, setSelectionIds] = useState(initSelection.map(p=> p.id) || []);
    const [generatePost, setGeneratePost] = useState("");

    const isStatusChanged = status !== initStatus;
    const isSelectionChanged = initSelection.length !== selectionIds.length
        || selectionIds.filter((sid, index) => sid !== initSelection[index].id).length > 0;

    const isChanged = isStatusChanged || isSelectionChanged;

    const switchIds = (from, to) => {
        const idFrom = selectionIds[from];
        const idTo = selectionIds[to];
        const newIds = [...selectionIds];
        newIds[from] = idTo;
        newIds[to] = idFrom;
        setSelectionIds(newIds);
    }

    const trashId = (id) => {
        setSelectionIds(selectionIds.filter(_id=>_id !== id));
    }


    const allProposals = [...initSelection, ...proposals];

    const canOpen = selectionIds.length > 1;
    const canFinish = reactions.length > 1;

    return <div className={`app-voting ${isChanged ? "is-changed" : ""}`}>

        <VotingSteps
            status={status}
            canOpen={canOpen}
            canFinish={canFinish}
            isFinished={connection !== null}
        />

        <div className="app-voting__changed-status">Please update post to save changes</div>

        <RequiredFormFields
            status={status}
            generatePost={generatePost}
            selectedProposalIds={selectionIds}
        />

        <div className="app-voting__content">
            {
                initStatus === VOTING_STATUS.DRAFT &&
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

            <ProposalsList>
                {selectionIds.map((id, idx) => {
                    let proposal = allProposals.find(p => p.id === id);

                    if(proposal === null){
                        return null;
                    }

                    switch (status) {
                        case VOTING_STATUS.DRAFT:
                            return <ProposalListItemDraft
                                key={id}
                                {...proposal}
                                canMoveUp={initStatus === VOTING_STATUS.DRAFT && idx !== 0}
                                canMoveDown={initStatus === VOTING_STATUS.DRAFT && idx < selectionIds.length - 1}
                                canDelete={initStatus === VOTING_STATUS.DRAFT}
                                onMoveUp={() => {
                                    switchIds(idx, idx - 1);
                                }}
                                onMoveDown={() => {
                                    switchIds(idx, idx + 1);
                                }}
                                onTrash={()=>{
                                    trashId(id);
                                }}
                            />
                        case VOTING_STATUS.OPEN:
                        case VOTING_STATUS.FINISHED:
                            const proposalReactions = reactions.filter(r => r.proposalId === proposal.id);
                            const percentage = reactions.length > 0 ? proposalReactions.length / reactions.length : 0;
                            return <ProposalsListItemStats
                                key={id}
                                {...proposal}
                                reactions={proposalReactions}
                                percentage={percentage}
                            />
                    }
                    return null
                })}
            </ProposalsList>

            <NextStepOpenButton
                status={status}
                canOpen={canOpen}
                onOpen={() => {
                    setStatus(VOTING_STATUS.OPEN);
                }}
            />

            <NextStepFinishButton
                status={status}
                canFinish={canFinish}
                onFinish={() => {
                    setStatus(VOTING_STATUS.FINISHED);
                }}
            />

            { status === VOTING_STATUS.FINISHED && <VotingFinish
                proposals={allProposals}
                reactions={reactions}
                connection={connection}
                generatePost={generatePost}
                onChangeGeneratePost={(winnerIdOrEmptyString)=>{
                    setGeneratePost(winnerIdOrEmptyString);
                }}
            /> }

        </div>
    </div>
}

export default AppVoting;