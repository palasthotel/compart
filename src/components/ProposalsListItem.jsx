import React from 'react';
import './ProposalListItem.scss';

const ProposalsListItem = (props) => {
    const {
        user, summary, canMoveUp, canMoveDown,
        onMoveDown, onMoveUp
    } = props;
    const email  = user && user.email ? user.email : "";
    return <li className="proposal-list-item">
        {canMoveUp && <button onClick={onMoveUp}>Up</button>}
        <div>{summary}</div>
        {canMoveDown && <button onClick={onMoveDown}>Down</button>}
    </li>;
}

export default ProposalsListItem;