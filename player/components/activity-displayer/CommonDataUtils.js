// File contenente funzioni di util che date delle informazioni di stile e i default di una missione restituiscono
// un oggetto contenente le effettive informazioni di stile che devono essere applicate, tale oggetto può essere
// restituito da una computed property e utilizzato da un :style="..."

function buildFontStyle(fontData, fontDefaults) {
    var obj = {fontFamily: (fontData.fontFamily || fontDefaults.fontFamily),
        fontSize: fontData.fontSize || fontDefaults.fontSize,
        color: fontData.fontColor || fontDefaults.fontColor};
    return obj;
}

function buildBorderStyle(borderData, borderDefaults) {
    return {
        borderWidth: borderData.borderWidth || borderDefaults.borderWidth,
        borderColor: borderData.borderColor || borderDefaults.borderColor,
        borderStyle: borderData.borderStyle || borderDefaults.borderStyle,
        borderRadius: borderData.borderRadius || borderDefaults.borderRadius
    }
}


// Permette di unire dui oggetti conteneti informazioni di stile, permettendo di passarli entrambi a un costrutto :style="..."
function mergeStyleData(styleDataArray) {
    let obj = {};

    console.log(styleDataArray)
    for (const styleData of styleDataArray) {
        for (const key in styleData) {
            if (obj.hasOwnProperty(key)) {}
            if (obj[key]===undefined) {
                obj[key] = styleData[key];
            } else {
                throw Error("While merging styleData a field was defined multiple times. Maybe you have applied the same style two times?");
            }
        }
        console.log(styleData);
    }
}