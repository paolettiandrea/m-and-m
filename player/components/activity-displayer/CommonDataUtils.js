// File contenente funzioni di util che date delle informazioni di stile e i default di una missione restituiscono
// un oggetto contenente le effettive informazioni di stile che devono essere applicate, tale oggetto può essere
// restituito da una computed property e utilizzato da un :style="..."

const uberDefaults = {
    // Styling for a text paragraph
    textFontData: {
        fontFamily: "Roboto",
        fontSize: "14px",
        fontColor: "#000000",
        fontStyle: 'normal',
        fontWeight: 'normal',
        textDecoration: 'none',
        textAlign: 'left'
    },
    // Styling data for the container common to every content/input
    commonData: {
        borderData: {
            borderStyle: "hidden",
            borderWidth: "2px",
            borderColor: "#000000",
            borderRadius: "0px"
        },
        spacingData: {
            padding: {
                top: "0px",
                bottom: "10px",
                left: "5px",
                right: "5px"
            },
            margin: {
                top: "0px",
                bottom: "0px",
                left: "0px",
                right: "0px"
            }
        },
        backgroundData: {
            backgroundColor: "#ffffff"
        }
    }
}

function buildStyle(valArray) {
    for (const val of valArray) {
        if (val) return val;
    }
}

// Build an object containing the higher priority defaults for every field
function buildDefaultObject(defaults, uberDefaults) {
    let obj = {}
    for (const def in defaults) {
        if ((typeof defaults[def])==='object') {
            // If the pointed field is an object build it with a recursive call
            if (uberDefaults[def]) obj[def] = buildDefaultObject(defaults[def], uberDefaults[def]);
            else obj[def] = defaults[def];
        } else {
            obj[def] = defaults[def];
        }
    }

    if (uberDefaults) {
        for (const uberDef in uberDefaults) {
            // If not already defined by the defaults take it from the uberDefs
            if (!obj[uberDef]) obj[uberDef] = uberDefaults[uberDef];
        }
    }
    return obj;
}



function buildFontStyle(fontData, fontDefaults) {
    var obj = {
        fontFamily: buildStyle([fontData.fontFamily, fontDefaults.fontFamily, uberDefaults.textFontData.fontFamily]),
        fontSize: buildStyle([fontData.fontSize, fontDefaults.fontSize, uberDefaults.textFontData.fontSize]),
        color: buildStyle([fontData.fontColor, fontDefaults.fontColor, uberDefaults.textFontData.fontColor]),
        fontStyle: buildStyle([fontData.fontStyle, fontDefaults.fontStyle, uberDefaults.textFontData.fontStyle]),
        fontWeight: buildStyle([fontData.fontWeight, fontDefaults.fontWeight, uberDefaults.textFontData.fontWeight]),
        textDecoration: buildStyle([fontData.fontDecoration, fontDefaults.fontDecoration, uberDefaults.textFontData.fontDecoration]),
        textAlign: buildStyle([fontData.fontAlignment, fontDefaults.fontAlignment, uberDefaults.textFontData.fontAlignment])};      // TODO defaults
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

function buildSpacingStyle(spacingData, spacingDefaults) {
    return {
        paddingTop: spacingData.padding.top || spacingDefaults.padding.top,
        paddingBottom: spacingData.padding.bottom || spacingDefaults.padding.bottom,
        paddingRight: spacingData.padding.right || spacingDefaults.padding.right,
        paddingLeft: spacingData.padding.left || spacingDefaults.padding.left,
        marginTop: spacingData.margin.top || spacingDefaults.margin.top,
        marginBottom: spacingData.margin.bottom || spacingDefaults.margin.bottom,
        marginRight: spacingData.margin.right || spacingDefaults.margin.right,
        marginLeft: spacingData.margin.left || spacingDefaults.margin.left,
    }
}

// TODO background style

function buildBackgroundData(backgroundData, backgroundDefaults) {
    return {
        backgroundColor: backgroundData.backgroundColor || backgroundDefaults.backgroundColor,
    }
}

// Permette di unire dui oggetti conteneti informazioni di stile, permettendo di passarli entrambi a un costrutto :style="..."
function mergeStyleData(styleDataArray) {
    let obj = {};

    for (const styleData of styleDataArray) {
        for (const key in styleData) {
            if (obj.hasOwnProperty(key)) {}
            if (obj[key]===undefined) {
                obj[key] = styleData[key];
            } else {
                throw Error("While merging styleData a field was defined multiple times. Maybe you have applied the same style two times?");
            }
        }
    }
    console.log(obj);
    return obj;
}