import React from "react";

const NoConnectionYet = ()=>{
    return <p></p>
}

const VotingToPostConnectionsList = ({connections})=>{
    if(connections.length <= 0) return null;
    return<ul>
        {connections.map(c => {
            return <li key={c.connection.postId}>
                <a href={c.post_edit_url}>
                    {c.post_title}
                </a>
            </li>
        })}
    </ul>
}

export default VotingToPostConnectionsList;