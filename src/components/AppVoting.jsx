import React from 'react';
import ProposalsList from "../components/ProposalsList.jsx";
import ProposalsListItem from "../components/ProposalsListItem.jsx";
import {useState} from "@wordpress/element";

const AppVoting = ({proposals, selection = []})=>{

    const [selectedIds, setSelectedIds] = useState(selection);
    const [selectedId, setSelectedId] = useState(0);

    const handleSelection = (e)=>{
        setSelectedId(e.target.value);
    }

    const handleAddProposal = (e)=>{
        e.preventDefault();
        if(selectedId <= 0) return;
        setSelectedIds([
            ...selectedIds,
            selectedId,
        ]);
        setSelectedId(0);
    }

    const switchIds = (from, to) => {
        const idFrom = selectedIds[from];
        const idTo = selectedIds[to];
        const newIds = [...selectedIds];
        newIds[from] = idTo;
        newIds[to] = idFrom;
        setSelectedIds(newIds);
    }

    return <div className="wrap">

        <select onChange={handleSelection}>
            {selectedId === 0 && <option>- Select proposal -</option>}
            {proposals.filter(p=> !selectedIds.includes(p.id) ).map(p=> <option key={p.id} value={p.id}>{p.summary}</option>)}
        </select> <button onClick={handleAddProposal}>+</button>

        <ProposalsList>
            {selectedIds.map((id, idx)=>{
                const proposal = proposals.find(p => p.id === id);
                if(!proposal) return null;
                return <ProposalsListItem
                    key={id}
                    {...proposal}
                    canMoveUp={idx !== 0}
                    canMoveDown={idx < selectedIds.length-1}
                    onMoveUp={()=>{
                        switchIds(idx, idx-1);
                    }}
                    onMoveDown={()=>{
                        switchIds(idx, idx+1);
                    }}
                />
            })}
        </ProposalsList>

        <input type="hidden" name="voting_proposal_form" value="true" />
        {selectedIds.map(s=> <input type="hidden" name="voting_proposals[]" value={s} />)}
    </div>
}

export default AppVoting;