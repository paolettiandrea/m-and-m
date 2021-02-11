Vue.component("chat", {
    template: `<div>
    <div class="notification">
    <img class="chat-icon" src="chatimg.png" width="50" height="50" v-on:click="openForm" role="button" aria-label="Chat">
    <img class="chat-icon2" src="info.png" width="50" height="50" v-on:click="test()" role="button" aria-label="Chiedi un indizio">
    <div id="not" class="badge">
    <span>{{msg}}</span>
    </div>
    <div id="not2" class="badge2 badge">
    <span>1</span>
    </div>
    </div>
    


    <div class="chat-popup" id="myForm" role="dialog">
        <form @submit.prevent="sendMessage('out')" >

        

        <div>
        <div class="card" style="display: flex; flex-direction:column">


            <div class="card-header msg_head" style="flex:0">

                <img class="chat-icon2" src="close.png" width="25" height="25" v-on:click="closeForm()" role="button" aria-label="Chiedi un indizio">


                <div >
                    <div class="img_cont">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">
                        <span class="online_icon"></span>
                    </div>
                    <div class="user_info">
                        <span>SUPERVISORE</span>
                    </div>
                </div>
            </div>


            <div class="card-body msg_card_body" style="overflow-y: auto; flex:1" >


            <section ref="chatArea" style="flex: 1;">
                <p v-for="message in messages"  :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }">
                {{ message.body }}
                </p>
            </section>



            
        </div>
<div style="flex:0">
                <div>

                    <input  class="form-control type_msg" v-model="youMessage" type="text" placeholder="Scrivi al supervisore" style="width: 200px;" tab-index="2">

                </div>
            </div>
    </div>
</div>
        

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
            document.getElementById("not2").style.display= "block";
            //far sparire la notifica quando si riceve un indizio
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
            
          },
          clearAllMessages() {
            this.messages = []
          },
          nextTick() {
            let messageDisplay = this.$refs.chatArea
            messageDisplay.scrollTop = messageDisplay.scrollHeight
          },
          scroll(){
            var container = this.$el.querySelector("card-body msg_card_body");
            container.scrollTop = container.scrollHeight;

          }
          
         
    },

    mounted() {
        socket.on('message-from-supervisor', (message) => {
            this.messages.push({body: message, author: 'bob'})
            this.msg++;
            document.getElementById("not").style.display = "block";
        })

        socket.on('hint', (hint) => {
            console.log("Received hint: ", hint);
            this.msg++;
            document.getElementById("not").style.display = "block";
            document.getElementById("not2").style.display = "none";
            this.messages.push({body: "Indizio: " + hint, author: 'bob'})
        })
    }

})