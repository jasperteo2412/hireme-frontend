import { createRoot } from 'react-dom/client';
import { loadIcons } from './config/icon-loader';
import App from './App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

loadIcons();

root.render(
  <App />
);