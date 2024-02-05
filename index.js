const input = document.querySelector(".search");
const result = document.getElementById("news");
const apiKey = "5fd54c824d93467d9a702a8dbe9889f9";
let open = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
let close = `</div>`;

// Trending news at first web load
window.addEventListener("load", async function () {
  const url = `https://newsapi.org/v2/top-headlines?country=id&apiKey=${apiKey}`;
  const news = await getNews(url);
  updateUI(news);
});

// Search News
input.addEventListener("keyup", async function () {
  let topic = input.value;
  const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;
  const news = await getNews(url);
  console.log(topic, url, news);
  updateUI(news);
});

// Update cards news
function updateUI(res) {
  let cards = "";
  res.articles.forEach((n) => (cards += showCards(n)));
  result.innerHTML = open + cards + close;
}

function getNews(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((res) => res)
    .catch((error) => {
      console.log(error);
      if (input.value == "") {
        // headlines();
      } else {
        result.innerHTML = `
            <div class="alert alert-danger" role="alert">
            Content not found...
            </div>`;
      }
    });
}
// Create card
function showCards(n) {
  let dateObj = new Date(n.publishedAt);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDay();
  let hr = dateObj.getHours();
  let min = dateObj.getMinutes();
  let sec = dateObj.getSeconds();
  let newdate = `${day}/${month}/${year} ${hr}:${min}:${sec}`;

  let img = n.urlToImage;
  if (img == null) {
    img =
      "https://img.freepik.com/free-photo/top-view-old-french-newspaper-pieces_23-2149318857.jpg";
  }
  return `<div class="col">
              <div class="card h-100">
                <img src="${img}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${n.title}</h5>
                  <p class="date-author">${n.author + " - " + newdate}</p>
                  <p class="card-text">${n.description}</p>
                  <a href="${
                    n.url
                  }" class="btn btn-primary" target="_blank">Read more...</a>
                </div>
              </div>
            </div>`;
}
