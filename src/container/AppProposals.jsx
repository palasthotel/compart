import React from 'react';
import {useState} from "@wordpress/element"
import {useProposalsRequest} from "../hooks/useApi";
import ProposalsList from "../components/ProposalsList.jsx";
import ProposalsListItem from "../components/ProposalsListItem.jsx";

const AppProposals = ()=>{

    const {page, setPage} = useState(1);
    const {result, numberOfItems} = useProposalsRequest(page);

    return <div className="wrap">

        {/** filter **/}

        <ProposalsList>
            {result.map(i=><ProposalsListItem key={i.id} {...i} />)}
        </ProposalsList>

        {/** pagination **/}
    </div>
}

export default AppProposals;