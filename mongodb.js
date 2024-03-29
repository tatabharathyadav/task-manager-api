//CRUD operations

const { MongoClient ,ObjectId} = require('mongodb');

const uri = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db(databaseName);
        //const collection = database.collection('users');

        // const result = await collection.insertOne({
        //     name: 'charan',
        //     age: 22
        // });
       
        // const collection=database.collection('user2');
        // const result=await collection.insertMany([{
        //     name:'sumanth',
        //     marks:45,
        //     pass:true

        // },
        // {
        //     name:'vishnu',
        //     marks:33,
        //     pass:false

        // },
        // {
        //     name:'jayanth',
        //     marks:39,
        //     pass:true
        // }])

        // console.log('Document inserted successfully:', result.ops);


//read

//const collection = database.collection('users');

// const result = await collection.findOne({
//         name: 'sumanth',
//     });

    // const result = await collection.findOne({
    //     _id: new ObjectId('66028cd8321b3b651b5646a5'),
    // });

    // const result=await collection.find({
    //     age:22
    // }).toArray();

    // console.log(result);
    // const count = await collection.countDocuments({ age: 22 });
    // console.log(count);


//updating
// const collection = database.collection('users');
// const result = await collection.updateOne({
//            _id:new ObjectId('660258e4021b7fc1dc30da6f')
//         },
//         {
//             $set:
//             {
//                 name:'yadav'
//             }
//             // $inc:
//             // {
//             //     age:1
//             // }
//         });
//         console.log(result)



// const collection = database.collection('user2');
// const result = await collection.updateMany({
//            pass:true
//         },
//         {
//             $set:
//             {
//                 pass:false
//             }
//         });
//         console.log(result)


//deleting
// const collection = database.collection('users');
// const result = await collection.deleteMany({
//                age:25
//             });
// console.log(result);


const collection = database.collection('user2');
const result = await collection.deleteOne({
               marks:33
            });
console.log(result);




    }finally {
        await client.close();
    }
}

run().catch(console.error);


