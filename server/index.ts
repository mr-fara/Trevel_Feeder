import {createServer as createHttpServer} from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {app} from './app.ts';
import {env} from './config/env.ts';
import {pool} from './db/pool.ts';
import {errorHandler} from './middleware/errorHandler.ts';
import {createServer as createViteServer} from 'vite';

const rootDir = fileURLToPath(new URL('../', import.meta.url));
const server = createHttpServer(app);

if (env.NODE_ENV === 'production') {
  const express = await import('express');
  app.use(express.default.static(path.join(rootDir, 'dist')));
  app.get('*', (_request, response) => {
    response.sendFile(path.join(rootDir, 'dist', 'index.html'));
  });
} else {
  const vite = await createViteServer({
    configFile: path.join(rootDir, 'vite.config.ts'),
    server: {middlewareMode: true, hmr: {server}},
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.use(errorHandler);

server.listen(env.PORT, '0.0.0.0', () => {
  console.log(`Travels Feeder server listening on http://localhost:${env.PORT}`);
});

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    server.close(async () => {
      await pool.end();
      process.exit(0);
    });
  });
}