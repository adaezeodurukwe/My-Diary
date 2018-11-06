// Create user script

document.getElementById('createUser').addEventListener('submit', createUser, false)



function createUser(e) {
    e.preventDefault();

    // Validate input
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('pass').value;
    let confirmPassword = document.getElementById('confpass').value;
    let inputName = name.trim();
    let inputEmail = email.trim(); 

    if(inputName == ""){
        document.getElementById('error').innerHTML = 'Please enter your name'
        document.getElementById('name').focus(); 
        return false;
    }

    if(inputEmail == ""){
        document.getElementById('error').innerHTML = 'Please enter email'
        document.getElementById('email').focus(); 
        return false;
    }

    if(password == ""){
        document.getElementById('error').innerHTML = 'Please enter password'
        document.getElementById('pass').focus(); 
        return false;
    }

    if(password.length < 4){
        document.getElementById('error').innerHTML = 'Email should have at least four characters'
        document.getElementById('pass').focus(); 
        return false;
    }

    if(confirmPassword != password){
        document.getElementById('error').innerHTML = 'password not a match'
        document.getElementById('confpass').focus(); 
        return false;
    }

    // Post data
    fetch('/auth/signup', {
        method:'POST', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json'
        },
        body: JSON.stringify({name:inputName, email:inputEmail, password:password})
    })
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem('token', data.token);
        window.location.replace('profile.html');
    })
    .catch((err) => console.log(err));
}