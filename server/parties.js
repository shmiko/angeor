/**
 * Created by pauljones on 24/09/15.
 */
Meteor.publish("parties", function (options) {
    return Parties.find({
        $or:[
            {$and:[
                {"public": true},
                {"public": {$exists: true}}
            ]},
            {$and:[
                {owner: this.userId},
                {owner: {$exists: true}}
            ]}
        ]}, options);
});