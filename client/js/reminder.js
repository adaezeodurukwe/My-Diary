// Set and update reminder script


// Get user and display output based on reminder settings
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

            let output1 = ` <p>You can set a daily reminder by clicking on the button</p>
                            <div class="button">
                                <button onclick="return updateReminder();">Set Reminder</button>
                            </div>     
                            `;
            let output2 = ` <p>Daily notification set, remove reminder by clicking on the button.</p>
                            <div class="button">
                                <button onclick="return updateReminder();">Remove</button>
                            </div>     
                            `;

            let value = data.reminder === 0 || data.reminder === null ? output1 : output2

            document.getElementById("setReminder").innerHTML = value;
        })
        .catch((err) => console.log(err))

    return true;          
})();

// Update reminder
function updateReminder(){
    const token = localStorage.getItem('token');
    fetch('/auth/reminder',{
        method: 'put',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-access-token': token,
            credentials: 'same-origin' 
        }
        })
        .then(() => {
            location.reload();
        })
        .catch((err) => console.log(err))

    return true;          
}
