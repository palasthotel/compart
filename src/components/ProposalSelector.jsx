import {useState} from "@wordpress/element";
import React from "react";

const ProposalSelector = (
    {proposals, onAddProposal}
) => {
    const {i18n} = Compart;
    const [selectedId, setSelectedId] = useState("");
    return <>
        <label>
            {i18n.add_proposal}<br/>
            <select
                style={{
                    width: "100%",
                }}
                onChange={(e)=>setSelectedId(e.target.value)}
            >
                {selectedId === "" && <option>- {i18n.select_proposal} -</option>}
                {proposals.map(p =>
                    <option key={p.id} value={p.id}>{p.summary}</option>
                )}
            </select>
        </label>
        <button
            className="button button-secondary"
            onClick={(e)=>{
                e.preventDefault();
                if(selectedId === "") return;
                onAddProposal(selectedId);
                setSelectedId("");
            }}
        >
            {i18n.add_proposal_btn}
        </button>
    </>
}

export default ProposalSelector;