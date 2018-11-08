console.log('SW loaded');

self.addEventListener('push', e =>{
    const data = e.data.json();
    console.log('push recieved');
    self.registration.showNotification(data.title, {
        body: 'My Diary'
    })
})