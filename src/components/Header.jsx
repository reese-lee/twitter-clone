import React from "react";

function Header() {
    var HeaderStyles = {
        display: "flex",
        border: "1px solid black",
        flexWrap: "nowrap"
    }

    return (
        <div style={HeaderStyles}>
            <div>
                <h1>Home</h1>
                <h1>Notifications</h1>
                <h1>Messages</h1>
            </div>
            <h1>Search</h1>
            <h1>Tweet</h1>
        </div>
    );
}

export default Header;