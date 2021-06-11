import React from 'react';
import './ProposalListItem.scss';

const ProposalsListItem = (props) => {
    const {
        user, summary, reactions, percentage,
        canMoveUp, canMoveDown,
        onMoveDown, onMoveUp
    } = props;
    const email  = user && user.email ? user.email : "";
    console.debug("compart", percentage, reactions);
    const readablePercentage = `${Math.round(percentage*100)}%`
    return <li className="proposal-list-item">
        {canMoveUp && <button onClick={onMoveUp}>Up</button>}
        <div>{summary}</div>
        <div className="proposal__percentage-wrapper">
            <div className="proposal__percentage-counter">{readablePercentage}</div>
            <div className="proposal__percentage-bar" style={{
                width: readablePercentage,
            }} />
        </div>
        {canMoveDown && <button onClick={onMoveDown}>Down</button>}
    </li>;
}

export default ProposalsListItem;