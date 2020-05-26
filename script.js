let btnSearch = document.querySelector('#btnSearch')
let output = document.querySelector('#albums')
const numberOfAlbums = 30 //change number later to 100

btnSearch.addEventListener('click', (e) => {
    getData()
})

function getData() {
    let url = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json'
    let cors = 'https://cors-anywhere.herokuapp.com/'

    fetch(cors+url)
        .then(data => data.json())
        .then(json => {
           // console.log(json)
            let transformHtml = ``

            for (let i = 0; i < (numberOfAlbums - 1); i++) {
                
                transformHtml +=
                    `
                        <div class="col-sm-6 col-md-4 col-lg-3">
                            <div class="card small">
                               <div class="card-image waves-effect waves-block waves-light">
                                    <img class="activator" src=${json.feed.entry[i]["im:image"][2].label}>
                               </div>
                               <div class="card-content">
                                 <span class="card-title activator grey-text text-darken-4">${json.feed.entry[i]["im:name"].label}<i class="material-icons right">more_vert</i></span>
                                 <p>${json.feed.entry[i]["im:artist"].label}</p>
                               </div>
                               <div class="card-reveal">
                                 <span class="card-title grey-text text-darken-4">${json.feed.entry[i].title.label}<i class="material-icons right">close</i></span>
                                 <p>Price: ${json.feed.entry[i]["im:price"].label}
                                 <p>Release date: ${json.feed.entry[i]["im:releaseDate"].label}</p>
                               </div>
                            </div>
                        </div>   
                    `
            }
            albums.innerHTML = transformHtml
        })
    .catch( error => console.log(error))
}