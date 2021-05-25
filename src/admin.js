import React from "react";
import {render} from "react-dom";
import domReady from '@wordpress/dom-ready';
import * as api from './store/api';

import AppProposals from './container/AppProposals.jsx';

domReady(function () {

    Compart.api = api;

    const root = document.getElementById("community-proposals");
    render( <AppProposals />, root);

});