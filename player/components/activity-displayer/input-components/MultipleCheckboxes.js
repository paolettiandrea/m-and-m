Vue.component("multiple-checkboxes", {
    template: `<div>
        <template>
  <div>

    <b-form-group label="Multiple checkboxes form">
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        buttons
        button-variant="primary"
        size="lg"
        name="buttons-2"
      ></b-form-checkbox-group>
    </b-form-group>
    <div>Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>
    </div>`,

    props: {
        inputData: null
    },

    data() {
        return {
            selected: [],
            options: [
                { text: 'Orange', value: 'orange' },
                { text: 'Apple', value: 'apple' },
                { text: 'Pineapple', value: 'pineapple' },
                { text: 'Grape', value: 'grape' }
            ]
        }
    }
})