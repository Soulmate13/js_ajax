// Реализовать веб-страницу для поиска фильмов. При открытии страницы пользователю доступна только форма для ввода названия фильма (или части названия) и выбора типа (movie, series, episode).

// После того, как пользователь ввел данные и нажал на кнопку Search, необходимо отправить соответствующий запрос к API ресурса OMDB (http://www.omdbapi.com/) с помощью AJAX.

// Если в качестве ответа на запрос вы получили список фильмов, то его необходимо отобразить под формой поиска. Если по заданным критериям не будут найдены фильмы, то отобразите сообщение Movie not found!.

// Учтите, что OMDB по умолчанию возвращает только первые 10 фильмов. Поэтому необходимо реализовать пагинацию для тех случаев, когда под критерии поиска подходит больше, чем 10 фильмов. Пагинация – это порядковая нумерация страниц, которая обычно находится вверху или внизу страниц сайта. Вероятно, вы видели в интернет-магазинах на страницах с товарами кнопки с цифрами 1, 2, 3 и т. д., при нажатии на которые отбражается другой блок товаров. Вот такие кнопки и называют пагинацией. Таким образом, при первом поиске необходимо выводить первые 10 фильмов и кнопки для перехода по страницам. При клике на такую кнопку необходимо отправить запрос с указанием в параметрах требуемой страницы, и полученный результат вывести на место текущего списка фильмов.

// Возле каждого фильма должна быть кнопка Details, при нажатии на которую будет выводиться подробная информация о фильме. Эту информацию необходимо выводить на этой же странице сразу под списком найденных фильмов и пагинацией.

// Все запросы необходимо отправлять, используя AJAX. То есть при нажатии на любые кнопки ваша веб-страница не должна обновляться.
// Ссылка на API OMDB: http://www.omdbapi.com/ (необходимо зарегистри роваться для получения API KEY).
// Ссылка на альтернативный API с фильмами (для того случая, если OMDB не будет работать): https://developers.themoviedb.org/3/ search/search-movies.
// Если же и этот API не будет работать, вам придется сам остоятельно найти другой доступный ресурс и адаптировать под него задание.

//getting the form elements
let input = document.getElementById("name");
let select = document.getElementById("select");
let submit = document.getElementById("submit");

input.addEventListener("keyup", function () {
    if (event.keyCode === 13) {
        event.preventDefault();
        ClearPage();
        FetchFilm(input.value, select.value, page, 0);
    }
});

//adding the event listener for the main search button
submit.addEventListener('click', function () {
    ClearPage();
    FetchFilm(input.value, select.value, page, 0);
});

//creating the next and last buttons to be appended later
let btn = document.createElement("button");
btn.innerText = "Next Page"
let btnLast = document.createElement("button");
btnLast.innerText = "Last Page"

//adding event listeners to these buttons
btn.addEventListener('click', function () { FetchFilm(input.value, select.value, page, 1); });
btnLast.addEventListener('click', function () { FetchFilm(input.value, select.value, page, -1); });

//setting the page to 1
let page = 1;

//appending the ul to the root
let wrapper = document.createElement("div");
wrapper.setAttribute('id', 'wrapper');
document.getElementById("root").appendChild(wrapper);

// creating the function to fetch films which takes 4 arguments
function FetchFilm(_name, _type, _page, _increment) {
    _page = _page + _increment; // page should increase or decrease if we use next or last buttons
    page = _page; //also updating the global variable

    let url = `https://www.omdbapi.com/?s=${_name}&type=${_type}&page=${_page}&apikey=c19ba406`; // forming a url


    fetch(url)
        .then(response => response.json())
        .then(myJson => {
            obj = myJson;
            console.log(myJson)
            wrapper.innerHTML = ''
            for (let i = 0; i < obj.Search.length; i++) { // each li has an image of the poster and two paras with title and year
                let element = document.createElement('div');
                element.classList.add("element");
                let inner = document.createElement('div');
                inner.classList.add("inner");
                let img = document.createElement('img');
                img.setAttribute("src", `${obj.Search[i].Poster}`)
                img.setAttribute("onerror", 'imgError(this)')
                let p1 = document.createElement('p')
                p1.classList.add('movie_title')
                p1.innerText = `${obj.Search[i].Title}`
                let p2 = document.createElement('p')
                p2.innerText = `${obj.Search[i].Year}`
                let infobtn = document.createElement('a')
                infobtn.innerText = "Show info"
                infobtn.setAttribute('data-remodal-target', 'modal')
                infobtn.classList.add("btn-more")
                infobtn.addEventListener('click', function () { getInfo(obj.Search[i].Title) })
                wrapper.appendChild(element);
                let fav = document.createElement('a');
                fav.classList.add("btn-more")
                fav.classList.add("btn-fav")
                fav.innerText = "Add to favourites"
                element.appendChild(inner)
                inner.appendChild(img)
                element.appendChild(p1)
                element.appendChild(p2)
                element.appendChild(infobtn)
                element.appendChild(document.createElement('br'))
                element.appendChild(fav)
            }

            document.getElementById("table").appendChild(btnLast); // finally adding the buttons
            document.getElementById("table").appendChild(btn);

            if (_page == 1) { // the prev button should not work on the first page
                btnLast.disabled = true;
            } else {
                btnLast.disabled = false;
            };

            if (_page >= (parseInt(obj.totalResults) / 10)) { // the next button should not work on the last page
                btn.disabled = true;
            } else {
                btn.disabled = false;
            }

        })
        .catch(function (error) { //cathing errors and writing error message
            console.log("ERROR!");
            console.error(error);
            root.innerText = "ERROR! 404! MOVIE NOT FOUND!";
        });

}


function getInfo(_title) {

    fetch(`https://www.omdbapi.com/?t=${_title}&plot=full&apikey=c19ba406`)
        .then(response => response.json())
        .then(myJson => {
            object = myJson;
            console.log(myJson)
            document.getElementById(`plot-para`).innerHTML = `${object.Plot}`
            document.getElementById(`heading`).innerHTML = `${object.Title}`
            document.getElementById(`year`).innerHTML = `${object.Year}`
            document.getElementById(`image`).setAttribute('src', `${object.Poster}`)
            document.getElementById('image').setAttribute('onerror', 'imgError(this)')
        })

}


function ClearPage() { // each new search should start from the first page
    page = 1;
}


function imgError(image) { // backup image for posters in case the links to them are broken
    image.onerror = "";
    image.src = "/img/error.png";
}

$("i").click(function (event) {
    event.target.toggleClass('fas')
    event.target.toggleClass('far')
})