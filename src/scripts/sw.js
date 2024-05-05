/* eslint-disable no-undef */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Do precaching
// eslint-disable-next-line no-undef
precacheAndRoute(self.__WB_MANIFEST);

// runtime caching
registerRoute(
  ({ url }) => url.href.startsWith('https://api.themoviedb.org/3/'),
  new StaleWhileRevalidate({
    cacheName: 'themovie-db-api',
  }),
);
