let btnSearch = document.querySelector('#btnSearch')
let output = document.querySelector('#albums')
let searchResults = document.querySelector('#searchResults')
let input = document.getElementById('input');
const numberOfAlbums = 20;

document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.parallax');
    M.Parallax.init(elems);
});

function getData() {
    let url = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json'
    let cors = 'https://cors-anywhere.herokuapp.com/'

    fetch(cors + url)
        .then(data => data.json())
        .then(json => {
    
            let transformHtml = ``

            for (let i = 0; i <= (numberOfAlbums - 1); i++) {
                transformHtml +=
                    ` 
                    <ul class="collection">
                        <li class="collection-item avatar">
                            <img class="circle" src=${json.feed.entry[i]["im:image"][2].label}>
                            <span class="title">${json.feed.entry[i]["im:name"].label}</span>
                            <p>${json.feed.entry[i]["im:artist"].label}</p>
                            <a href="#!" class="tooltipped secondary-content" data-position="top" data-tooltip="${json.feed.entry[i]["im:price"].label}"><i class="material-icons info">info</i></a>
                        </li>           
                    </ul> 
                    `
            }

            albums.innerHTML = transformHtml
          
            let tolltips = document.querySelectorAll('.tooltipped')
            for (let k = 0; k < tolltips.length; k++) {
                M.Tooltip.init(tolltips[k]);
            }

            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {  
                    searchArtist(input.value, json.feed.entry)
                }
            });
        })
        .catch(error => console.log(error))
}

function searchArtist(searchText, albums) {
    let matches = albums.filter(albums => {
        const regex = new RegExp(`${searchText}`, 'gi');
        return albums.title.label.match(regex)
    });

    if (searchText.length === 0) {
         matches = [];
    }

    printMatches(matches);

    let collapsibles = document.querySelectorAll('.collapsible')
    for (let j = 0; j < collapsibles.length; j++) {
        M.Collapsible.init(collapsibles[j]);      
    }
}

const printMatches = matches => {
    if (matches.length > 0) {
    const searchResult = matches.map(match => `
        <div class="col s12 m12 l6 slideRight">
            <div class="card tossing">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src=${match["im:image"][2].label}>
                </div>
                <div class="card-content">
                     <span class="card-title grey-text text-darken-4 truncate">${match["im:artist"].label}</span>
                     <p class= "truncate">${match["im:name"].label}</p>
                 </div>
               </div>
            </div>
      `
    ).join('');

        searchResults.innerHTML = searchResult;

    }
}

getData();