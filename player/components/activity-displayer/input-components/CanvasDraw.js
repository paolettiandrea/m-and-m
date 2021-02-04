// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top,
  };
}

Vue.component("canvas-draw", {
  template: `

    <div class="canvas-draw-container"  align="center" id="drawing" style="width=100%; height: 100%">
    <canvas ref="canvas" id='drawing-pad' style="width=100%; height: 100%;" :style="canvasBackgroundStyle">
      This is an interactive drawing pad.
    </canvas>
    <div>
      <!-- <button @click='resetCanvas'>Reset Canvas</button> -->
      <!-- <button @click='saveImage'>Save Image</button> -->
      <!-- <button @click='replay'>Replay</button> -->
      <simple-button :inputData="inputData.sendButtonData" :defaults="defaults" @input-received="sendImage()"></simple-button>
    </div>
    <!-- <hr> -->
    <!-- <img ref="img" src="" id='canvas-image'> -->
    <!-- <small>Right click to save image.</small> -->
  </div>`,

  props: {
    inputData: null,
    defaults: null,
  },

  computed: {
    canvasBackgroundStyle() {
      return buildBackgroundData(this.inputData.canvasBackgroundData, this.defaults.buttonData.buttonBackgroundData, uberDefaults.buttonData.buttonBackgroundData)
    }
  },

  data() {
    return {
      canvas: null,
      context: null,
      isDrawing: false,
      startX: 0,
      startY: 0,
      points: [],
    };
  },

  mounted() {
    var vm = this;
    vm.canvas = vm.$refs.canvas;
    let canvas = vm.$refs.canvas;
    vm.context = vm.canvas.getContext("2d");
    vm.canvas.addEventListener("mousedown", vm.mousedown, false);
    vm.canvas.addEventListener("mousemove", vm.mousemove, false);
    document.addEventListener("mouseup", vm.mouseup, false);

    canvas.addEventListener(
      "touchstart",
      function (e) {
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
        canvas.dispatchEvent(mouseEvent);
      },
      false
    );
    canvas.addEventListener(
      "touchend",
      function (e) {
        var mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
      },
      false
    );
    canvas.addEventListener(
      "touchmove",
      function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
        canvas.dispatchEvent(mouseEvent);
      },
      false
    );

    // Prevent scrolling when touching the canvas
    document.body.addEventListener(
      "touchstart",
      function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
    document.body.addEventListener(
      "touchend",
      function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
    document.body.addEventListener(
      "touchmove",
      function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  },

  methods: {
    sendImage() {
      socket.emit("need-scoring", {
        type: "drawn-image",
        dataUrl: this.canvas.toDataURL(),
        scoreRange: this.inputData.scoreRange,
        context: this.inputData.scoringContext,
      });

      this.$emit("input-received", this.inputData.sendButtonData.outcome);
    },
    mousedown(e) {
      var vm = this;
      var rect = vm.canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      vm.isDrawing = true;
      vm.startX = x;
      vm.startY = y;
      vm.points.push({
        x: x,
        y: y,
      });
    },
    mousemove(e) {
      var vm = this;
      var rect = vm.canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      if (vm.isDrawing) {
        vm.context.beginPath();
        vm.context.moveTo(vm.startX, vm.startY);
        vm.context.lineTo(x, y);
        vm.context.lineWidth = 1;
        vm.context.lineCap = "round";
        vm.context.strokeStyle = "rgba(255, 0, 0, 1)";
        vm.context.stroke();

        vm.startX = x;
        vm.startY = y;

        vm.points.push({
          x: x,
          y: y,
        });
      }
    },
    mouseup(e) {
      var vm = this;
      vm.isDrawing = false;
      if (vm.points.length > 0) {
        localStorage["points"] = JSON.stringify(vm.points);
      }
    },
    resetCanvas() {
      var vm = this;
      vm.canvas.width = vm.canvas.width;
      vm.points.length = 0; // reset points array
    },
    saveImage() {
      var vm = this;
      var dataURL = vm.canvas.toDataURL();
      var img = vm.$refs.img;
      img.src = dataURL;
    },
    replay() {
      var vm = this;
      vm.canvas.width = vm.canvas.width;

      // load localStorage
      if (vm.points.length === 0) {
        if (localStorage["points"] !== undefined) {
          vm.points = JSON.parse(localStorage["points"]);
        }
      }

      var point = 1;
      setInterval(function () {
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
        vm.context.lineCap = "round";
        vm.context.strokeStyle = "rgba(255, 0, 0, 1)";
        vm.context.stroke();
      }
    },
  },
});
