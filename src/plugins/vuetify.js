import Vue from "vue";
import Vuetify from "vuetify/lib";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import VCalendar from "v-calendar";
Vue.use(VCalendar, {
  componentPrefix: "vc"
});
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md"
  }
});
