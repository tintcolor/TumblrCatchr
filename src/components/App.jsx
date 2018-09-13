import React, { Component } from 'react';
import { render } from 'react-dom';

import RedditTitles from './RedditTitles';
import TumblrCatchr from './TumblrCatchr';
import Demo from './Demo';
import Sidebar from './Sidebar';
// import Cookie from './Cookie';
import styles from '../assets/Reddit.css'

class App extends Component {

    constructor(props) {
        super(props)

    }

    render() {
      
        return (
        <div className="full-height outer-div">
        <div className="inner-div">
         <TumblrCatchr />
         </div>
         </div>
         )
        // return (<div> <Cookie /></div>)
    }
}

export default App;
