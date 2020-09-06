Vue.component('img-displayer-editor', {
    template: `
        <div >
            <resource-form :resourceData="contentData.imgResData" defaultResource="/common/img_placeholder.png"></resource-form>
            
            <b-button-group>
                <b-button variant="outline-primary"><b-icon icon="text-left" ></b-icon></b-button>
                <b-button variant="outline-primary"><b-icon icon="text-center" ></b-icon></b-button>
                <b-button variant="outline-primary"><b-icon icon="text-right" ></b-icon></b-button>
            </b-button-group>
        
        </div>
        
    `,
    props: {
        contentData: null
    }
})