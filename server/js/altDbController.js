const fs = require('fs');
const path = require('path')
const uuid = require('uuid')
const utils = require(path.join(__dirname, '/Utils.js'));

const missionContentFileName = 'missionContent.json'

let basePath = '/webapp/data/';
if (process.env.DB_MODE==='sandbox') basePath = path.join(__dirname, '../data/')
const missionsDir = path.join(basePath, '/missions/');
const missionsHeadsPath = path.join(missionsDir, '/missionHeads.json')
const newMissionTemplatePath = path.join(__dirname, '../data/newMissionTemplate.json');

function missionDirectory(id) { return path.join(missionsDir, id) }
function missionContentFile(id) { return path.join(missionDirectory(id), missionContentFileName) }


function initializeDb() {
    fs.mkdir(missionsDir, {recursive: true}, (err) => {
        if (err) throw err;
    })

    // if (!fs.existsSync(missionsHeadsPath)) {
    //     fs.writeFile(missionsHeadsPath, JSON.stringify({}, null, 2), (err) => { if (err) throw err;})
    // }
}

// Returns an object containing all the mission heads keyed by their unique ids
async function getMissionHeadsList() {
    return new Promise((resolve) => {
        fs.readFile(missionsHeadsPath,  'utf-8', (err, data) => {
            if (err) resolve(err);
            resolve(data);
        })
    });
}

async function getMissionContent(uid) {
    return new Promise((resolve) => {
        fs.readFile(missionContentFile(uid), 'utf-8', (err, missionContent) => {
            if (err) throw err;
            resolve(missionContent);
        } )
    });
}

// Creates a new mission in the database and returns its missionHead
async function newMission() {
    return new Promise((resolve)=> {
        let new_id = uuid.v1();

        // Get default new mission from file (for easy editing)
        fs.readFile(newMissionTemplatePath, 'utf-8', ((err, newMissionTemplate) => {
            if (err) {resolve(err);}
            newMissionTemplate = JSON.parse(newMissionTemplate);
            // Add new missionHead to the list
            // fs.readFile(missionsHeadsPath, 'utf-8', ((err, missionHeads) => {      // TODO when implementing archive missions can be created in it
            //     if (err) resolve(err);
            //     missionHeads = JSON.parse(missionHeads);
            //     missionHeads[new_id] = newMissionTemplate.missionHead;
            //     fs.writeFile(missionsHeadsPath, JSON.stringify(missionHeads, null, 2), (err) => { if (err){ resolve(err);}})
            //     // resolve({
            //     //     id: new_id,
            //     //     head: missionHeads[new_id],
            //     //     content: newMissionTemplate.missionContent
            //     // })
            // }))
            // Make a directory for the new mission
            let missionPath = missionDirectory(new_id);
            fs.mkdir(missionPath, {recursive: true}, (err) => {
                if (err) resolve(err);
                fs.writeFile(path.join(missionPath, missionContentFileName), JSON.stringify(newMissionTemplate.missionContent, null, 2), (err) => { if (err) resolve(err); else resolve({yo:"adad"})
                })
            })
        }))
    })
}

// WARNING: deletes the whole database folder, should use with care
function deleteDbDir() {
    utils.deleteFolderRecursive('/webapp/data');
}

async function deleteMission(uid) {
    return new Promise((resolve)=> {
        fs.readFile(missionsHeadsPath, 'utf-8', ((err, missionHeads) => {
            missionHeads = JSON.parse(missionHeads);
            delete missionHeads[uid];
            fs.writeFile(missionsHeadsPath, JSON.stringify(missionHeads, null, 2), (err) => { if (err){ throw err;}})
        }))

        utils.deleteFolderRecursive(missionDirectory(uid));
        resolve()
    })
}

async function updateMission(missionData) {
    return new Promise((resolve)=> {
            fs.readFile(missionsHeadsPath, 'utf-8', ((err, missionHeads) => {
                missionHeads = JSON.parse(missionHeads);
                missionHeads[missionData.id] = missionData.missionHead;
                fs.writeFile(missionsHeadsPath, JSON.stringify(missionHeads, null, 2), (err) => { if (err){ throw err;}})
            }))
            fs.writeFile(path.join(missionsDir, missionData.id, missionContentFileName), JSON.stringify(missionData.missionContent, null, 2), (err) => { if (err) throw err; })
            resolve();
    })
}

module.exports = {
    newMission,
    deleteMission,
    getMissionHeadsList,
    updateMission,
    getMissionContent,
    deleteDbDir,
    initializeDb
}