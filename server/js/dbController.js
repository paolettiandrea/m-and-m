const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

const dbUrl = "mongodb://localhost:27017";
const missionsDB = 'missions'
const missionHeadsCol = 'mission-heads'
const missionContentCol = 'mission-contents'


async function getMissionHeadsList() {
    return new Promise((resolve) => {
        MongoClient.connect(dbUrl, function(err, client) {
            if (err) throw err;
            const db = client.db(missionsDB);
            db.collection(missionHeadsCol).find().toArray().then( res => {
                for (const head in res) {
                    head._id = new ObjectId(head._id);
                }
                client.close();
                resolve(res);
            })
        })
    });
}

async function getMissionContent(uid) {
    return new Promise((resolve) => {
        MongoClient.connect(dbUrl, function(err, client) {
            if (err) throw err;
            const db = client.db(missionsDB);
            db.collection(missionContentCol).findOne({ "_id" : new ObjectId(uid)}).then( res => {
                console.log(res);
                client.close();
                resolve(res);
            })
        })
    });
}

// Creates a new mission in the database and returns its missionHead
async function newMission() {
    return new Promise((resolve)=> {
        MongoClient.connect(dbUrl, function(err, client) {
            if (err) throw err;
            const db = client.db(missionsDB);
            // Get default new mission from file (for easy editing)
            fs.readFile("data/newMissionTemplate.json", 'utf-8', ((err, data) => {
                var newMissionObj = JSON.parse(data);

                // Insert mission content in database
                db.collection(missionContentCol).insertOne(newMissionObj.missionContent).then( res => {
                    // Retrieve the inserted mission content _id and add it to the missionHead object, then add it to the database
                    newMissionObj.missionHead.contentId = res.insertedId;
                    db.collection(missionHeadsCol).insertOne(newMissionObj.missionHead).then( res => {
                        client.close();
                        resolve(res.ops[0]);
                    })
                })
            }));
        });
    })
}

async function deleteMission(uid) {
    return new Promise((resolve)=> {
        MongoClient.connect(dbUrl, function(err, client) {
            if (err) throw err;

            let convertedUid;
            try {
                convertedUid = new ObjectId(uid);
            } catch (e) {
                resolve(0);
            }


            const db = client.db(missionsDB);
            // Remove missionHead from head database
            db.collection(missionHeadsCol).findOneAndDelete({"_id": convertedUid}).then( res => {
                let contentId = res.value.contentId;
                // Remove missionContent from content database
                db.collection(missionContentCol).findOneAndDelete({"_id": new ObjectId(contentId)}).then( res => {
                    client.close();
                    resolve(res.value._id);
                })
            })
        });
    })
}

async function updateMission(missionData) {
    return new Promise((resolve)=> {
        MongoClient.connect(dbUrl, function(err, client) {
            if (err) throw err;
            const db = client.db(missionsDB);
            // Convert id strings to ObjectIds      FIXME
            missionData.missionHead._id = new ObjectId(missionData.missionHead._id);
            missionData.missionHead.contentId = new ObjectId(missionData.missionHead.contentId);
            missionData.missionContent._id = new ObjectId(missionData.missionContent._id);
            db.collection(missionHeadsCol).replaceOne(
                        {"_id": new ObjectId(missionData.missionHead._id)},
                        missionData.missionHead).then( res => {
                db.collection(missionContentCol).replaceOne(
                            {"_id": new ObjectId(missionData.missionHead.contentId)},
                            missionData.missionContent).then( res => {
                    resolve();
                })
            })
        });
    })
}

module.exports = {
    newMission,
    deleteMission,
    getMissionHeadsList,
    updateMission,
    getMissionContent
}
