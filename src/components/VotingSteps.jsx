import {VOTING_STATUS} from "../store/constants";
import './VotingSteps.scss';

const STATUS = {
    ACTIVE: "is-active",
    DONE: "is-done",
    AVAILABLE: "is-available",
    DISABLED: "is-disabled",
}

const getLiClasses = (status) => {
    const cls = ["voting-step__item"];
    cls.push(status);
    return cls.join(" ");
};

export const NextStepOpenButton = (
    {
        label = "Start voting",
        status,
        canOpen,
        onOpen
    }
)=>{
    if(VOTING_STATUS.DRAFT !== status) return null;
    return <button
        className="button button-secondary"
        disabled={!canOpen}
        onClick={(e)=>{
            e.preventDefault();
            if(canOpen){
                onOpen();
            }
        }}
    >
        {label}
    </button>
}

export const NextStepFinishButton = (
    {
        label = "End voting",
        status,
        canFinish,
        onFinish
    }
) => {
    if(VOTING_STATUS.OPEN !== status) return null;
    return <button
        className="button button-secondary"
        disabled={!canFinish}
        onClick={(e)=>{
            e.preventDefault();
            if(canFinish){
                onFinish();
            }
        }}
    >
        {label}
    </button>
}

const VotingSteps = (
    {
        status,
        onChange,
        canOpen = false,
        canFinish = false,
        isFinished = false
    }
) => {

    let draftStatus = STATUS.ACTIVE;
    let openStatus = canOpen ? STATUS.AVAILABLE : STATUS.DISABLED;
    let finishStatus = canFinish ? STATUS.AVAILABLE : STATUS.DISABLED;
    switch (status){
        case VOTING_STATUS.OPEN:
            draftStatus = STATUS.DONE;
            openStatus = STATUS.ACTIVE;
            break;
        case VOTING_STATUS.FINISHED:
            draftStatus = STATUS.DONE;
            openStatus = STATUS.DONE;
            finishStatus = STATUS.ACTIVE
    }

    return <div className="voting-steps">
        <div
            className={getLiClasses(draftStatus)}
            onClick={()=> onChange(VOTING_STATUS.DRAFT)}
        >
            1. Preparation { status !== VOTING_STATUS.DRAFT ? "✅" : ""}
        </div>
        <div
            className={getLiClasses(openStatus)}
            onClick={()=>{
                if(canOpen) onChange(VOTING_STATUS.OPEN)
            }}
        >
            2. Voting in progress { ![VOTING_STATUS.DRAFT, VOTING_STATUS.OPEN].includes(status) ? "✅" : ""}
        </div>
        <div
            className={getLiClasses(finishStatus)}
            onClick={()=>{
                if(canFinish) onChange(VOTING_STATUS.FINISHED)
            }}
        >
            3. Finish { isFinished ? "✅" : ""}
        </div>
    </div>
}

export default VotingSteps;