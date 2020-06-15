Vue.component("card-displayer", {
    template: `<div class="card" style="width: 18rem;">
    <img :src="contentData.url" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">{{test}}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`,
    props: {
        contentData: null
    },
    data() {
        align = "center"
        return {
            test: "M&M.jpeg"
        }
    }
})