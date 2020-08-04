const uuid = require('uuid');
const utils = require('./Utils.js')
const fs = require('fs')

const RES_DIR = "./data/missions/";
const RES_REGISTER = "resRegister.json";

// TODO json register concurrent issue: if a uploadRes follows a deleteRes the uploadRes could read the register file before the deleteRes has wrote it.
// A possible solution would be a sobstituteRes or a different reg file for every resource



function getMissionDir(missionId) {
    return RES_DIR + missionId + /resources/;
}

function getRegisterPath(missionId) {
    return getMissionDir(missionId)+ '/' + RES_REGISTER;
}

function addResourceDir(missionId) {
    fs.mkdir(getMissionDir(missionId), (err) => {
        if (err) throw err;
    });
}



function removeResourceDir(missionId) {
    utils.deleteFolderRecursive(getMissionDir(missionId));
}


function addResource(missionId, file) {
    let uid = uuid.v1().toString();
    let fileName = uid;

    // Add extension if present
    let lastDot = file.name.lastIndexOf('.');
    if (lastDot!==-1) {
        fileName += file.name.substring(lastDot);
    }

    let newResData = {
        resId: fileName,
        originalName: file.name,
    }

    fs.writeFile(getMissionDir(missionId) + fileName, file.data, (err => {
        if (err) throw err;
    }))

    // fs.readFile(getRegisterPath(missionId), 'utf-8', function (err, data) {
    //     let regObj = JSON.parse(data);
    //     regObj.resources[fileName] = newResData;
    //     fs.writeFile(getRegisterPath(missionId), JSON.stringify(regObj, null, 4), function (err) {
    //         if (err) throw err;
    //     });
    // });

    return newResData;
}

function removeResource(missionId, fileName) {

    fs.unlinkSync(getMissionDir(missionId) + '/' + fileName);

    // fs.readFile(getRegisterPath(missionId), 'utf-8', function (err, data) {
    //     let regObj = JSON.parse(data);
    //     if (regObj.resources[fileName]) {
    //         console.log(regObj.resources[fileName]);
    //         delete regObj.resources[fileName];
    //         console.log(regObj);
    //     } else {
    //         throw Error("Couldn't find the file in the register");
    //     }
    //     fs.writeFile(getRegisterPath(missionId), JSON.stringify(regObj, null, 4), function (err) {
    //         if (err) throw err;
    //     });
    // });

}


module.exports = {
    getMissionDir,
    addResource,
    addResourceDir,
    removeResourceDir,
    removeResource
}