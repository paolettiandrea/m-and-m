Vue.component("activity-displayer", {
    template: `
        <div class="activity-displayer-div" >
            <!-- Content chunks  -->
            <styling-wrapper :stylingData="activityContent.screenStyleData.outer" :stylingDefaults="defaults.screenStyleData.outer" style="min-height: 20px; overflow-y: auto; height: 100%; display: flex; flex-direction: column">
            <styling-wrapper :stylingData="activityContent.screenStyleData.inner" :stylingDefaults="defaults.screenStyleData.inner" style="flex: 1">
            
            <div class="activity-displayer-chunk-container">
                <slot name="inter" index="0"></slot>
                <div  v-for="(contentChunk, index) of this.activityContent.content" >
                    <div v-on:click="contentChunkClicked({content: contentChunk, index: index})">
                        <styling-wrapper :stylingData="contentChunk.commonData" :stylingDefaults="defaults.commonData">
                            <component :is="contentChunk.contentType" 
                                   :id="'content-chunk-'+index" 
                                   class="content-chunk" 
                                   :contentData="contentChunk.contentData"
                                   :defaults="defaults" ></component>
                        </styling-wrapper>
                        
                                   
                                   
                    </div>
                </div>   
                
                <slot name="last-content-chunk"></slot> 
            </div>
            
            <!-- Popup for input response. It contains an activity-displayer used for displaying the popupContent -->
            <b-collapse v-model="popupVisible">
                <component v-if="popupContent" :is="popupContent.type" 
                                       class="content-chunk" 
                                       id="popup-content-chunk" 
                                       :contentData="popupContent.data" ></component>
            </b-collapse>
            
            <!--Input component: the component type is defined by the string inputType and it receives the 
                                 data object inputData as the prop "data" (every input component needs to have 
                                 a data prop that it can use to retrieve all the data needed to define its behaviour)-->
            <div v-if="activityContent.inputComponent" v-on:click="inputClicked">
                <styling-wrapper :stylingData="activityContent.inputComponent.commonData" :stylingDefaults="defaults.commonData">

                    <component :is="activityContent.inputComponent.inputType" 
                                :inputData="activityContent.inputComponent.inputData" 
                                :defaults="defaults"
                                @input-received="handleInputReceived" ></component>
                </styling-wrapper>
            </div>
            <div v-else>
                <slot name="input-placeholder"></slot>
            </div>
            
            
</styling-wrapper>
            
</styling-wrapper>
            
         
        </div>`,

    props: {
        activityContent: null,
        defaults: null

    },

    data() {
        return {
            popupContent: null,
            popupVisible: false
        }
    },

    computed: {
        compoundDefaults() {
            return buildDefaultObject(this.defaults, uberDefaults);
        }
    },

    methods: {
        // Called when the InputComponent triggers an input-received event.
        // inputResponse defines what should happen next
        handleInputReceived(inputOutcome) {
            switch (inputOutcome.outcomeType) {
                case "popup":
                    this.popupContent = inputOutcome.popupContent;
                    this.popupVisible = true;
                    break;

                case "next":        // Send a next activity event to the mission displayer
                    this.$emit('next:activity', inputOutcome.nextActivityId);
                    this.popupContent = null;
                    this.popupVisible = false;
            }
        },
        contentChunkClicked(contentData) {
            this.$bubble("content:chunk:clicked", contentData);
        },
        inputClicked() {
            this.$bubble('input:clicked', this.activityContent.inputComponent);
        }
    }
})

Vue.component('screen-styling-wrapper', {
    template: `
        <div :style="wrapperStyle">
            <slot></slot>
        </div>
    `,

    props: {
        stylingData: null,
        stylingDefaults: null
    },

    computed: {
        wrapperStyle() {
            if (this.stylingData!==undefined) {
                return buildWrapperStyle(this.stylingData, this.stylingDefaults, uberDefaults.commonData)
            } else { return {}}
        }
    }
})

Vue.component('styling-wrapper', {
    template: `
        <div :style="wrapperStyle">
            <slot></slot>
        </div>
    `,

    props: {
        stylingData: null,
        stylingDefaults: null,
    },

    computed: {
        wrapperStyle() {
            if (this.stylingData!==undefined) {
                return buildWrapperStyle(this.stylingData, this.stylingDefaults, uberDefaults.commonData)
            } else { return {}}
        }
    }
})