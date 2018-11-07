// Create entry script


// Set event listener
document.getElementById('createEntry').addEventListener('submit', createEntry); 

function createEntry(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    let title = document.getElementById('title').value;
    let content = document.getElementById('content').value;
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
    fetch('/entries', {
        method:'POST', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-access-token': token,
            credentials: 'same-origin' 
        },
        body: JSON.stringify({title:trimmedTitle, content:trimmedcontent})
    })
    .then((res) => res.json())
    .then(() => {
        window.location.replace('profile.html');;
    })
    .catch((err)=> console.log(err))
}