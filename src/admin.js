import domReady from '@wordpress/dom-ready';
import {render} from 'react-dom';
import * as api from './store/api';
import AppVoting from "./components/AppVoting.jsx";

const debug = (msg, data = undefined) => console.debug("Compart", msg, data);

domReady(function () {

    Compart.api = api;

    debug(Compart);

    const votingMetaBox = document.getElementById("compart-voting-meta-box");

    if (votingMetaBox) {
        render(
            <AppVoting
                proposals={Compart.proposals}
                selection={Compart.selection}
            />,
            votingMetaBox,
        );
    }

});