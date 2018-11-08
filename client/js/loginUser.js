// Login script


// Set event listener
document.getElementById('login').addEventListener('submit', login)

function login(e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('pass').value;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Validate input
    if(email == "" || password == ""){
        document.getElementById('error').innerHTML = 'Incomplete Credentials';
        return false;
    }
    if(!email.match(mailformat)){
        document.getElementById('error').innerHTML = 'Invalid Email';
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
        if(data.error || data.message){
            let x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 3000);
        }else{
            localStorage.setItem('token', data.token);   
            window.location.replace('profile.html');
        }
        console.log(data)
        
    })
}

/**
 * Email validation regular expression solution from
 * https://www.w3resource.com/javascript/form/email-validation.php
 */