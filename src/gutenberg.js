import {registerPlugin} from "@wordpress/plugins";
import {PluginPostStatusInfo} from '@wordpress/edit-post';
import './gutenberg.scss';

registerPlugin('workflow-show-author-email', {
    render: () => <>
        <PluginPostStatusInfo>
            <p>Voting!</p>
        </PluginPostStatusInfo>
    </>
});