import React from 'react';
import {Dashicon} from "@wordpress/components";
import './ProposalListItem.scss';

export const ProposalsListItemStats = (props) => {
    const {
        summary,
        percentage,
    } = props;
    const readablePercentage = `${Math.round(percentage*100)}%`
    return <li className="proposal-list-item  proposal-list-item__stats">
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
        canMoveUp, canMoveDown, canDelete,
        onMoveDown, onMoveUp, onTrash,
    } = props;

    return <li className="proposal-list-item proposal-list-item__draft">
        {canMoveUp && <button
            className="proposal-list-item__button proposal-list-item__button-up"
            onClick={(e)=>{
            e.preventDefault();
            onMoveUp();
        }}><Dashicon icon="arrow-up" /></button>}
        <div>{summary}</div>
        {canMoveDown && <button
            className="proposal-list-item__button proposal-list-item__button-down"
            onClick={(e)=>{
            e.preventDefault();
            onMoveDown();
        }}><Dashicon icon="arrow-down" /></button>}
        {canDelete && <button
            className="proposal-list-item__button proposal-list-item__button-trash"
            onClick={(e)=>{
                e.preventDefault();
                onTrash();
            }}
        >
            <Dashicon icon="trash" />
        </button>}
    </li>;
}