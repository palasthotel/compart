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

const VotingSteps = (
    {
        status,
        onChange,
        canFinish = false,
        canOpen = false,
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
            1. Preparation
        </div>
        <div
            className={getLiClasses(openStatus)}
            onClick={()=>{
                if(canOpen) onChange(VOTING_STATUS.OPEN)
            }}
        >
            2. Voting in progress
        </div>
        <div
            className={getLiClasses(finishStatus)}
            onClick={()=>{
                if(canFinish) onChange(VOTING_STATUS.FINISHED)
            }}
        >
            3. Finish
        </div>
    </div>
}

export default VotingSteps;