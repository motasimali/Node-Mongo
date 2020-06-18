const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dpoper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client)=>{
    console.log('Connected successfully to mongodb');
    const db = client.db(dbname);
    dpoper.insertDocument(db, {name : "Vodonut", description: 'Test'}, 'dishes')
        .then((result)=>{
            console.log('Insert Document:\n', result.ops);
            return dpoper.findDocuments(db,'dishes')
        })   
        .then((docs)=>{
            console.log('Found Documents:\n', docs);
            return dpoper.updateDocument(db, {name : "Vodonut"},{description: "update test"}, 'dishes')
        })  
        .then((result)=>{
            console.log('Update Document:\n', result.result);
            return dpoper.findDocuments(db,'dishes')
        })  
        .then((docs)=>{
            console.log('Find Documents:\n', docs);
            return db.dropCollection('dishes')
        })  
        .then((result)=>{
            console.log('Dropped Collection: ', result);
            client.close();
        }).catch((err) => console.log(err));;
})
.catch((err)=> console.log(err))