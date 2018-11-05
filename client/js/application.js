
//document.getElementById('createUser').addEventListener('submit', createUser)
//document.getElementById('createEntry').addEventListener('submit', createEntry); 

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

function loadEntries(){
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/entries',{
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
            let i = 0
            let output = ' ';
                data.forEach(function(entry){
                    output += `
                        <div class="entry">
                            <div class="head">
                                <i>${entry.date_created}</i>
                                <b>${entry.title}</b>
                            </div>
                            <div class="tail">
                                <p>${entry.content}</p>
                                <div class="button">
                                    <button onclick="location.href='view.html?id=${entry.id}';">View Entry</button>
                                </div>
                            </div>
                        </div>
                    `;
                    i = i + 1;
                });
                console.log(i)

            document.getElementById('entries').innerHTML = output;
        })
        .catch((err) => console.log(err))

}

function createEntry(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    let title = document.getElementById('title').value;
    let content = document.getElementById('content').value;

    //console.log(name, email, password);
    fetch('http://localhost:5000/entries', {
        method:'POST', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-access-token': token,
            credentials: 'same-origin' 
        },
        body: JSON.stringify({title:title, content:content})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
}

function viewEntry(){
    let id = new URLSearchParams(window.location.search).get('id');
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/entries/'+ id ,{
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
            let output =`
                <div class="head">
                    <p><i>Date Logged: ${data.date_created}</i></p>
                    <p><b>Title: ${data.title}</b></p>
                </div>
                <hr>
                <div class="tail">
                    <p>${data.content}</p>
                    <a href="edit.html?id=${data.id}">( Modify Post )</a>
                    <a href="#">( Delete Post )</a>
                </div>
            `;
            document.getElementById('article').innerHTML = output;
        })
        .catch((err) => console.log(err));
}

function updateEntry(){
    let id = new URLSearchParams(window.location.search).get('id');
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/entries/'+ id ,{
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-access-token': token,
            credentials: 'same-origin' 
        }
        } )
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            document.getElementById("title").value = data.title;
            document.getElementById("mytextarea").value = data.content;
        })
        .catch((err) => console.log(err));

    document.getElementById('update').addEventListener('submit', update);
    
    function update(){
        e.preventDefault();

        const token = localStorage.getItem('token');
        let title = document.getElementById('title').value;
        let content = document.getElementById('content').value;

        //console.log(name, email, password);
        fetch('http://localhost:5000/entries'+ id, {
            method:'PUT', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'content-type': 'application/json',
                'x-access-token': token,
                credentials: 'same-origin' 
            },
            body: JSON.stringify({title:title, content:content})
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
    })

    }

}


let currentWindow = window.location.url;

if(currentWindow = 'profile.html'){
    loadEntries();
}else if(currentWindow = 'edit.html'){
    updateEntry();
}else if(currentWindow = 'new.html'){
    createEntry();
}else if(currentWindow = 'view.html'){
    viewEntry();
}