Vue.component("mission-displayer", {
    template: `
        <div>
            <div v-if="this.pointedActivity">
                <activity-displayer :activityContent="this.pointedActivity"></activity-displayer>
            </div>
            <button v-on:click="nextActivity">Next mission</button>
        </div>
    `,

    data() {
        return {
            missionData: null,

            pointedActivity: null,
            pointedIndex: 0
        }
    },
    methods: {
        nextActivity() {
            // Funzione temporanea che cambia la pointedActivity a quella successiva nella lista contenuta in missionData
            this.pointedIndex++;
            if (this.pointedIndex >= this.missionData.activityList.length) { this.pointedIndex = 0; }
            this.pointedActivity = this.missionData.activityList[this.pointedIndex];
        }
    },

    mounted() {
        axios.
        get("/player/data/dummycontent.json").
        then(res => {
            this.missionData = res.data;

            this.pointedActivity = this.missionData.activityList[this.pointedIndex];
        })
    }
})

Vue.component("activity-displayer", {
    template: `<div v-if="this.activityContent">
                    <div  v-for="contentChunk of this.activityContent.content">
                        <component :is="contentChunk.type" :data="contentChunk.data"></component>
                    </div>
                </div>`,

    props: {
        activityContent: null
    },


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
    template: `<div><div v-html="this.parsed"></div></div>`,
    props: {
        data: null
    },

    computed:{
      parsed (){
          if (this.data.parseMarkdown) {
              var converter = new showdown.Converter();
              parsedHtml = converter.makeHtml(this.data.text);
              return parsedHtml;
          } else {
              return this.data.text;
          }

      }
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
