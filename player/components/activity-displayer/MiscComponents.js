Vue.component("qr-reader", {
    template: `<div align=center margin-top=20px>
        
        <h class=title>Premi sul QR code per scansionarne uno e avviare una storia</h>
        
        <div>
        <input type=text size=16 placeholder="QR code" class=qrcode-text>

        <label class=qrcode-text-btn>
            <input type=file accept="image/*" capture=environment onclick="return showQRIntro();" onchange="openQRCamera(this);" tabindex=-1>
        </label>
        </div>

        <input type=button value="Inizia la tua storia">
        
        </div>`,
    
    props: {
        contentData: null
    }
})



Vue.component("chat", {
    template: `<div>
    
    <img class="chat-icon" src="chatimg.png" width="50" height="50" v-on:click="openForm">


    <div class="chat-popup" id="myForm">
        <form @submit.prevent="sendMessage('out')" class="form-container">

            <h5 style="color:black;">Supervisore</h5>

            <img width="25" height="25" v-on:click="closeForm" src="chiudi.jpg">

            <section ref="chatArea" class="chat-area">
                <p v-for="message in messages" class="message" :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }">
                {{ message.body }}
                </p>
            </section>

            <input  v-model="youMessage" type="text" placeholder="Type your message" style="width: 240px;">
        

        </form> 
    </div>      
</div>`,

data() {
    return{
        bobMessage: '', 
        youMessage: '', 
        messages: [
            {
                body: 'Welcome to the chat, I\'m Bob!',
                author: 'bob'
              },
              {
                body: 'Thank you Bob',
                author: 'you'
              },
              {
                body: 'You\'re most welcome',
                author: 'bob'
              }
        ]
    }
},

    methods: {
        openForm() {
            document.getElementById("myForm").style.display = "block";
            //alert("ok");
        },
        closeForm() {
            document.getElementById("myForm").style.display = "none";
        },
        test(){
            alert("ok");
        },
        sendMessage(direction) {
      
            //console.log(this)
            if (!this.youMessage && !this.bobMessage) {
              return
            }
            if (direction === 'out') {
              this.messages.push({body: this.youMessage, author: 'you'})
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
