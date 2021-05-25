import React from 'react';

const ProposalsListItem = ({id, user, text, status}) => {
    const email  = user && user.email ? user.email : "";
    return <li>
        <label>{id}: {email} {status}<br/>
            <textarea readOnly={true} value={text} />
        </label>
    </li>;
}

export default ProposalsListItem;