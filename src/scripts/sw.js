/* eslint-disable no-undef */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Do precaching
// eslint-disable-next-line no-undef
precacheAndRoute(self.__WB_MANIFEST);

// runtime caching
const theMovieDBAPI = registerRoute(
  ({ url }) => url.href.startsWith('https://api.themoviedb.org/3/'),
  new StaleWhileRevalidate({
    cacheName: 'themovie-db-api',
  }),
);
const theMovieImageAPI = registerRoute(
  ({ url }) => url.href.startsWith('https://api.themoviedb.org/3/'),
  new StaleWhileRevalidate({
    cacheName: 'themovie-image-db-api',
  }),
);

theMovieDBAPI();
theMovieImageAPI();

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

self.addEventListener('push', (event) => {
  console.log('Service Worker: Pushed');

  const dataJson = event.data.json();
  const notification = {
    title: dataJson.title,
    options: {
      body: dataJson.options.body,
      icon: dataJson.options.icon,
      image: dataJson.options.image,
    },
  };
  event.waitUntil(self.registration.showNotification(notification.title, notification.options));
});
self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();
  const chainPromise = async () => {
    console.log('Notification has been clicked');
    await self.clients.openWindow('https://www.dicoding.com/');
  };
  event.waitUntil(chainPromise());
});
