import {useState} from "@wordpress/element";
import React from "react";

const ProposalSelector = (
    {proposals, onAddProposal}
) => {
    const [selectedId, setSelectedId] = useState("");
    return <>
        <label>
            Add proposal<br/>
            <select
                style={{
                    width: "100%",
                }}
                onChange={(e)=>setSelectedId(e.target.value)}
            >
                {selectedId === "" && <option>- Select proposal -</option>}
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
            + Add
        </button>
    </>
}

export default ProposalSelector;