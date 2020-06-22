Vue.use((Vue) => {
    Vue.prototype.$bubble = function $bubble(eventName, ...args) {
        // Emit the event on all parent components
        let component = this;
        do {
            component.$emit(eventName, ...args);
            component = component.$parent;
        } while (component);
    };
})