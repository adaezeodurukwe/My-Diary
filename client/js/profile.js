// Profile script


// Load entries
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
        
        let i = 0
        let output = ' ';
            data.forEach((entry) => {
                let content = entry.content;
                let shortContent = content.substr(0, 20) + '...'
                output += `
                    <div class="entry">
                        <div class="head">
                            <b>Title: ${entry.title}</b>
                        </div>
                        <div class="tail">
                            <p>Content: ${shortContent}</p>
                            <div class="button">
                                <button onclick="location.href='view.html?id=${entry.id}';">View</button>
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

})();
