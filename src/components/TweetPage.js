import React, {Component} from 'react';
import {connect} from 'react-redux';
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";

class TweetPage extends Component {
    render() {
        const {id, replies} = this.props;
        return(
            <div>
                <Tweet id={id}/>
                <NewTweet id={id}/>
                {replies && replies.length ? (
                    <div>
                        <h3 className='center'> Replies</h3>
                        <ul>
                        {replies.map(replyId => (
                            <li key={replyId}>
                                <Tweet id={replyId}/>
                            </li>
                        ))}
                        </ul>
                    </div>) : null
                }
            </div>
        );
    }
}

const mapStateToPros = ({authedUser, tweets, users}, ownProps) => {
    const {id} = ownProps.match.params;

    return {
        id,
        replies: !tweets[id]
            ? []
            : tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToPros)(TweetPage);