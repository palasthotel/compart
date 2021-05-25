import domReady from '@wordpress/dom-ready';
import * as api from './store/api';

domReady(function () {

    Compart.api = api;


});