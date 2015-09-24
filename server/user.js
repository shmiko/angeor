/**
 * Created by pauljones on 24/09/15.
 */
Meteor.publish("users", function () {
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});