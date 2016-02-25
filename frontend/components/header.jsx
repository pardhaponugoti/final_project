var React = require('react');
var History = require('react-router').History;

var SessionBackendActions = require('../actions/sessionBackendActions.js');

var Header = React.createClass({
  mixins: [History],
  getInitialState: function() {
    return {
      modalIsOpen: false,
    };
  },
  signOut: function() {
    SessionBackendActions.signOutUser();
  },
  signIn: function() {
    this.history.push('/session/new');
  },
  currentUserUrl: function() {
    return "#/users/" + this.props.currentUser.id;
  },
  editUserUrl: function() {
    return this.currentUserUrl() + "/edit";
  },
  toggleModal: function() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  },
  userDropdown: function() {
    if (this.props.currentUser.id !== undefined) {
      return <div className="btn-group nav navbar-nav navbar-right">
        <button className="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown">
          {this.props.currentUser.email} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a href={this.currentUserUrl()}>My Page</a></li>
          <li><a href={this.editUserUrl()}>Edit Profile</a></li>
          <li><a href="/" onClick={this.signOut}> Sign Out</a></li>
        </ul>
      </div>;
    } else {
      // <button className="btn btn-default btn-sm" type="button" data-toggle="modal" data-target="#sign-in-modal">Sign In</button>
      return <div className="btn-group nav navbar-nav navbar-right">
        <button className="btn btn-default btn-sm" onClick={this.toggleModal}>Sign In</button>
      </div>;
    }
  },
  render: function() {
    return <nav className="navbar navbar-default navbar-fixed-top">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">WebSiteName</a>
      </div>
      <div id="navbarCollapse" className="collapse navbar-collapse">
        <form role="search" className="navbar-form navbar-left">
          <div className="form-group">
            <input type="text" placeholder="Search" className="form-control"/>
          </div>
        </form>
        {this.userDropdown()}
      </div>
    </nav>;
  }
});

module.exports = Header;
