const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const utils = require(path.join(__dirname, "/Utils.js"));
var qr = require("qr-image");
const { resolve } = require("path");

const missionContentFileName = "missionContent.json";
const missionRankingFileName = "rankings.json";
const missionQrCodeFileName = "qrCode.svg";

let basePath = "/webapp/data/tempp/";
if (!process.env.DB_MODE || process.env.DB_MODE === "sandbox")
  basePath = path.join(__dirname, "../data/");
const missionsDir = path.join(basePath, "/missions/");
const missionsHeadsPath = path.join(missionsDir, "/missionHeads.json");
const newMissionTemplatePath = path.join(
  __dirname,
  "../data/newMissionTemplate.json"
);

function missionDirectory(id) {
  return path.join(missionsDir, id);
}
function missionContentFile(id) {
  return path.join(missionDirectory(id), missionContentFileName);
}

function initializeDb() {
  console.log('Initializing database at base path: ' + basePath);
  if (!fs.existsSync(basePath)) {
    console.log(basePath + " doesn't exists, creating relevand files and directories.")
    fs.mkdirSync(basePath, { recursive: true });
    fs.mkdirSync(missionsDir, { recursive: true });

    if (!fs.existsSync(missionsHeadsPath)) {
      console.log('Creating mission head file');
      fs.writeFile(missionsHeadsPath, JSON.stringify({}, null, 2), (err) => {
        if (err) throw err;
      });
    }
  }
}

// Returns an object containing all the mission heads keyed by their unique ids
async function getMissionHeadsList() {
  return new Promise((resolve) => {
    fs.readFile(missionsHeadsPath, "utf-8", (err, data) => {
      if (err) resolve(err);
      resolve(data);
    });
  });
}

async function getMissionContent(uid) {
  return new Promise((resolve) => {
    fs.readFile(missionContentFile(uid), "utf-8", (err, missionContent) => {
      if (err) resolve(err);
      resolve(missionContent);
    });
  });
}

// Creates a new mission in the database and returns its missionHead
async function newMission() {
  return new Promise((resolve) => {
    console.log("Creating new mission");
    let new_id = uuid.v1();

    // Get default new mission from file (for easy editing)
    // fs.readFile(newMissionTemplatePath, "utf-8", (err, newMissionTemplate) => {
      // if (err) {
        // resolve(err);
      // }
      newMissionTemplate = JSON.parse(JSON.stringify(newMissionTemplateObj));
      // Add new missionHead to the list
      fs.readFile(missionsHeadsPath, "utf-8", (err, missionHeads) => {
        // TODO when implementing archive missions can be created in it
        if (err) resolve(err);
        missionHeads = JSON.parse(missionHeads);
        missionHeads[new_id] = newMissionTemplate.missionHead;
        fs.writeFile(
          missionsHeadsPath,
          JSON.stringify(missionHeads, null, 2),
          (err) => {
            if (err) {
              resolve(err);
            }
          }
        );
        resolve({
          id: new_id,
          head: missionHeads[new_id],
          content: newMissionTemplate.missionContent,
        });
      });
      // Make a directory for the new mission
      let missionPath = missionDirectory(new_id);
      fs.mkdir(missionPath, { recursive: true }, (err) => {
        console.log("Making directory for the mission at: " + missionPath)
        if (err) resolve(err);
        var qr_code = qr.image(new_id, { type: "svg" });
        let qrPath = path.join(missionPath, missionQrCodeFileName);
        console.log("Creating qr file at: " + qrPath);
        qr_code.pipe(
          fs.createWriteStream(qrPath)
        );
        console.log("Creating the conte file");
       
        fs.writeFile(path.join(missionPath, missionRankingFileName), JSON.stringify([]), (err) => {
          if (err) resolve (err);
          else {
            console.log("Created ranking file")
            fs.writeFile(
              path.join(missionPath, missionContentFileName),
              JSON.stringify(newMissionTemplate.missionContent, null, 2),
              (err) => {
                if (err) resolve(err);
                else resolve({ yo: "adad" });
              }
            );
          }
        })

        // fs.mkdir(missionPath + '/resources/', {recursive: true}, (err) => {
        //     if (err) resolve(err);})
      });
    // });
  });
}

// WARNING: deletes the whole database folder, should use with care
function deleteDbDir() {
  utils.deleteFolderRecursive("/webapp/data");
}

