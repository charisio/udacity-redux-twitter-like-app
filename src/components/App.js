import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";
import {connect} from 'react-redux';
import {handleInitialDate} from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBarContainer from "react-redux-loading";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";
import Nav from "./Nav";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialDate());
  }

  render() {
    return (
        <Router>
          <div className='container'>
            <LoadingBarContainer/>
            <Nav/>
            {this.props.loading ? null :
                <div>
                  <Route path='/' exact component={Dashboard}/>
                  <Route path='/tweet/:id' component={TweetPage}/>
                  <Route path='/new' component={NewTweet}/>
                </div>}
          </div>
        </Router>
    )
  }
}

function mapStateToProps ({authedUser}) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);