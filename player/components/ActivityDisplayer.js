Vue.component("mission-displayer", {
    template: `
        <div align="center">
        <transition name="content-slide" mode="out-in">
                <div class="activity-displayer-div" v-if="this.pointedActivity" :key="this.pointedActivity.uid">
                    <activity-displayer :activityContent="this.pointedActivity"></activity-displayer>
                </div>
        </transition>
        <button  v-on:click="nextActivity">Next mission</button>
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

                    <!--Input component-->
                    <component :is="activityContent.inputComponent.inputType" :data="activityContent.inputComponent.inputData" @input-received="inputHandler"></component>

                <!-- </transiton> -->
                </div>`,

    props: {
        activityContent: null
    },

    methods: {
        inputHandler(inputData) {

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
        align = "center"
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
</div>`,

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

Vue.component("text-insert", {
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
            return this.Answer == this.data.correctAnswer ? true : false
        },
        dynamicStyle() {
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









Vue.component("canvas-displayer", {
    template: `

    <div  align="center">
        <div id="canva" v-on:mousemove="coordinate" v-on:click="viewCoordianate"><p>{{x}},{{y}}</p></div>

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



Vue.component("click-img", {
    template: `
    <div :align="data.pos" >
        <img :src="data.url" alt="Workplace" usemap="#workmap" :width="data.w" :height="data.h" v-on:click="test">

        <map name="workmap">
        <area shape="rect" :coords="data.computer" alt="Computer" v-on:click="imgClick('Computer')">
        <area shape="rect" :coords="data.telefono" alt="Phone" v-on:click="imgClick('iPhone')">
        <area shape="circle" :coords="data.caffe" alt="Cup of coffee" v-on:click="imgClick('Caffè')">
        </map>
    </div>
    `,
    props: {
        data: null
    },
    methods: {
        imgClick(x) {
            alert(x);
        },
        test() {
            alert("NO");
        }
    }


})


Vue.component("video-displayer", {
    template: `
    <div  :align="data.pos">
        <video :width="data.w"  controls>
            <source :src="data.url" type="video/mp4">
        </video>
    </div>
    `,
    props: {
        data: null
    }

})


Vue.component("canvas-draw", {
    template: `

    <div  align="center" id="drawing">
    <h1>Canvas Demo</h1>
    <canvas ref="canvas" id='drawing-pad' :width="data.w" :height="data.h">
      This is an interactive drawing pad.
    </canvas>
    <div>
      <button @click='resetCanvas'>Reset Canvas</button>
      <button @click='saveImage'>Save Image</button>
      <button @click='replay'>Replay</button>
    </div>
    <hr>
    <img ref="img" src="" id='canvas-image'>
    <small>Right click to save image.</small>
  </div>
    `,
    props: {
        data: null
    },
    data() {
        return {
            canvas: null,
            context: null,
            isDrawing: false,
            startX: 0,
            startY: 0,
            points: [],
        }
    },
    mounted() {
        var vm = this
        vm.canvas = vm.$refs.canvas
        vm.context = vm.canvas.getContext("2d");
        vm.canvas.addEventListener('mousedown', vm.mousedown);
        vm.canvas.addEventListener('mousemove', vm.mousemove)
        document.addEventListener('mouseup', vm.mouseup);
    },
    methods: {
        mousedown(e) {
            var vm = this
            var rect = vm.canvas.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            vm.isDrawing = true;
            vm.startX = x;
            vm.startY = y;
            vm.points.push({
                x: x,
                y: y
            });
        },
        mousemove(e) {
            var vm = this
            var rect = vm.canvas.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            if (vm.isDrawing) {
                vm.context.beginPath();
                vm.context.moveTo(vm.startX, vm.startY);
                vm.context.lineTo(x, y);
                vm.context.lineWidth = 1;
                vm.context.lineCap = 'round';
                vm.context.strokeStyle = "rgba(255, 0, 0, 1)";
                vm.context.stroke();

                vm.startX = x;
                vm.startY = y;

                vm.points.push({
                    x: x,
                    y: y
                });
            }
        },
        mouseup(e) {
            var vm = this
            vm.isDrawing = false;
            if (vm.points.length > 0) {
                localStorage['points'] = JSON.stringify(vm.points);
            }
        },
        resetCanvas() {
            var vm = this
            vm.canvas.width = vm.canvas.width;
            vm.points.length = 0; // reset points array
        },
        saveImage() {
            var vm = this
            var dataURL = vm.canvas.toDataURL();
            var img = vm.$refs.img;
            img.src = dataURL;
        },
        replay() {
            var vm = this
            vm.canvas.width = vm.canvas.width;

            // load localStorage
            if (vm.points.length === 0) {
                if (localStorage["points"] !== undefined) {
                    vm.points = JSON.parse(localStorage["points"]);
                }
            }

            var point = 1;
            setInterval(function() {
                drawNextPoint(point);
                point += 1;
            }, 10);

            function drawNextPoint(index) {
                if (index >= vm.points.length) {
                    return;
                }
                var startX = vm.points[index - 1].x;
                var startY = vm.points[index - 1].y;

                var x = vm.points[index].x;
                var y = vm.points[index].y;

                vm.context.beginPath();
                vm.context.moveTo(startX, startY);
                vm.context.lineTo(x, y);
                vm.context.lineWidth = 1;
                vm.context.lineCap = 'round';
                vm.context.strokeStyle = "rgba(255, 0, 0, 1)";
                vm.context.stroke();
            }
        },
    }
}).$mount('#drawing')