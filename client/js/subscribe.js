// Subscribe script


//check if user is subscribed and send notification

(function getUser(){
    const token = localStorage.getItem('token');
    fetch('/auth/user',{
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-access-token': token,
            credentials: 'same-origin' 
        }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if(data.reminder){
            
                if(data.reminder === 0 || data.reminder === null){
                    console.log('notification not sent')
                }else{   
                    const publicKey ='BO42QZZRQztRtiE-Vwh00nO003TNqqTT4HAWautRMT5PICVmnftlACzG2ARA8ZftyFG9LAUhhAZCRDfQSxH21Pw';
                    //check for service worker
                    if('serviceWorker' in navigator){
                        send().catch(err => console.error(err));
                    }

                    // Register SW, PN and Send PN
                    async function send() {
                        // Register SW
                        console.log('registering SW...');
                        const register = await navigator.serviceWorker.register('js/sw.js');

                        console.log('SW registered');

                        // Register push notification
                        console.log('registering push')
                        const subscription = await register.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(publicKey)
                        });
                        console.log('push Registered')

                        //send push notification
                        console.log("sending push");
                        await fetch('/subscribe/', {
                            method: 'POST',
                            body: JSON.stringify(subscription),
                            headers: {
                                'content-type': 'application/json'
                            }
                        });
                    console.log('push sent');
                    }

                    function urlBase64ToUint8Array(base64String) {
                        const padding = '='.repeat((4 - base64String.length % 4) % 4);
                        const base64 = (base64String + padding)
                        .replace(/\-/g, '+')
                        .replace(/_/g, '/');
                    
                        const rawData = window.atob(base64);
                        const outputArray = new Uint8Array(rawData.length);
                    
                        for (let i = 0; i < rawData.length; ++i) {
                        outputArray[i] = rawData.charCodeAt(i);
                        }
                        return outputArray;
                    }
                }
            }
        })
        .catch((err) => console.log(err))

    return true;          
})();


/**
 * Web push tutorial from Travestry Media
 * https://www.youtube.com/watch?v=HlYFW2zaYQM
 */