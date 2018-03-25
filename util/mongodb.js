const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

class MongoAccess {

    constructor() {}

    open() {
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
            if (err) return console.log(err);
            this.db = client.db('star-wars-quotes');
            console.log('Mongodb connected successfully');
        });
    }

    findAll() {
        return this.db.collection('quotes').find().toArray();
    }

    find(query) {
        return this.db.collection('quotes').find(query).toArray();
    }

    findById(id) {
        return this.db.collection('quotes').findOne({_id: new ObjectId(id)});
    }

    insert(quote) {
        return this.db.collection('quotes').insertOne(quote);
    }

    update(quote) {
        let id = quote._id;
        delete quote._id;
        return this.db.collection('quotes').findOneAndUpdate({_id: new ObjectId(id)}, {$set: quote}, {upsert: true});
    }

    deleteById(id) {
        return this.db.collection('quotes').deleteOne({_id: new ObjectId(id)});
    }
}
var mongo = new MongoAccess();
mongo.open();

module.exports = mongo;
