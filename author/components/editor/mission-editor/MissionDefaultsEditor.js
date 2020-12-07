Vue.component('mission-defaults-editor', {
    template: `
        <div class="main-column">
            <activity-editor-subpanel label="Testo">
                <font-editor :fontData="defaults.textFontData" :defaults="uberDefaults.textFontData"></font-editor>
            </activity-editor-subpanel>
            <common-styling-editor :commonData="defaults.commonData" :defaults="uberDefaults.commonData"></common-styling-editor>
            <button-editor :buttonData="defaults.buttonData" :defaults="uberDefaults.buttonData"></button-editor>
        </div>
    `,

    props: {
        defaults: null,
        uberDefaults: null
    },


})