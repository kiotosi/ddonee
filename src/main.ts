import 'normalize.css';
import App from './App.svelte'
import './css/fonts.css';
import './css/colors.css';
import './css/app.css'

const app = new App({
  target: document.getElementById('app'),
})

export default app;