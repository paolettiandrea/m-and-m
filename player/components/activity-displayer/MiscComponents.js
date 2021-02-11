


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

