import "../assets/main.css";

import { createApp } from "vue";

import App from "./BaseLegal.vue";

const app = createApp(App);

const pageParam = document.location.pathname + ".md";
app.provide("content", pageParam);

app.mount("#app_mount");
