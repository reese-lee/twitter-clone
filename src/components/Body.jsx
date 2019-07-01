import React from 'react';
import Profile from './BodyComponents/Profile';
import Bio from './BodyComponents/Bio';
import Feed from './BodyComponents/Feed';
import Connections from './BodyComponents/Connections';

function Body() {

    return (
        <div>
            <Profile/>
            <Bio/>
            <Feed/>
            <Connections/>
        </div>
    );
}

export default Body;