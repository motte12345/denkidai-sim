import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { initGA4, initAdSense } from './utils/analytics';
import App from './App';

initGA4();
initAdSense();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
