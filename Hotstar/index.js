
let Recombox = document.getElementById('recommend')
let display = document.getElementById('display')
let search = document.getElementById('search')
let id;
async function searchMovies(query) {
    try {
        let url = `https://www.omdbapi.com/?s=${query}&apikey=d1c945fe`;
        let res = await fetch(url);
        let data = await res.json();
        console.log(data)
        return data.Search;
    } catch (err) {
        console.log('error');
    }
}

async function main() {
    let query = document.getElementById("search").value;
    let data = await searchMovies(query)
    // console.log(data)
    append(data)
}

function debounceFunction(func, delay) {
    if (id) {
        clearTimeout(id)
    }
    id = setTimeout(function () {
        func()
    }, delay)
}

function append(data) {
    Recombox.style.display = 'block';
    Recombox.innerHTML = null
    // Recombox.style.display = 'none';
    data.forEach(function (el) {
        console.log(el)
        let Recommdiv = document.createElement('div');
        Recommdiv.setAttribute('id', 'main')

        Recommdiv.onclick = function () {
            Recombox.style.display = 'none'
            search.value = ''
            searchMovie(el)
        }
        let PosterDiv = document.createElement('div');
        PosterDiv.setAttribute('id', 'first')

        let MoreDetails = document.createElement('div');
        MoreDetails.setAttribute('id', 'second')

        let Poster = document.createElement('img');
        Poster.src = el.Poster;
        PosterDiv.append(Poster)

        let Title = document.createElement('p');
        Title.innerText = el.Title

        let Year = document.createElement('p');
        Year.innerText = el.Year;

        MoreDetails.append(Title, Year)

        Recommdiv.append(PosterDiv, MoreDetails)

        Recombox.append(Recommdiv)
    })
}

async function searchMovie(el) {
    try {
        display.innerHTML = null;
        let url = `https://www.omdbapi.com/?i=${el.imdbID}&apikey=d1c945fe`;
        let res = await fetch(url);
        let data = await res.json();
        displayDetails(data);
    } catch (err) {
        console.log(err);
    }
}
function displayDetails(data) {
    console.log(data)
    // Recombox.style.display = 'none';
    trending.style.display = 'none'
    if (data.Response === 'False') {
        let error = document.createElement('img');
        error.setAttribute('id', 'error');
        error.src = 'https://www.lovelyfares.ca/404.jpg';
        display.append(error);
        return;
    }

    let top = document.createElement('div');
    top.setAttribute('id', 'top');

    let title = document.createElement('p');
    title.innerText = `${data.Title} - ${data.Year}`;

    top.append(title);

    // bottom div for the poster and details

    let bottom = document.createElement('div');
    bottom.setAttribute('id', 'bottom');

    // bottom - left div is for the poster only

    let left = document.createElement('div');
    left.setAttribute('id', 'left');

    let img = document.createElement('img');
    img.src = data.Poster;

    left.append(img);

    // bottom - right div is for the details 

    let right = document.createElement('div');
    right.setAttribute('id', 'right');

    // right - up div is for rating and votes 

    let up = document.createElement('div');
    up.setAttribute('id', 'up');

    let logo = document.createElement('img');
    logo.src = 'https://cdn.freebiesupply.com/images/large/2x/imdb-logo-transparent.png';

    let rating = document.createElement('p');
    rating.innerText = `${data.Ratings[0].Value} Out of ${data.imdbVotes} Votes`;

    let recommended;

    if (+(data.imdbRating) > 8.5) {

        recommended = document.createElement('p');
        recommended.setAttribute('id', 'recommended');
        recommended.innerText = 'Recommended';

    }

    up.append(logo, rating, recommended || '');

    // right - mid div is for plot and genre 

    let mid = document.createElement('div');
    mid.setAttribute('id', 'mid');

    let plotDiv = document.createElement('div');
    plotDiv.setAttribute('id', 'plotDiv')
    let plotSpan = document.createElement('span');
    plotSpan.innerText = 'Plot : ';

    let plot = document.createElement('p');
    plot.innerText = data.Plot;

    plotDiv.append(plotSpan, plot);

    let genreDiv = document.createElement('div');

    let genreSpan = document.createElement('span');
    genreSpan.innerText = 'Genre : ';

    let genre = document.createElement('p');
    genre.innerText = data.Genre;

    genreDiv.append(genreSpan, genre);

    let languageDiv = document.createElement('div');

    let languageSpan = document.createElement('span');
    languageSpan.innerText = 'Language : ';

    let language = document.createElement('p');
    language.innerText = data.Language;

    languageDiv.append(languageSpan, language);

    mid.append(plotDiv, genreDiv, languageDiv);

    // child div of right - down div is for director, actors, language 

    let down = document.createElement('div');
    down.setAttribute('id', 'down');

    let directorDiv = document.createElement('div');

    let directorSpan = document.createElement('span');
    directorSpan.innerText = 'Director : ';

    let director = document.createElement('p');
    director.innerText = data.Director;

    directorDiv.append(directorSpan, director);

    let actorsDiv = document.createElement('div');

    let actorsSpan = document.createElement('span');
    actorsSpan.innerText = 'Actors : ';

    let actors = document.createElement('p');
    actors.innerText = data.Actors;

    actorsDiv.append(actorsSpan, actors);

    down.append(directorDiv, actorsDiv);

    // appending all the child div of the right to the right 

    right.append(up, mid, down);

    // appending all the child div of the bottom to the bottom 

    bottom.append(left, right);

    // appending all the child of the display to the display 

    display.append(top, bottom);

}

