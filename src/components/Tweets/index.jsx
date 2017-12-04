import React from 'react';
import Highlighter from 'react-highlight-words';
import $ from 'jquery';

class Tweets extends React.Component {

    componentDidUpdate() {
        console.log("hello")
        $(".filter-words:contains('vancouver')").css("background-color", "orange");
        $(".filter-words:contains('love')").css("background-color", "pink");
        $(".filter-words:contains('food')").css("background-color", "lightgreen");
        $(".filter-words:contains('sleep')").css("background-color", "yellow");
        $(".filter-words:contains('trump')").css("background-color", "brown");
    }

    render() {

        let data = this.props.tweets
        const tweetJSX = data.map((data, i) => 
            <li key={i} className="list-group-item">
                <span className="tweets">
                    <Highlighter
                        highlightClassName='filter-words'
                        searchWords={['vancouver', 'love', 'food', 'sleep', 'trump']}
                        autoEscape={true}
                        textToHighlight={data.text}
                    />
                    /* {data.text} */
                </span>
            </li>
        )
        
        return (
            <div className="tweet-list">
                <ul className="list-group">
                {tweetJSX}
                </ul>
            </div>
        )
    }
}

export default Tweets;