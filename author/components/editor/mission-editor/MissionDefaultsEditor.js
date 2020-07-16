Vue.component('mission-defaults-editor', {
    template: `
        <div>
            <p> Mission defaults editor </p>
            <editor-subpanel label="Testo">
                <font-editor :fontData="defaults.textFontData" :defaults="uberDefaults.textFontData"></font-editor>
            </editor-subpanel>
            <common-styling-editor :commonData="defaults.commonData" :defaults="uberDefaults.commonData"></common-styling-editor>
        </div>
    `,

    props: {
        defaults: null,
        uberDefaults: null
    },


})