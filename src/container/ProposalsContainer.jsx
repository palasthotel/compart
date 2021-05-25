import React from 'react';
import ProposalsList from "../components/ProposalsList.jsx";
import {useProposalsRequest} from "../hooks/useApi";

const ProposalsContainer = ({page})=>{


    return <ProposalsList>
        {items.map(i=><ProposalsList key={i.id} {...i} />)}
    </ProposalsList>
}

export default ProposalsContainer;