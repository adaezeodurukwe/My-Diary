
document.getElementById('createEntry').addEventListener('submit', createEntry); 
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