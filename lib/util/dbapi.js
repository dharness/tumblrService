var db = require('mongoskin').db('localhost:27017/tumblr');

var insert = function(dexID, tumblrID) {
    db.collection('posts').insert({
            'dexID': dexID,
            'tumblrID': tumblrID,
            function(err, result) {
                return result;
            });
    });
}

var loadByDID = function(dexID) {
    db.collection('posts').findOne({
        'dexID': dexID
    }, function(err, result) {
        return result;
    });
}

var loadByTID = function(tumblrID) {
    db.collection('posts').findOne({
        'tumblrID': tumblrID
    }, function(err, result) {
        return result;
    });

}