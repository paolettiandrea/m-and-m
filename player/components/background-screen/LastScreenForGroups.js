Vue.component('lastScreen-groups', {
    template: `
    <b-list-group   class="d-flex  align-items-center"
    style="
                 background-color: #ffffff;
                 text-align:center;
                 border: 1px solid black;
                 height:100%;
                 background-image:url(https://gamingcentral.in/wp-content/uploads/2017/08/uncharted-the-lost-legacy-screenshot-60.png)">
                   <p style="font-weight:bold; margin:5%; fontSize:30px;"> Classifica dei componenti: <p>
  <b-list-group-item class="d-flex justify-content-between align-items-center" style=" opacity:0.8; text-align:center;
               font-weight: bold;
               color: #000000;">
    Cras justo odio
    <b-badge variant="primary" pill>14</b-badge>
  </b-list-group-item>

  <b-list-group-item class="d-flex justify-content-between align-items-center" style=" opacity:0.8; text-align:center;
               font-weight: bold;
               color: #000000;">
    Dapibus ac facilisis in
    <b-badge variant="primary" pill>2</b-badge>
  </b-list-group-item>

  <b-list-group-item class="d-flex justify-content-between align-items-center" style=" opacity:0.8;
               font-weight: bold;
               color: #000000;">
    Morbi leo risus
    <b-badge variant="primary" pill>1</b-badge>
  </b-list-group-item>
</b-list-group>
    `,
    props:
    {
      score:0
    }
})
