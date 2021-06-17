import React from "react";

const findWinnerProposal = (proposals, reactions) => {
    const stats = reactions.reduce((current, reaction) => {
        const {proposalId} = reaction;
        if (typeof current[proposalId] !== "number") {
            current[proposalId] = 0;
        }
        current[proposalId] = current[proposalId] + 1;
        return current;
    }, {});

    let winnerId = null;
    for (const proposalId in stats) {
        if (winnerId === null || stats[winnerId] < stats[proposalId]) {
            winnerId = proposalId;
        }
    }

    return proposals.find(p=>parseInt(p.id)===parseInt(winnerId));
}

const WinnerInfo = ({
    winner
}) => {
    return <p style={{
        textAlign: "center",
        fontSize: "1.2rem",
    }}>
        <strong>And the winner is:</strong><br/>{winner.summary} 🎉<br/><br/>
    </p>;
}

const GeneratePostCheckbox = (
    {
        winner,
        generate,
        onChange,
    }
) => {
    return <p style={{
        textAlign: "center",
        fontSize: "1.2rem",
    }}>
        <label>
            <input
                type="checkbox"
                value={generate}
                onChange={()=>{
                    onChange(generate === "" ? winner.id : "");
                }}
            /> Create post with connection to this voting result
        </label>
    </p>;
}

const ConnectionToPost = ({
    post_title,
    edit_post_url,
}) => {
    return <p style={{
        textAlign: "center",
        fontSize: "1.2rem",
    }}>
        <strong>Post:</strong><br/>
        <a href={edit_post_url}>{post_title}</a>
    </p>;
}

const VotingFinish = (
    {
        proposals,
        reactions,
        connection,
        generatePost,
        onChangeGeneratePost
    }
) => {

    const winner = findWinnerProposal(proposals, reactions);

    return <div>
        {winner && <WinnerInfo winner={winner} />}

        {!connection && <GeneratePostCheckbox
            winner={winner}
            generate={generatePost}
            onChange={onChangeGeneratePost}
        />}

        {connection && <ConnectionToPost {...connection} />}
    </div>
}

export default VotingFinish;