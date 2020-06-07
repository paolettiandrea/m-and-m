export default {
    template: `
        <div >
            <resource-form :resData="contentChunkData.imgResData" defaultResource="/common/img_placeholder.png"></resource-form>
            
            <b-button-group>
                <b-button variant="outline-primary"><b-icon icon="text-left" ></b-icon></b-button>
                <b-button variant="outline-primary"><b-icon icon="text-center" ></b-icon></b-button>
                <b-button variant="outline-primary"><b-icon icon="text-right" ></b-icon></b-button>
            </b-button-group>
        
        </div>
        
    `,
    props: {
        contentChunkData: null
    },

    components: {
        "resource-form": () => import('../../common/ResourceForm.js')
    }
}