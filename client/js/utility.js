// Helper functions


// Check if user is logged in
(function loggedin(){
    const token = localStorage.getItem('token');
    fetch('/entries',{
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-access-token': token,
            credentials: 'same-origin' 
        }
        })
        .then((res) => {
            if(res.status === 404){
                window.location.replace('signin.html')
            }
        })
        .catch((err) => console.log(err))

    return true;          
})();

// Logout user
function logout(){
    localStorage.removeItem('token');
    let newpage = window.location.replace('index.html');
    return newpage;
}

