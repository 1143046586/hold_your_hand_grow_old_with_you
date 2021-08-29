import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Button, Dialog, DatetimePicker, Step, Steps, Icon } from 'vant';
import MyImage from '@/components/MyImage/MyImage.vue';

const app = createApp(App);

app.use(Button);
app.use(Dialog);
app.use(DatetimePicker);
app.use(Step);
app.use(Steps);
app.use(Icon);
app.use(router);
app.component('my-image', MyImage);

app.mount('#app');
