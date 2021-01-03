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

    buttonData: {
        label: 'Continua',
        labelFontData: {
            fontFamily: "Roboto",
            fontSize: "14px",
            fontColor: "#000000",
            fontStyle: 'normal',
            fontWeight: 'normal',
            textDecoration: 'none',
            textAlign: 'left'
        },
        buttonBorderData: {
            borderWidth: "2px",
            borderRadius: "1px",
            borderColor: "#000000",
            borderStyle: "dotted"
        },
        buttonBackgroundData: {
            backgroundColor: 'black',
            opacity: 1,
        }
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
            backgroundColor: "#ffffff",
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

function buildCompositeStyle(data, defs, uberDefs, fields) {
    let obj = {}
    for (const style in fields) {
        let fieldName = fields[style];
        obj[style] = buildStyle([data[fieldName] || defs[fieldName] || uberDefs[fieldName]])
    }
    return obj;
}

function buildFontStyle(fontData, fontDefaults, uberDefs) {
    return buildCompositeStyle(fontData, fontDefaults, uberDefs, {
        fontFamily: 'fontFamily',
        fontSize: 'fontSize',
        color: 'fontColor',
        fontStyle: 'fontStyle',
        fontWeight: 'fontWeight',
        textDecoration: 'fontDecoration',
        textAlign: 'fontAlignment'})}

function buildFontData(fontData, fontDefaults, uberDefs) {
    return buildCompositeStyle(fontData, fontDefaults, uberDefs, {
        fontFamily: 'fontFamily',
        fontSize: 'fontSize',
        color: 'fontColor',
        fontStyle: 'fontStyle',
        fontWeight: 'fontWeight',
        fontDecoration: 'fontDecoration',
        fontAlignment: 'fontAlignment'})}

function buildBorderStyle(borderData, borderDefaults, uberDefs) {
    return buildCompositeStyle(borderData, borderDefaults, uberDefs, {
        borderColor: 'borderColor' ,
        borderWidth: 'borderWidth',
        borderStyle: 'borderStyle',
        borderRadius: 'borderRadius'
    })}

function buildWrapperStyle(commonData, commonDefaults, uberDefs) {
    return {
        ... (commonData.borderData) ? buildBorderStyle(commonData.borderData, commonDefaults.borderData, uberDefs.borderData) : null,
        ... (commonData.spacingData) ? buildSpacingStyle(commonData.spacingData, commonDefaults.spacingData, uberDefs.spacingData) : null,
        ... (commonData.backgroundData) ? buildBackgroundData(commonData.backgroundData, commonDefaults.backgroundData, uberDefs.backgroundData) : null
    }
}

function buildSpacingStyle(spacingData, spacingDefaults, uberDefs) {
    return {
        paddingTop: spacingData.padding.top || spacingDefaults.padding.top || uberDefs.padding.top,
        paddingBottom: spacingData.padding.bottom || spacingDefaults.padding.bottom || uberDefs.padding.bottom,
        paddingRight: spacingData.padding.right || spacingDefaults.padding.right || uberDefs.padding.right,
        paddingLeft: spacingData.padding.left || spacingDefaults.padding.left || uberDefs.padding.left,
        marginTop: spacingData.margin.top || spacingDefaults.margin.top || uberDefs.margin.top,
        marginBottom: spacingData.margin.bottom || spacingDefaults.margin.bottom || uberDefs.margin.bottom,
        marginRight: spacingData.margin.right || spacingDefaults.margin.right || uberDefs.margin.right,
        marginLeft: spacingData.margin.left || spacingDefaults.margin.left || uberDefs.margin.left,
    }
}

function buildBackgroundData(backgroundData, backgroundDefaults, uberDefaults) {

    let color = backgroundData.backgroundColor || backgroundDefaults.backgroundColor || uberDefaults.backgroundColor;
    let opacity = backgroundData.opacity || backgroundDefaults.opacity || uberDefaults.opacity;
    let backgroundImg = backgroundData.backgroundImage || backgroundDefaults.backgroundImage || uberDefaults.backgroundImage
    let rgb = hexToRgb(color);
    let rgb_string = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + opacity + ")";

    let background_style = {
        backgroundColor: rgb_string,


    }
    if (backgroundImg) {
        background_style.backgroundImage = "url(" + backgroundImg + ")";
        background_style.backgroundRepeat = "no-repeat";
        background_style.backgroundSize= "cover";

    }
    return background_style;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


function buildButtonData(buttonData, buttonDefs, uberDefs) {
    return {
        label: buildStyle([buttonData.label, buttonDefs.label, uberDefs.label]),
        buttonBackgroundData: buildBackgroundData(buttonData.buttonBackgroundData, buttonDefs.buttonBackgroundData, uberDefs.buttonBackgroundData),
        labelFontData: buildFontData(buttonData.labelFontData, buttonDefs.labelFontData, uberDefs.labelFontData),
        buttonBorderData: buildBorderStyle(buttonData.buttonBorderData, buttonDefs.buttonBorderData, uberDefs.buttonBorderData),
    }
}


function buildButtonStyle(buttonData, buttonDefs, uberDefs) {
    return mergeStyleData([
        buildBorderStyle(buttonData.buttonBorderData, buttonDefs.buttonBorderData, uberDefs.buttonBorderData),
        buildFontStyle(buttonData.labelFontData, buttonDefs.labelFontData, uberDefs.labelFontData),
        buildBackgroundData(buttonData.buttonBackgroundData, buttonDefs.buttonBackgroundData, uberDefs.buttonBackgroundData),
    ])
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
    return obj;
}