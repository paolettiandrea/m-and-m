Vue.component("qr-reader", {
    template: `<div align=center>
        
        <h1 class=player-title>Scansiona un QR code per avviare una storia</h1>
        
        <div>
        <input type=text size=16 placeholder="Premi sul QR code" class=qrcode-text>

        <label class=qrcode-text-btn>
            <input aria-label="Scansiona un qr code" type=file accept="image/*" capture=environment onclick="return showQRIntro();" onchange="openQRCamera(this);" tabindex=-1>
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
    <img class="chat-icon" src="chatimg.png" width="50" height="50" v-on:click="openForm" role="button" aria-label="Chat">
    <img class="chat-icon2" src="info.png" width="50" height="50" v-on:click="test()" role="button" aria-label="Chiedi un indizio">
    <div id="not" class="badge">
    <span>{{msg}}</span>
    </div>
    <div id="not2" class="badge2">
    <span>!</span>
    </div>
    </div>
    


    <div class="chat-popup" id="myForm" role="dialog">
        <form @submit.prevent="sendMessage('out')" >

        

        <div class="col-md-8 col-xl-6 chat">
        <div class="card">


            <div class="card-header msg_head">

            <img class="chat-icon2" src="close.png" width="25" height="25" v-on:click="closeForm()" role="button" aria-label="Chiedi un indizio">


                <div class="d-flex bd-highlight">
                    <div class="img_cont">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">
                        <span class="online_icon"></span>
                    </div>
                    <div class="user_info">
                        <span>SUPERVISORE</span>
                    </div>
                </div>
            </div>


            <div class="card-body msg_card_body" >


            <section ref="chatArea" tab-index="1" role="Navigation" aria-label="Messaggi ricevuti">
                <p v-for="message in messages"  :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }">
                {{ message.body }}
                </p>
            </section>



            <div class="card-footer">
                <div class="input-group">

                    <input  v-model="youMessage" type="text" placeholder="Scrivi al supervisore" style="width: 200px;" tab-index="2">

                </div>
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

        socket.on('hint', (hint) => {
            console.log("Received hint: ", hint);
            this.messages.push({body: "Indizio: " + hint, author: 'bob'})
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




   Vue.component("puzzle-game", {
     template: `
     <div class="box">
          <ul class="puzzle-wrap">
              <li
                  :class="{'puzzle': true, 'puzzle-empty': !puzzle}"
                  v-for="puzzle in puzzles"
                  v-text="puzzle"
                  @click="moveFn(index)"
              ></li>
          </ul>
          <button class="btn btn-warning btn-block btn-reset" @click="render">重置游戏</button>
      </div>
       `,

     data() {
       return{
            puzzles: []
       }
     },

     methods: {
       // reset rendering
        render () {
         let puzzleArr = [],
             i = 1

                      // Generate an array containing 1 ~ 15 digits
         for (i; i < 16; i++) {
             puzzleArr.push(i)
         }

                      // randomly disturb the array
         puzzleArr = puzzleArr.sort(() => {
             return Math.random() - 0.5
         });

                      // page display
         this.puzzles = puzzleArr
         this.puzzles.push('')
       },
     moveFn (index) {
            // 获取点击位置及其上下左右的值
            let curNum = this.puzzles[index],
                leftNum = this.puzzles[index - 1],
                rightNum = this.puzzles[index + 1],
                topNum = this.puzzles[index - 4],
                bottomNum = this.puzzles[index + 4]
            // 和为空的位置交换数值
            if (leftNum === '' && index % 4) {
                this.puzzles.$set(index - 1, curNum)
                this.puzzles.$set(index, '')
            } else if (rightNum === '' && 3 !== index % 4) {
                this.puzzles.$set(index + 1, curNum)
                this.puzzles.$set(index, '')
            } else if (topNum === '') {
                this.puzzles.$set(index - 4, curNum)
                this.puzzles.$set(index, '')
            } else if (bottomNum === '') {
                this.puzzles.$set(index + 4, curNum)
                this.puzzles.$set(index, '')
            }
            this.passFn()
        },
        // 校验是否过关
        passFn () {
       
            if (this.puzzles[15] === '') {
                const newPuzzles = this.puzzles.slice(0, 15)
                const isPass = newPuzzles.every((e, i) => e === i + 1)
                if (isPass) {
                    alert ('恭喜，闯关成功！')
                }
            }
        },
        ready () {
          this.render()
       }
    }
     

   });

