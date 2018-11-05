console.log('me');

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
loadEntries();