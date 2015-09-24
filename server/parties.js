/**
 * Created by pauljones on 24/09/15.
 */
Meteor.publish("parties", function (options,searchString) {
    if (searchString == null)
        searchString = '';
    Counts.publish(this, 'numberOfParties', Parties.find({
        'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
        $or:[
            {$and:[
                {'public': true},
                {'public': {$exists: true}}
            ]},
            {$and:[
                {owner: this.userId},
                {owner: {$exists: true}}
            ]}
        ]}), { noReady: true });
    return Parties.find({
        'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
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