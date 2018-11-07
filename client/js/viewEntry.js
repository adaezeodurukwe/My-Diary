// View entry script


// Load Entry by id
(function viewEntry(){
    let id = new URLSearchParams(window.location.search).get('id');
    const token = localStorage.getItem('token');
    
    fetch('entries/'+ id ,{
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-access-token': token,
            credentials: 'same-origin' 
        }
        })
        .then((res) => res.json())
        .then((data) => {
            let content = data.content
            let formattedContent = content.replace(/\n/g, '<br />');
            let output =`
                <div class="head">
                    <p><b>Title: ${data.title}</b></p>
                </div>
                <hr>
                <div class="tail">
                    <div>${formattedContent}</div>
                    <div class="links">
                        <a href="edit.html?id=${data.id}">( Modify Post )</a>
                        <a id="delete" onclick="return deleteEntry();">( Delete Post )</a>
                    </div>   
                </div>
            `;
            document.getElementById('article').innerHTML = output;
        })
        .catch((err) => console.log(err));

})();

// Load all entries by user
(function loadEntries(){
    const token = localStorage.getItem('token');

    fetch('/entries',{
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-access-token': token,
            credentials: 'same-origin' 
        }
    })
    .then((res) => res.json())
    .then((data) => {
        let output = '';
            data.forEach((entry) => {
                output += `<li><a href="view.html?id=${entry.id}">${entry.title}</a></li>`;
            });           
            document.getElementById('sidelinks').innerHTML = output;
        })
    .catch((err) => console.log(err))

})();

// Delete entry
function deleteEntry(){
    let id = new URLSearchParams(window.location.search).get('id');
    const token = localStorage.getItem('token');

    fetch('entries/'+ id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-access-token': token,
            credentials: 'same-origin' 
        }
        })
        .then(() =>{
            window.location.replace('profile.html')
        })
 
}