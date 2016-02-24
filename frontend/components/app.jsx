var React = require('react');
var History = require('react-router').History;

var Header = require('./header.jsx');
var SessionStore = require('../stores/session.js');
var UserStore = require('../stores/user.js');
var SessionBackendActions = require('../actions/sessionBackendActions.js');
var UserBackendActions = require('../actions/userBackendActions.js');

window.SessionStore = SessionStore;
window.UserStore = UserStore;

var App = React.createClass({
  mixins: [History],
  getInitialState: function() {
    return {
      loggedIn: SessionStore.loggedIn()
    };
  },
  componentWillMount: function() {
    SessionBackendActions.checkForUser();
    UserBackendActions.fetchAllUsers();
  },
  componentDidMount: function() {
    this.listenerToken = SessionStore.addListener(this.onSessionChange);
  },
  componentWillUnmount: function() {
    this.listenerToken.remove();
  },
  onSessionChange: function() {
    console.log(SessionStore.loggedIn());
    if (SessionStore.loggedIn()) {
      // this.history.push("users/" + SessionStore.currentUser().id);
      var location = "/#/users/" + SessionStore.currentUser().id;
      window.location = location;
    } else {
      // this.history.push("/");
      window.location = "/";
      this.setState({loggedIn: SessionStore.loggedIn()});
    }
  },
  render: function() {
    return <div id='App'>
      <div><Header /></div>
      <div>{this.props.children}</div>
    </div>;
  }
});


module.exports = App;
