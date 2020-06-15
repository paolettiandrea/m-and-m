Vue.component("qr-reader", {
    template: `<div><input type=text size=16 placeholder="Tracking Code" class=qrcode-text>
        <label class=qrcode-text-btn>
        <input type=file accept="image/*" capture=environment onclick="return showQRIntro();" onchange="openQRCamera(this);" tabindex=-1></label>
        <input type=button value="Go" disabled></div>`,
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

