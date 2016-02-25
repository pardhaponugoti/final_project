var UserFrontendActions = require('../actions/userFrontendActions.js');

var UserUtil = {
  // on page load
  fetchAllUsers: function() {
    console.log("fetchingusers");
    $.ajax({
      url : "/api/users",
      type: "GET",
      success: function(data) {
        UserFrontendActions.receiveAllUsers(data);
      }
    });
  },
  updateUser: function(userData) {
    console.log("ajaxupdatinguser");
    $.ajax({
      url: "/api/users/" + userData.id,
      type: 'PATCH',
      data: userData,
      success: function(data) {
        UserFrontendActions.updateCurrentUser(data);
      }
    });
  },
  deleteUser: function(userId) {
    console.log("ajaxdeletinguser");
    $.ajax({
      url: "/api/users/" + userId,
      type: 'DELETE',
      data: {id: userId},
      success: function(data) {
        UserFrontendActions.deleteCurrentUser(data);
      }
    });
  }

};


module.exports = UserUtil;
