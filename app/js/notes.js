import { DOMSelectors } from "./dom.js";

//
// gets data
// shows the data
// ^ will happen before the data is get, which isnt good
// we use smthn called asyncrhonus or however the hell you spell it (async) function

async function getData() {
  // 2nd api call, getting the data from a specific date
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=ul8UJtZB9tVcNUR2v9fwokows0p7JuQ4atB6G65d&count=5` // fetch returns a promise (a promise that you'll get something) (like a receipt)
    );
    // gaurd clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);

      DOMSelectors.container.innerHTML = "";

      createCards(data);
    }
  } catch (error) {
    console.log(error);
    console.log("sorry coudlnt fid that");
  }
}
getData(); // as soon as you load the page, you get five random images

async function searchData(startDate, endDate) {
  // 2nd api call, getting the data from a specific date
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=ul8UJtZB9tVcNUR2v9fwokows0p7JuQ4atB6G65d&start_date=${startDate}&end_date=${endDate}` // fetch returns a promise (a promise that you'll get something) (like a receipt)
    );
    // gaurd clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);

      DOMSelectors.container.innerHTML = "";

      createCards(data);
    }
  } catch (error) {
    console.log(error);
    console.log("sorry coudlnt fid that");
  }
}

function createImageCards(item) {
  // when changing the tailwind css for the cards, APPLY IT TO THE VIDEO FUNCTION TOO !!!!!!!!
  const card = `
        <div class="card w-96 bg-base-100 shadow-xl p-10 m-10">  
            <h2 class="header text-5xl">${item.title}</h2>
            <img src="${item.hdurl}">
            <h3>Was APOD on: ${item.date}</h3>
            <h4>Copyright: ${
              item.copyright || "N/A, public domain image :D"
            } </h4>
            <h5>Image Description: ${
              item.explanation || "Not available, sorry!"
            }</h5>
        </div>
      `;

  DOMSelectors.container.insertAdjacentHTML("beforeend", card);
}

function createVideoCards(item) {
  // used in the off chance that an embedded youtube video DOES appear, as APOD puts that as the picture of the day even though its not a picture, its a video.
  const card = `
  <div class="card w-96 bg-base-100 shadow-xl p-10 m-10">  
    <h2 class="header text-5xl">${item.title}</h2>
    <iframe class="w-full aspect-video" 
      src="${item.url}" 
      frameborder="0" 
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" 
      allowfullscreen>
    </iframe>
    <h3>Was APOD on: ${item.date}</h3>
    <h4>Copyright: ${item.copyright || "N/A, public domain video :D"} </h4>
    <h5>Image Description: ${item.explanation || "Not available, sorry!"}</h5>
  </div>
  `;

  DOMSelectors.container.insertAdjacentHTML("beforeend", card);
}

function createCards(data) {
  data.forEach((item) => {
    if (item.media_type === "video") {
      createVideoCards(item);
    } else {
      createImageCards(item);
    }
  });
}

DOMSelectors.getDates.addEventListener("click", function () {
  const startDate = DOMSelectors.startDate.value;
  const endDate = DOMSelectors.endDate.value;

  if (!startDate) {
    alert("Please select a start date. It won't work without it ya bum");
    return;
  }

  if (new Date(startDate) > new Date(endDate)) {
    // converts the string from the date inputs into a new Date object, which can be compared
    alert("Start date must be before end date.");
    return;
  }

  searchData(startDate, endDate);
});
