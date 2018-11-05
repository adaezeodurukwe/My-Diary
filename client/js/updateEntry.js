(function updateEntry(){
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

})();

document.getElementById('update').addEventListener('submit', update);
function update(e){
    e.preventDefault();

    let id = new URLSearchParams(window.location.search).get('id');
    const token = localStorage.getItem('token');
    let title = document.getElementById('title').value;
    let content = document.getElementById('mytextarea').value;

    //console.log(name, email, password);
    fetch('http://localhost:5000/entries/'+ id, {
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
    .catch((err) => console.log(err))

}
