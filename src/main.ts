import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Button, Dialog, DatetimePicker } from 'vant';
const app = createApp(App);
app.use(Button);
app.use(Dialog);
app.use(DatetimePicker);
app.use(router);

app.mount('#app');
