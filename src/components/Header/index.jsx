import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="App-header">
                <h1 className="App-title"><strong>WELCOME TO LIVE TWEETS</strong></h1>
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..." />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button">ENTER</button>
                    </span>
            </div>
            </header>
        )
    }
}

export default Header;