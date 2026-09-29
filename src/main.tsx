import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {hydrateTravelData, type TravelContent} from './data/travelData';
import {apiGet} from './lib/api';
import './index.css';

const root = createRoot(document.getElementById('root')!);

async function startApp() {
  try {
    hydrateTravelData(await apiGet<TravelContent>('/api/content'));
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch {
    root.render(
      <main className="grid min-h-screen place-items-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold">Travel data is unavailable</h1>
          <p className="mt-2">The server could not load the site content. Please try again.</p>
          <button className="mt-5 underline" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </main>,
    );
  }
}

void startApp();
