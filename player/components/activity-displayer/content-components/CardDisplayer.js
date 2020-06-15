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