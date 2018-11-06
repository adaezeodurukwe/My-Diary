// Profile script

function loadEntries(){
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
        console.log(data)
        let i = 0
        let output = ' ';
            data.forEach((entry) => {
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
            
            document.getElementById('batch').innerHTML = i;
            document.getElementById('entries').innerHTML = output;
        })
    .catch((err) => console.log(err))

}
loadEntries();