// Update script


// Set event listener
document.getElementById('update').addEventListener('submit', update);

// Load required entry to be updated
(function loadEntry(){
    let id = new URLSearchParams(window.location.search).get('id');
    const token = localStorage.getItem('token');
    fetch('/entries/'+ id ,{
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

})();

// Update entry
function update(e){
    e.preventDefault();

    let id = new URLSearchParams(window.location.search).get('id');
    const token = localStorage.getItem('token');
    let title = document.getElementById('title').value;
    let content = document.getElementById('mytextarea').value;
    let trimmedTitle = title.trim();
    let trimmedcontent = content.trim();

    // Validate input
    if(trimmedTitle == ""){
        document.getElementById('error').innerHTML = 'Please enter a title'
        document.getElementById('title').focus(); 
        return false;
    }

    if(trimmedcontent == ""){
        document.getElementById('error').innerHTML = 'Please enter content'
        document.getElementById('content').focus(); 
        return false;
    }

    // Post data
    fetch('/entries/'+ id, {
        method:'PUT', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-access-token': token,
            credentials: 'same-origin' 
        },
        body: JSON.stringify({title:trimmedTitle, content:trimmedcontent})
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.message === "cannot update entry"){
            let x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 3000);
        }
        window.location.replace('view.html?id=' + data.id);

    })
    .catch((err) => {
        console.log(err)
    })

}
