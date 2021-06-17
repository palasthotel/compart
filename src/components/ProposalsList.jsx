import React from 'react';

const ProposalsList = ({children}) => {
    return <ul style={{
        margin: 0,
    }}>
        {children}
    </ul>;
}

export default ProposalsList;