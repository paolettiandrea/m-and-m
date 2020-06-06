export default {
    template: `
        <div >
            <resource-form :resData="contentChunkData.imgResData" defaultResource="/common/img_placeholder.png"></resource-form>
        </div>
        
    `,
    props: {
        contentChunkData: null
    },

    components: {
        "resource-form": () => import('../../common/ResourceForm.js')
    }
}