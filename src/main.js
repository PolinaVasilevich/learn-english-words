import { createApp } from "vue";

import router from "@/router/";
import components from "@/components/UI/";
import store from "@/store/";

import App from "./App.vue";

import "./mainStyles.scss";

const app = createApp(App);

components.forEach((component) => app.component(component.name, component));

app.use(router).use(store).mount("#app");
