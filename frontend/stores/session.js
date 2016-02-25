var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');

var SessionStore = new Store(AppDispatcher);
var SessionConstants = require('../constants/sessionConstants.js');
var UserConstants = require('../constants/userConstants.js');

var _currentUser = {};
// var _newUser = false;

SessionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case (SessionConstants.USER_SIGN_IN):
      _currentUser = payload.data;
      // _newUser = false;
      SessionStore.__emitChange();
      break;
    case (SessionConstants.USER_SIGN_UP):
      _currentUser = payload.data;
      // _newUser = true;
      SessionStore.__emitChange();
      break;
    case (SessionConstants.USER_SIGN_OUT):
      _currentUser = {};
      SessionStore.__emitChange();
      break;
    case (UserConstants.UPDATE_USER):
      _currentUser = payload.data;
      SessionStore.__emitChange();
      break;
    case (UserConstants.DELETE_USER):
      _currentUser = {};
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.currentUser = function() {
  return _currentUser;
};

// SessionStore.newUser = function() {
//   return _newUser;
// };

SessionStore.loggedIn = function() {
  return _currentUser.email !== undefined;
};

module.exports = SessionStore;
