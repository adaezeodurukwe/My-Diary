
document.getElementById('createUser').addEventListener('submit', createUser)
function createUser(e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('pass').value;

    //console.log(name, email, password);
    fetch('http://localhost:5000/auth/signup', {
        method:'POST', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json'
        },
        body: JSON.stringify({name:name, email:email, password:password})
    })
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem('token', data.token);
        window.location.replace('profile.html');
    })
}