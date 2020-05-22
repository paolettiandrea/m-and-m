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

Vue.component("qr-reader", {
    template: `<div><input type=text size=16 placeholder="Tracking Code" class=qrcode-text>
        <label class=qrcode-text-btn>
        <input type=file accept="image/*" capture=environment onclick="return showQRIntro();" onchange="openQRCamera(this);" tabindex=-1></label> 
        <input type=button value="Go" disabled></div>`,
    props: {
        data: null
    }
})

Vue.component("text-displayer", {
    template: `<div><p>{{data.text}}</p></div>`,
    props: {
        data: null
    }
})

Vue.component("img-displayer", {
    template: 
    `<div class="card" style="width: 18rem;">
    <img src="M&M.jpeg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">{{data.url}}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`,
    props: {
        data: null
    }
})