/* eslint-disable no-undef */
import { async } from 'regenerator-runtime';
import { precacheAndRoute } from 'workbox-precaching';
import CacheHelper from './utils/cache-helper';

// Daftar asset yang akan di-caching
const assetsToCache = [
  './',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

// Do precaching
// eslint-disable-next-line no-undef
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

self.addEventListener('activate',(event)=>{
  event.waitUntil(CacheHelper.deleteOldCache());
   console.log('Activating service worker...')
})
self.addEventListener('fetch',(event)=>{
  event.respondWith(CacheHelper.revalidateCache(event.request));
  // console.log(event.request)
  // event.responWith(fetch(event.request))
})
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
