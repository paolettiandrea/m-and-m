const uuid = require('uuid');

const RES_DIR = "data/resources/";
const RES_REGISTER = "resRegister.json";

// TODO json register concurrent issue: if a uploadRes follows a deleteRes the uploadRes could read the register file before the deleteRes has wrote it.
// A possible solution would be a sobstituteRes or a different reg file for every resource

function getMissionDir(missionId) {
    return RES_DIR + missionId;
}

function deleteFolderRecursive(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

function getRegisterPath(missionId) {
    return getMissionDir(missionId)+ '/' + RES_REGISTER;
}

function addResourceDir(missionId) {
    fs.mkdir(getMissionDir(missionId), (err) => {
        if (err) throw err;
    });

    // fs.writeFile(getRegisterPath(missionId), JSON.stringify({ resources: {} }, null, 4), function (err) {
    //     if (err) throw err;
    //
    // });
}

function removeResourceDir(missionId) {
    deleteFolderRecursive(getMissionDir(missionId));
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
        relPath: missionId + '/' + fileName,
        path: getMissionDir(missionId) + '/' + fileName,
        originalName: file.name,
        fileName: fileName,
        uses: 1
    }

    fs.writeFile(newResData.path, file.data, (err => {
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