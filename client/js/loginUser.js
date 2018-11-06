// Login script

document.getElementById('login').addEventListener('submit', login)

function login(e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('pass').value;

    // Validate input
    if(email == "" || password == ""){
        document.getElementById('error').innerHTML = 'Incomplete Credentials';
        return false;
    }

    // Fetch data
    fetch('/auth/signin', {
        method:'POST', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json'
        },
        body: JSON.stringify({email:email, password:password})
    })
    .then((res) => res.json())
    .then((data) => {

        localStorage.setItem('token', data.token);   
        window.location.replace('profile.html');

    })
}