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
  } catch (error) {
    console.error('Could not load travel content from the API; using bundled content instead.', error);
    root.render(
      <StrictMode>
        <div>
          <div className="bg-amber-50 px-4 py-2 text-center text-sm text-amber-900" role="alert">
            Live content is unavailable. Showing the bundled travel catalog; database-powered features may not work.
          </div>
          <App />
        </div>
      </StrictMode>,
    );
  }
}

void startApp();
