const NotificationHelper = {
  sendNotification({ title, options }) {
    // Check Availability
    if (!this._checkAvailabillity()) {
      console.log('Notification not supported in this browser');
      return;
    }
    // Check Permissions
    if (!this._checkPermission()) {
      console.log('User did not yet granted permission');
      this._requestPermission();
      return;
    }
    // Show Notification
    this._showNotification({ title, options });
  },
  _checkAvailabillity() {
    return 'Notification' in window;
  },
  _checkPermission() {
    return Notification.permission === 'granted';
  },
  async _requestPermission() {
    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.log('Notification Denied');
    }
    if (status === 'default') {
      console.log('Permission Closed');
    }
  },
  async _showNotification({ title, options }) {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    serviceWorkerRegistration.showNotification(title, options);
  },
};

export default NotificationHelper;
