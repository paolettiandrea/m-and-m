Vue.component("activity-displayer", {
    template: `<div v-if="this.dummyData">
                    <div  v-for="contentChunk of this.dummyData.content">
                        <component :is="contentChunk.type" :data="contentChunk.data"></component>
                    </div>
                </div>`,

    data:function() {
        return {
            dummyData: null
        }
    },

    mounted() {
        axios.
        get("/player/data/dummycontent.json").
        then(res => {
            this.dummyData = res.data;
        })
    }
})

Vue.component("text-displayer", {
    template: `<div><p>{{data.text}}</p></div>`,
    props: {
        data: null
    }
})

Vue.component("img-displayer", {
    template: `<div><p>I'm an image displayer and my image is at {{data.url}}</p></div>`,
    props: {
        data: null
    }
})