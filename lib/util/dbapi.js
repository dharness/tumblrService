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

var deletePost = function(dexID) {
    db.collection('posts').remove({
        'dexID': dexID
    }, function(err, result) {
        if (!err) return true;
        else return false;
    });
}

var loadBySCID = function(dexID) {
    db.collection('posts').findOne({
        'dexID': dexID
    }, function(err, result) {
        return result;
    });
}

// var loadByTID = function(tumblrID) {
//     db.collection('posts').findOne({
//         'tumblrID': tumblrID
//     }, function(err, result) {
//         return result;
//     });

// }