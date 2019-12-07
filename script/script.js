// Реализовать веб-страницу для поиска фильмов. При открытии страницы пользователю доступна только форма для ввода названия фильма (или части названия) и выбора типа (movie, series, episode).

// После того, как пользователь ввел данные и нажал на кнопку Search, необходимо отправить соответствующий запрос к API ресурса OMDB (http://www.omdbapi.com/) с помощью AJAX.

// Если в качестве ответа на запрос вы получили список фильмов, то его необходимо отобразить под формой поиска. Если по заданным критериям не будут найдены фильмы, то отобразите сообщение Movie not found!.

// Учтите, что OMDB по умолчанию возвращает только первые 10 фильмов. Поэтому необходимо реализовать пагинацию для тех случаев, когда под критерии поиска подходит больше, чем 10 фильмов. Пагинация – это порядковая нумерация страниц, которая обычно находится вверху или внизу страниц сайта. Вероятно, вы видели в интернет-магазинах на страницах с товарами кнопки с цифрами 1, 2, 3 и т. д., при нажатии на которые отбражается другой блок товаров. Вот такие кнопки и называют пагинацией. Таким образом, при первом поиске необходимо выводить первые 10 фильмов и кнопки для перехода по страницам. При клике на такую кнопку необходимо отправить запрос с указанием в параметрах требуемой страницы, и полученный результат вывести на место текущего списка фильмов.

// Возле каждого фильма должна быть кнопка Details, при нажатии на которую будет выводиться подробная информация о фильме. Эту информацию необходимо выводить на этой же странице сразу под списком найденных фильмов и пагинацией.

// Все запросы необходимо отправлять, используя AJAX. То есть при нажатии на любые кнопки ваша веб-страница не должна обновляться.
// Ссылка на API OMDB: http://www.omdbapi.com/ (необходимо зарегистри роваться для получения API KEY).
// Ссылка на альтернативный API с фильмами (для того случая, если OMDB не будет работать): https://developers.themoviedb.org/3/ search/search-movies.
// Если же и этот API не будет работать, вам придется сам остоятельно найти другой доступный ресурс и адаптировать под него задание.

let obj = {};
let name = document.getElementById("name");
let select = document.getElementById("select");
let submit = document.getElementById("submit");
let total;

let ul = document.createElement("ul");
document.getElementById("root").appendChild(ul);

submit.addEventListener('click', FetchFilm);

function FetchFilm() {
    let url = `http://www.omdbapi.com/?s=${name.value}&type=${select.value}&apikey=c19ba406`

    let buff = ``;

    fetch(url)
        .then(response => response.json())
        .then(myJson => {
            obj = myJson;

            for (let i = 0; i < obj.Search.length; i++) {
                buff += `<li>${obj.Search[i].Title} (${obj.Search[i].Year})</li>`
            }

            ul.innerHTML = `${buff}`
            total = parseInt(obj.totalResults, 10);

        })
        .catch(function (error) {
            console.log("ERROR!");
            console.error(error);
            root.innerText = "ERROR! 404! MOVIE NOT FOUND!"
        });



    // $('#pagination-container').pagination({
    //     dataSource: [1, 2, 3, 4, 5, 6, 7195],
    //     callback: function (data, pagination) {
    //         // template method of yourself
    //         var html = template(data);
    //         $('#data-container').html(html);
    //     }
    // })

}

