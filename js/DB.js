var db = new PouchDB('dbname'),
    remote = 'https://xxjclarksterxx.cloudant.com/',
    opts = {
        continuous: true
    };

db.replicate.to(remote, opts);
db.replicate.from(remote, opts);

// create a document; log the response
db.post({
    name: 'Mike Broberg'
}, function(err, response) {
    console.log(err || response);
});

// read a document by ID; log the response
db.get(DOCUMENT_ID, function(err, response) {
    console.log(err || response);
});

// update a document; log the response
db.put({
    _id: DOCUMENT_ID,
    _rev: DOCUMENT_REV,
    name: 'Mike Broberg',
    title: 'Baseballer of the Ninth Circle'
}, function(err, response) {
    console.log(err || response);
});

// delete a document; log the response
db.remove({
    _id: DOCUMENT_ID,
    _rev: DOCUMENT_REV
}, function(err, response) {
    console.log(err || response);
});
