(function viewEntry(){
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
})();