// For Trending Page


let imgData = ["https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/dbba13f2b8e065868db8014ce1166fc3452ed49aa9d485be95677f275b9f95cd._UR1920,1080_RI_SX356_FMwebp_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/1bb55206139e64da420615e947102ce4f10231ed8e4613fe238f3810b8460a9f._UR1920,1080_RI_SX356_FMwebp_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/579f625d2a6727fa43c84227ab30fc6a8701bd2cb8c54fd4f7d2560655303510._UR1920,1080_RI_SX356_FMwebp_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/c884e097f66997a42b7053fe9940c8fbc0a81c27e61a86196ef41397ac344996._UR1920,1080_RI_SX356_FMwebp_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/be7c378f3d62d7085ce2e32537b89108aaf59289f81c77e4128d5c4a57a11bab._UR1920,1080_RI_SX356_FMwebp_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/94806f93d9fe7b40d34b6adf640159923f2f59dd30fe3e88a90d5581de5cdf1d._UR1920,1080_RI_SX356_FMwebp_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/78aedb083bf31cd21d442b2598bcfecc6847d44d8c42b15e8890bd35299b1ba1._UR1920,1080_RI_SX356_FMwebp_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/5d3b681f3e0fa8762a10244cc01008de9be828a236d60ebd023bf0fbf78bc366._UR1920,1080_RI_SX356_FMwebp_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/53d95982427ed0eafc58b630e03e6e771a2c97e94cae4b807fb320d1d1bd8547._UR1920,1080_RI_SX356_FMwebp_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/8067087ea9643e497529db5bba5b7ede22b3addf115bfcc13af2bf7816a0223d._UR1920,1080_RI_SX356_FMwebp_.jpg",
]

let trending = document.getElementById('trending');

let movies = document.getElementById('movies')

let i = 0;
function start() {

    let show = document.getElementById("slideshow");

    let img = document.createElement("img");
    img.src = imgData[i]

    show.append(img);
    setInterval(function () {
        i++;
        if (i === imgData.length) {
            i = 0;
        }
        let image = imgData[i];
        let img = document.createElement('img');
        img.src = image;
        show.innerHTML = "";
        show.append(img)

    }, 3000);

}
start()

let api_key = 'f030534161ff342c80b90f64a5a204a1'
let TrendingMovies = async () => {

    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`

    let res = await fetch(url)
    let data = await res.json()
    // console.log(data.results)
    TrendingMoviesData(data.results)
}
TrendingMovies()

function TrendingMoviesData(data) {

    movies.innerHTML = null;

    data.forEach(function (el) {

        let box = document.createElement('div');
        box.onclick = function () {
            TrendingMovieDetails(el.title)
            // console.log(el)
        }

        let poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/w500${el.poster_path}`;
        poster.setAttribute('class', 'poster')

        let title = document.createElement('h2');
        title.innerText = el.title;

        let date = document.createElement('p');
        date.innerText = 'Release date : ' + el.release_date;

        let rating = document.createElement('p');
        rating.innerText = 'IMDb Rating : ' + el.vote_average;
        if (el.vote_average >= 0 && el.vote_average <= 5) {
            rating.style.color = 'red'
        }
        else if (el.vote_average > 5 && el.vote_average <= 7) {
            rating.style.color = 'yellow'
        }
        else if (el.vote_average > 7 && el.vote_average <= 10) {
            rating.style.color = 'green'
        }

        box.append(poster, title, date, rating);
        movies.append(box);
    })
}

let TrendingMovieDetails = async (details) => {

    const url = `https://www.omdbapi.com/?t=${details}&apikey=d1c945fe`
    let res = await fetch(url);
    let data = await res.json();
    console.log(details)
    displayDetails(data);
 }
