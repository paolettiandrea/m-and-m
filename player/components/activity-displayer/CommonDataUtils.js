// File contenente funzioni di util che date delle informazioni di stile e i default di una missione restituiscono
// un oggetto contenente le effettive informazioni di stile che devono essere applicate, tale oggetto può essere
// restituito da una computed property e utilizzato da un :style="..."

function buildFontData(contentData, defaults) {
    var obj = {fontFamily: (contentData.fontData.fontFamily || defaults.textFontData.fontFamily),
        fontSize: contentData.fontData.fontSize || defaults.textFontData.fontSize,
        color: contentData.fontData.fontColor || defaults.textFontData.fontColor};
    return obj;
}

function buildBorderData(contentData, defaults) {
    return {
        borderColor: "black",
        borderStyle: "dotted",
        borderWidth: "10px"     // TODO link to dynamic fields (with defaults)
    }
}


// Permette di unire dui oggetti conteneti informazioni di stile, permettendo di passarli entrambi a un costrutto :style="..."
function mergeStyleData(data1, data2) {
    let obj = {};
    for (const key in data1) {
        obj[key] = data1[key];
    }
    for (const key in data2) {
        obj[key] = data2[key];
    }
    return obj;
}