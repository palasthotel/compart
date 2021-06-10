import domReady from '@wordpress/dom-ready';
import './gutenberg.scss';
import * as api from './store/api';

// import { registerBlockType } from '@wordpress/blocks'
//
// domReady(function () {
//
//     Compart.api = api;
//
//     registerBlockType("compart/create-proposal",{
//         title: "User proposal form",
//         category: "widgets",
//         edit(props){
//             return <div>
//                 <p><strong></strong></p>
//             </div>
//         }
//     });
//
//
//
// });