Vue.component("qr-reader", {
    template: `<div align=center>
        
        <h1 class=title>Scansiona un QR code per avviare una storia</h1>
        
        <div>
        <input type=text size=16 placeholder="Premi sul QR code" class=qrcode-text>

        <label class=qrcode-text-btn>
            <input type=file accept="image/*" capture=environment onclick="return showQRIntro();" onchange="openQRCamera(this);" tabindex=-1>
        </label>
        </div>

        <div ontouchstart="">
            <div class="button">
                <a>Inizia la tua storia</a>
            </div>
            </div>
        
        </div>`,
    
    props: {
        contentData: null
    }
})


Vue.component("chat", {
    template: `<div>
    <div class="notification">
    <img class="chat-icon" src="chatimg.png" width="50" height="50" v-on:click="openForm" role="button" alt="Chat">
    <img class="chat-icon2" src="info.png" width="50" height="50" v-on:click="test()" role="button" alt="Chiedi un indizio">
    <div id="not" class="badge">
    <span>{{msg}}</span>
    </div>
    <div id="not2" class="badge2">
    <span>...</span>
    </div>
    </div>
    


    <div class="chat-popup" id="myForm" role="dialog">
        <form @submit.prevent="sendMessage('out')" class="form-container">

            <h5 style="color:black;">Chat supervisore</h5>

            <img width="25" height="25" v-on:click="closeForm" src="chiudi.jpg" role="button" alt="Chiudi" tab-index="0">

            <section ref="chatArea" class="chat-area" tab-index="1" alt="Messaggi ricevuti">
                <p v-for="message in messages" class="message" :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }">
                {{ message.body }}
                </p>
            </section>

            <input  v-model="youMessage" type="text" placeholder="Scrivi al supervisore" style="width: 240px;" tab-index="2">
        

        </form> 
    </div>      
</div>`,

data() {
    return{
        msg: 0,
        bobMessage: '', 
        youMessage: '', 
        messages: []
    }
},

    methods: {
        openForm() {
            document.getElementById("myForm").style.display = "block";
            //alert("ok");
        },
        closeForm() {
            document.getElementById("myForm").style.display = "none";
            document.getElementById("not").style.display= "none";
            this.msg=0;
        
        },
        test(){
            socket.emit('need-hint')
            // this.youMessage= 'Il player ha chiesto un suggerimento!';
            // this.messages.push({body: this.youMessage, author: 'you'})
            //   socket.emit('message-for-supervisor', this.youMessage);
        },
        sendMessage(direction) {
      
            //console.log(this)
            if (!this.youMessage && !this.bobMessage) {
              return
            }
            if (direction === 'out') {
                
              this.messages.push({body: this.youMessage, author: 'you'})
              socket.emit('message-for-supervisor', this.youMessage);
              this.youMessage = ''
            } else if (direction === 'in') {
              this.messages.push({body: this.bobMessage, author: 'bob'})
              this.bobMessage = ''
            } else {
              alert('something went wrong')
            }
            Vue.nextTick(() => {
              let messageDisplay = this.$refs.chatArea
              messageDisplay.scrollTop = messageDisplay.scrollHeight
            })
          },
          clearAllMessages() {
            this.messages = []
          }
    },

    mounted() {
        socket.on('message-from-supervisor', (message) => {
            this.messages.push({body: message, author: 'bob'})
            this.msg++;
            document.getElementById("not").style.display = "block";
        })
    }

})

// Old stuff
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

Vue.component("pure-knob", {
  template: `
  <div id="demo">

  </div>
  `,
  props: {
      inputData: null
  }

})
