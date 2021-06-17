import {registerPlugin} from "@wordpress/plugins";
import {PluginPostStatusInfo} from '@wordpress/edit-post';
import {useSelect } from '@wordpress/data';
import './gutenberg.scss';



registerPlugin('compart-voting', {
    render: () => {

        const votingPostConnection = useSelect(select => select("core/editor").getCurrentPost().voting_post_connection, []);

        if(!votingPostConnection) {
            return null;
        }

        return <>
            <PluginPostStatusInfo>
                <p>
                    <strong>From voting:</strong><br/>
                    <a href={votingPostConnection.edit_voting_url}>{votingPostConnection.voting_title}</a>
                </p>
            </PluginPostStatusInfo>
        </>
    }
});