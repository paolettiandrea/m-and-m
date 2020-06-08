Vue.component("mission-displayer", {
    template: `
        <div>
        <transition name="content-slide" mode="out-in">
                <div class="activity-displayer-div" v-if="this.pointedActivity" :key="this.pointedActivity.uid">
                    <activity-displayer :activityContent="this.pointedActivity"
                        @next:activity="handleNextActivity"></activity-displayer>
                </div>
        </transition>
        <chat></chat>
        </div>
    `,

    data() {
        return {
            // All the relevant data for the mission
            missionData: null,
            // A reference to the activity being displayed right now
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
        handleNextActivity(nextActivityId) {
            // Funzione temporanea che cambia la pointedActivity a quella successiva nella lista contenuta in missionData
            this.pointedActivity = this.missionData.activities[nextActivityId];
        }
    },

    mounted() {
        axios.
        get("/player/data/dummycontent.json").
        then(res => {
            this.missionData = res.data;

            this.pointedActivity = this.missionData.activities['initial'];
        })
    },

})

Vue.component('activity-content-displayer', {
    template: `
                <div>
                    <!--For every object in the content array render a component of type defined contentChunk.type-->
                    <div class="activity-displayer-chunk-container" v-if="this.activityContent">
                        <slot name="inter" index="0"></slot>
                        <div  v-for="(contentChunk, index) of this.activityContent.content" >
                            <slot name="head" :contentChunk="contentChunk" :index="index"></slot>
                            <div v-on:click="contentChunkClicked({content: contentChunk, index: index})">
                                <component :id="'content-chunk-'+index" class="content-chunk" :is="contentChunk.type" :data="contentChunk.data" ></component>
                            </div>
                            <slot name="inter" :index="index+1"></slot>
                        </div>    
                    </div>
                </div>`,

    props: {
        contentList: null
    },
    methods: {
        contentChunkClicked(contentData) {
            this.$emit("content:chunk:clicked", contentData);
        }
    }
})

Vue.component("activity-displayer", {
    template: `
                <div>
                    <activity-content-displayer :contentList="activityContent.content"></activity-content-displayer>
                    
                    
                    <b-collapse v-model="popupVisible">
                        <activity-content-displayer :contentList="popupContent"></activity-content-displayer>
                    </b-collapse>
                    <!--Input component: the component type is defined by the string inputType and it receives the 
                                         data object inputData as the prop "data" (every input component needs to have 
                                         a data prop that it can use to retrieve all the data needed to define its behaviour)-->
                    <component :is="activityContent.inputComponent.inputType" :data="activityContent.inputComponent.inputData" @input-received="handleInputReceived"></component>

                </div>`,

    props: {
        activityContent: null,


    },

    data() {
        return {
            popupContent: null,
            popupVisible: false
        }
    },

    methods: {
        // Called when the InputComponent triggers an input-received event.
        // inputResponse defines what should happen next
        handleInputReceived(inputResponse) {
            switch (inputResponse.responseType) {
                case "popup":       //
                    this.popupContent = inputResponse.popupContent;
                    this.popupVisible = true;
                    break;

                case "next":        // Send a next activity event to the mission displayer
                    this.$emit('next:activity', inputResponse.nextActivityId);
                    this.popupContent = null;
                    this.popupVisible = false;
            }
        }
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

Vue.component('test-input', {
    template: `<div>
        <b-button v-on:click="nextActivity"> Next activity </b-button>
        <b-button v-on:click="popup"> Popup </b-button>
    </div>`,
    props: {
        data: null
    },
    methods: {
        nextActivity() {
            this.$emit('input-received', {
                responseType: "next",
                nextActivityId: this.data.nextActivityId
            })
        },
        popup() {
            this.$emit('input-received', {
                responseType: "popup",
                popupContent: this.data.popupContent
            })
        }
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
    template: `<div><img :src="data.imgResData.url" :width="data.w" :height="data.h"></div>`,
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
    
</div>`
    ,

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
    }
})

Vue.component("text-insert",{
  template: `<div>
  <div role="group" >
  <label for="input-live">Inserisci la tua risposta:</label>
  <b-form-input
    id="input-live"
    v-model="Answer"
    :state="textState"
    aria-describedby="input-live-help input-live-feedback"
    placeholder="Enter your answer"
    trim
  ></b-form-input>

  <!-- This will only be shown if the preceding input has an invalid state -->
  <div v-if="!this.data.correctAnswer">
    <b-form-invalid-feedback id="input-live-feedback">
      Risposta non esatta, riprova!
    </b-form-invalid-feedback>
  </div>

  <!-- This is a form text block (formerly known as help block) -->
  <b-form-text id="input-live-help">Your full text.</b-form-text>
</div>
  </div> `,

   props: {
      data: null
   },
   computed: {
      textState() {
        return this.Answer==this.data.correctAnswer ? true : false
      },
      dynamicStyle(){
        return {
          color: ``
        }
      }
    },
    data() {
      return {
        Answer: ''
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