async function deleteMission(uid) {
  return new Promise((resolve) => {
    fs.readFile(missionsHeadsPath, "utf-8", (err, missionHeads) => {
      missionHeads = JSON.parse(missionHeads);
      delete missionHeads[uid];
      fs.writeFile(
        missionsHeadsPath,
        JSON.stringify(missionHeads, null, 2),
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
    });

    utils.deleteFolderRecursive(missionDirectory(uid));
    resolve();
  });
}

async function updateMission(missionData) {
  return new Promise((resolve) => {
    fs.readFile(missionsHeadsPath, "utf-8", (err, missionHeads) => {
      missionHeads = JSON.parse(missionHeads);
      missionHeads[missionData.id] = missionData.missionHead;
      fs.writeFile(
        missionsHeadsPath,
        JSON.stringify(missionHeads, null, 2),
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
    });
    fs.writeFile(
      path.join(missionsDir, missionData.id, missionContentFileName),
      JSON.stringify(missionData.missionContent, null, 2),
      (err) => {
        if (err) throw err;
      }
    );
    resolve();
  });
}

async function getMissionRankings(missionId) {
  return new Promise((resolve) => { 
    fs.readFile(path.join(missionDirectory(missionId), missionRankingFileName), "utf-8",  (err, res) => {
    if (err) throw err;
    console.log("Reading rankings: ", JSON.parse(res));
    resolve(JSON.parse(res))
    })
  })
}





var ONE_HOUR = 60 * 60 * 1000;
async function getMissionRankingsLastHour(missionId) {
  return new Promise((resolve) => {

  getMissionRankings(missionId).then((ranking) => {
    let actualRanking = [];
    for (rank of ranking) {
      console.log("Checking rank time")
      if ((Date.now() - rank.scoreTime) < ONE_HOUR) {
        console.log("Lower")
        actualRanking.push(rank);
      }
    }
    resolve(actualRanking);
    })
  })
}


async function addMissionScore(missionId, missionScore) {
  return new Promise((resolve) => {
    console.log(missionId)
    missionScore.scoreTime = Date.now();
    getMissionRankings(missionId).then((rankings) => {
      rankings.push(missionScore);
      fs.writeFile(path.join(missionDirectory(missionId), missionRankingFileName), JSON.stringify(rankings, null, 2), (err) => {
        if (err) throw err;
        else 
        {
          console.log("Added score: ", missionScore)
          resolve()
        }
      })
    })
  })
}



async function clearMissionRankings(missionId) {
  return new Promise((resolve) => {
    console.log(missionId)
      fs.writeFile(path.join(missionDirectory(missionId), missionRankingFileName), JSON.stringify([], null, 2), (err) => {
        if (err) throw err;
        else 
        {
          console.log("Cleared rankings");
          resolve()
        }
      })
  })
}



module.exports = {
  newMission,
  deleteMission,
  getMissionHeadsList,
  updateMission,
  getMissionContent,
  deleteDbDir,
  initializeDb,
  getMissionRankings,
  getMissionRankingsLastHour,
  addMissionScore,
  clearMissionRankings,

  missionsDir,
};


const newMissionTemplateObj = {
  "missionHead": {
    "title": "Nuova missione",
    "summary": "Una breve descrizione della missione"
  },

  "missionContent": {
    "defaults": {
      "textFontData": {
      },
      "buttonData": {
        "label": "Continua",
        "labelFontData": {
          "fontFamily": "Roboto",
          "fontSize": "1em",
          "fontColor": "#000000",
          "fontStyle": "normal",
          "fontWeight": "normal",
          "textDecoration": "none",
          "textAlign": "left"
        },
        "buttonBorderData": {
          "borderWidth": "2px",
          "borderRadius": "5px",
          "borderColor": "#000000",
          "borderStyle": "solid"
        },
        "buttonBackgroundData": {
          "backgroundColor": "#ffffff"
        }
      },
      "commonData": {
        "borderData": {
          "borderStyle": "hidden",
          "borderWidth": "2px",
          "borderColor": "#000000",
          "borderRadius": "0px"
        },
        "spacingData": {
          "padding": {
            "top": "0px",
            "bottom": "10px",
            "left": "5px",
            "right": "5px"
          },
          "margin": {
            "top": "0px",
            "bottom": "0px",
            "left": "0px",
            "right": "0px"
          }
        },
        "backgroundData": {
          "backgroundColor": "#ffffff",
          "opacity": 0
        }
      },
      "screenStyleData": {
        "inner": {
          "borderData": {
            "borderStyle": "hidden",
            "borderWidth": "2px",
            "borderColor": "#000000",
            "borderRadius": "0px"
          },
          "spacingData": {
            "padding": {
              "top": "0px",
              "bottom": "0px",
              "left": "0px",
              "right": "0px"
            },
            "margin": {
              "top": "10px",
              "bottom": "10px",
              "left": "10px",
              "right": "10px"
            }
          },
          "backgroundData": {
            "backgroundColor": "#ffffff",
            "opacity": 0
          }
        },
        "outer": {
          "backgroundData": {
            "backgroundColor": "#ffffff",
            "opacity": 1
          }
        },
        "alignment": {
          "vertical": "normal"
        }
      }
    },
    "activities": {
      "initial": {
        "title": "Attività iniziale",
        "content": [],
        "uuid": "initial",
        "graphPosition": {
          "x": 0,
          "y": 0
        },
        "screenStyleData": {
          "inner": {
            "borderData": {},
            "spacingData": {
              "padding": {},
              "margin": {}
            },
            "backgroundData": {}
          }, "outer": {
            "backgroundData": {}
        },
      "alignment": { "vertical": "normal"}}
      }
    },
    "usedResources": { }
  }
}