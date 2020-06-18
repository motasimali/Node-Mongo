const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dpoper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);
    console.log('Connected successfully to mongodb');
    const db = client.db(dbname);
    dpoper.insertDocument(db, {name : "Vodonut", description: 'Test'}, 'dishes', (result)=>{
        console.log('Insert Document:\n', result.ops);
        dpoper.findDocuments(db,'dishes',(docs)=>{
            console.log('Found Documents:\n', docs);
            dpoper.updateDocument(db, {name : "Vodonut"},{description: "update test"}, 'dishes', (result)=>{
                console.log('Update Document:\n', result.result);
                dpoper.findDocuments(db,'dishes',(docs)=>{
                    console.log('Find Documents:\n', docs);
                    db.dropCollection('dishes',(result)=>{
                        console.log('Dropped Collection: ', result);
                        client.close();
                    })
                })
            })
        })
    });
})