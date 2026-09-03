import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import AppProviders from './context/AppProviders';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#ffffff',
              color: '#111111',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            },
            success: {
              iconTheme: { primary: '#111111', secondary: '#ffffff' },
            },
            error: {
              iconTheme: { primary: '#2b2b2b', secondary: '#ffffff' },
            },
          }}
        />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>
);
