// Interface with Google Font API for font use

const APIBaseUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key='
const APIKey = 'AIzaSyBsxtAP_lkRvpDUg_Il87oMAKGqRKFvaPo';  // TODO remove api key from repo stuff
const APIFontList = APIBaseUrl + APIKey + '&sort=popularity';

function loadGoogleFonts(fontFamilyArray) {
    WebFont.load({
        google: {
            families: fontFamilyArray
        }
    });

}

// Builds a a dictionary of the top n Google fonts with all the information needed for download
export class FontDB {
    constructor(fontNumber) {
        this.fontDictionary = {}
        this.fontOrderArray = []
        axios.get(APIFontList).then((res, err) => {
            if (err) throw err;
            for (let i = 0; i < Math.min(res.data.items.length, fontNumber); i++) {
                this.fontDictionary[res.data.items[i].family] = res.data.items[i];
                this.fontOrderArray.push(res.data.items[i].family);
            }
            console.log(this.fontDictionary);

            this.fetchDisplayCharacters();
        })
    }

    fetchDisplayCharacters() {
        let fontArray = [];
        for (const font of this.fontOrderArray) {
            fontArray.push(font)
        }
        loadGoogleFonts(fontArray);

    }

}





