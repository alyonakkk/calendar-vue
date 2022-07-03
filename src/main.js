import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

Vue.config.productionTip = false;

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

extend("required", {
  ...required,
  message: "*Обязательное поле",
});
extend("quickAddField", {
  validate: (value) => {
    return /^(\d\d\.\d\d\.\d\d\d\d,\s[a-zа-я0-9\s]+,\s[a-zа-я0-9\s]+)$/i.test(
      value
    );
  },
  message: "Поле должно иметь вид: 12.11.2022, вечеринка, Алёна и коты",
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
