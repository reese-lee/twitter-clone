import React from 'react';
import Profile from './BodyComponents/Profile';
import Bio from './BodyComponents/Bio';
import Feed from './BodyComponents/Feed';
import Connections from './BodyComponents/Connections';

function Body() {
    var Grid = {
        display: "grid",
        gridTemplateRows: "1fr 1fr",
        gridTemplateColumns: "repeat(3, 1fr)"
    }
    var Column = {
        gridColumnEnd: "span 1"
    }
    var ProfileStyle = {
        GridColumn: "1 / 2",
        GridRow: "1 / 2"
    }
    var BioStyle = {
        GridColumn: "3 / 4",
        GridRow: "2 / 3"
    }
    var FeedStyle = {
        GridColumn: "2 / 3",
        GridRow: "1 / 2"
    }
    var ConnectionsStyle = {
        GridColumn: "1 / 2",
        GridRow: "1 / 2"
    }
    
    return (
        <div style={Grid}>
            <Profile style={ProfileStyle}/>
            <Feed style={FeedStyle}/>
            <Connections style={ConnectionsStyle}/>
            <Bio style={BioStyle}/>
        </div>
    );
}

export default Body;