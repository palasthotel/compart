import React from 'react';
import './ProposalListItem.scss';

export const ProposalsListItemStats = (props) => {
    const {
        user,
        summary,
        reactions,
        percentage,
    } = props;
    const email  = user && user.email ? user.email : "";
    console.debug("compart", percentage, reactions);
    const readablePercentage = `${Math.round(percentage*100)}%`
    return <li className="proposal-list-item">
        <div>{summary}</div>
        <div className="proposal__percentage-wrapper">
            <div className="proposal__percentage-counter">{readablePercentage}</div>
            <div className="proposal__percentage-bar" style={{
                width: readablePercentage,
            }} />
        </div>
    </li>;
}

export const ProposalListItemDraft = (props)=>{
    const {
        summary,
        canMoveUp, canMoveDown,
        onMoveDown, onMoveUp
    } = props;

    return <li className="proposal-list-item">
        {canMoveUp && <button onClick={(e)=>{
            e.preventDefault();
            onMoveUp();
        }}>Up</button>}
        <div>{summary}</div>
        {canMoveDown && <button onClick={(e)=>{
            e.preventDefault();
            onMoveDown();
        }}>Down</button>}
    </li>;
}