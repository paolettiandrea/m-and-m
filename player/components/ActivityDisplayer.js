Vue.component("mission-displayer", {
    template: `
        <div>
        <transition name="content-slide" mode="out-in">
                <div class="activity-displayer-div" v-if="this.pointedActivity" :key="this.pointedActivity.uid">
                    <activity-displayer :activityContent="this.pointedActivity"></activity-displayer>
                </div>
        </transition>
        <button v-on:click="nextActivity">Next mission</button>
        <chat></chat>
        </div>
    `,

    data() {
        return {
            missionData: null,

            pointedActivity: null,
            pointedIndex: 0,
            stile: 'test'
                /*stile: {
                    'background-color': 'black',
                    'opacity': '0.8',
                    'text-align': 'center'
                }*/
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
    },

})

Vue.component("activity-displayer", {
    template: `
                <div>
                <!-- <transition name="content-slide" mode="out-in"> -->
                    <div v-if="this.activityContent">
                        <div  v-for="contentChunk of this.activityContent.content">
                            <component :is="contentChunk.type" :data="contentChunk.data"></component>
                        </div>
                    </div>
                <!-- </transiton> -->
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

    computed: {
        parsed() {
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

Vue.component("card-displayer", {
    template: `<div class="card" style="width: 18rem;">
    <img :src="data.url" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">{{test}}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`,
    props: {
        data: null
    },
    data() {
        return {
            test: "M&M.jpeg"
        }
    }
})

Vue.component("img-displayer", {
    template: `<div><img :src="data.url" :width="data.w" :height="data.h"></div>`,
    props: {
        data: null
    }
})

Vue.component("chat", {
    template: `<div>
        <button class="open-button" v-on:click="openForm">Chat</button>
    <div class="chat-popup" id="myForm">
      <form action="/action_page.php" class="form-container">
        <h1>Chat</h1>

        <label for="msg"><b>Message</b></label>
        <textarea placeholder="Type message.." name="msg" required></textarea>

        <button type="submit" class="btn">Send</button>
        <button type="button" class="btn cancel" v-on:click="closeForm">Close</button>
      </form>
    </div>
<<<<<<< HEAD

</div>`
    ,
=======
    
</div>`,
>>>>>>> 13a910453e944ae7bb2f492483aec370a604a124

    methods: {
        openForm() {
            document.getElementById("myForm").style.display = "block";
        },
        closeForm() {
            document.getElementById("myForm").style.display = "none";
        }
    }



})


Vue.component("multiple-checkboxes", {
    template: `<div>
        <template>
  <div>

    <b-form-group label="Multiple checkboxes form">
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        buttons
        button-variant="primary"
        size="lg"
        name="buttons-2"
      ></b-form-checkbox-group>
    </b-form-group>
    <div>Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>
    </div>`,

<<<<<<< HEAD
  data() {
    return {
      selected: [],
      options: [
        { text: 'Orange', value: 'orange' },
        { text: 'Apple', value: 'apple' },
        { text: 'Pineapple', value: 'pineapple' },
        { text: 'Grape', value: 'grape' }
      ]
=======
    data() {
        return {
            selected: [],
            options: [
                { text: 'Orange', value: 'orange' },
                { text: 'Apple', value: 'apple' },
                { text: 'Pineapple', value: 'pineapple' },
                { text: 'Grape', value: 'grape' }
            ]
        }
>>>>>>> 13a910453e944ae7bb2f492483aec370a604a124
    }
})

<<<<<<< HEAD
Vue.component("text-insert",{
  template: `<div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Inserisci la tua risposta:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.text"
          type="text"
          required
          placeholder="Inserisci la tua risposta"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div> `,

  data() {
     return {
       form: {
         text: ''
       },
       show: true
     }
   },
   methods: {
     openForm(text) {
         document.getElementById("input-1").style.display = "block";
         if(this.form.text=="Risposta")
          {
            this.data.text="Risposta esatta";
            return this.data.text;
          }

     },
     onSubmit(evt) {
       evt.preventDefault()
       alert(JSON.stringify(this.form))
     },
     onReset(evt) {
       evt.preventDefault()
       // Reset our form values
       this.form.text = ''
       // Trick to reset/clear native browser form validation state
       this.show = false
       this.$nextTick(() => {
         this.show = true
       })
     }
   }
})








/*
<style scoped>
    .mission-form {
        overflow-x: hidden;
    }
    .content-slide-enter-active, .content-slide-leave-active {
        transition: all 0.5s;
    }
    .content-slide-enter, .content-slide-leave-to /* .list-leave-active below version 2.1.8 */
/*
{
    opacity: 0;
    transform: translateX(-100 % );
}
.content - slide - leave - to {
    opacity: 0;
    transform: translateX(100 % );
}
.labeled - form - group {
    label - cols: 3
}
<
/style>*/
=======
Vue.component("canvas-displayer", {
    template: `

    <div>
        <div id="canvas" v-on:mousemove="coordinate" v-on:click="viewCoordianate">{{x}},{{y}}</div>
        
    </div>
    `,
    data() {
        return {
            x: 0,
            y: 0
        }
    },
    methods: {
        coordinate(event) {
            this.x = event.offsetX;
            this.y = event.offsetY;
        },
        viewCoordianate(event) {
            alert("X: " + event.offsetX + " " + "Y: " + event.offsetY);
        }
    }
})
>>>>>>> 13a910453e944ae7bb2f492483aec370a604a124
