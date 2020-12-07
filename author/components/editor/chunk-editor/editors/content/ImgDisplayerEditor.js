Vue.component('img-displayer-editor', {
    template: `
        <div >
        <url-input :target="contentData.imgResData" fieldName="url"></url-input>
            
        </div>
        
    `,
    props: {
        contentData: null
    }
})