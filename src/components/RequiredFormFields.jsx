import React from "react";

const RequiredFormFields = ({status, selectedProposalIds, generatePost})=>{
    return <>
        <input type="hidden" name="voting_proposal_form" value="true"/>
        <input type="hidden" name="voting_status" value={status}/>
        {selectedProposalIds.map(s => <input type="hidden" name="voting_proposals[]" value={s}/>)}
        {generatePost && <input type="hidden" name="voting_generate_post" value={generatePost} />}
    </>
}

export default RequiredFormFields;