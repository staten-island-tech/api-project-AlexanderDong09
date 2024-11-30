import { DOMSelectors } from "./dom.js";

//
// gets data
// shows the data
// ^ will happen before the data is get, which isnt good
// we use smthn called asyncrhonus or however the hell you spell it (async) function

let fetchedData = []; // array of all the data gotten to be used later for the learn more

async function getData() {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=ul8UJtZB9tVcNUR2v9fwokows0p7JuQ4atB6G65d` // fetch returns a promise (a promise that you'll get something) (like a receipt)
    );
    // gaurd clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      fetchedData = [data];
      console.log(data);

      DOMSelectors.container.innerHTML = "";

      createCards([data]); // change back to [data]
    }
  } catch (error) {
    console.log(error);
    console.log("sorry coudlnt fid that");
  }
}
getData(); // as soon as you load the page, you get today's image

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
      fetchedData = data;
      console.log(data);

      DOMSelectors.container.innerHTML = "";

      createCards(data);
    }
  } catch (error) {
    console.log(error);
    console.log("sorry coudlnt fid that");
  }
}

async function getRandomCards(num) {
  // 2nd api call, getting the data from a specific date
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=ul8UJtZB9tVcNUR2v9fwokows0p7JuQ4atB6G65d&count=${num}` // fetch returns a promise (a promise that you'll get something) (like a receipt)
    );
    // gaurd clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      fetchedData = data;
      console.log(data);

      DOMSelectors.container.innerHTML = "";

      createCards(data);
    }
  } catch (error) {
    console.log(error);
    console.log("sorry coudlnt fid that");
  }
}

function createImageCards(item, index) {
  // when changing the tailwind css for the cards, APPLY IT TO THE VIDEO FUNCTION TOO !!!!!!!!

  // why is border size inconsistent
  const card = `
  <div class="card flex-grow basis-1/3 max-w-[23rem] bg-purple p-5 rounded-2xl m-4 flex flex-col items-center justify-center border-[3px] border-lightblue" data-index="${index}">
    <h2 class="header text-2xl font-bold mb-3 text-lightblue">${item.title}</h2>
    <img src="${
      item.hdurl
    }" class="w-full h-full rounded-2xl object-contain mb-3 ">
    <h3 class="text-xl mb-3 text-cream">Was APOD on: ${item.date}</h3>
    <h4 class="mb-3 text-cream">Copyright: ${
      item.copyright || "N/A, public domain image :D"
    } </h4>
    <h5 class="hidden text-sm text-cream mb-5">Image Description: ${
      item.explanation
    }</h5>
    <button class="btn btn-active btn-secondary" id="learn-more">Learn More!!!</button>
  </div>
  `;

  DOMSelectors.container.insertAdjacentHTML("beforeend", card);
}

function createVideoCards(item, index) {
  // used in the off chance that an embedded youtube video DOES appear, as APOD puts that as the picture of the day even though its not a picture, its a video.
  const card = `
   <div class="card w-auto h-auto flex-col bg-purple shadow-xl p-10 m-3 border border-solid border-black rounded-lg" data-index="${index}">  
    <h2 class="header text-2xl font-bold mb-3">${item.title}</h2>
    <iframe class="w-full h-auto rounded-md object-contain aspect-video" 
      src="${item.url}" 
      frameborder="0" 
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" 
      allowfullscreen>
    </iframe>
    <h3>Was APOD on: ${item.date}</h3>
    <h4>Copyright: ${item.copyright || "N/A, public domain video :D"} </h4>
    <h5>Description: ${item.explanation}</h5>
  </div>
  `;

  DOMSelectors.container.insertAdjacentHTML("beforeend", card);
}

function createModal(modalData) {
  const modal = document.createElement("div"); // creates the container, aka the gray box over everything
  modal.className =
    "fixed inset-0 bg-green bg-opacity-25 flex justify-center items-center z-50 opacity-0 transition-opacity duration-100"; // sets the class of the modal so that tailwind can be applied

  modal.innerHTML = `
    <div class="bg-black w-auto max-w-3xl h-auto overflow-auto rounded-lg shadow-lg p-2 relative border-[3px] border-green">
      <button class="btn btn-square btn-outline absolute top-3 right-3" id="close-modal">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 class="text-2xl font-bold mb-2">${modalData.title}</h2>
      <img src="${modalData.hdurl}" class=" size-2/4 max-h-96 rounded-lg mb-4 m-auto">
      <p class="text-sm text-cream mb-1">${modalData.explanation}</p>
    </div>
  `;

  setTimeout(() => {
    modal.classList.remove("opacity-0");
    modal.classList.add("opacity-100");
  }, 100);

  // makes the thing fade in w a delay

  document.body.appendChild(modal);

  const closeModal = document.getElementById("close-modal");
  closeModal.addEventListener("click", function () {
    modal.remove();
  });

  // Close the modal when clicking outside the content
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });
}

function createCards(data) {
  data.forEach((item, index) => {
    if (item.media_type === "video") {
      createVideoCards(item, index);
    } else {
      createImageCards(item, index);
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

DOMSelectors.getNum.addEventListener("click", function () {
  const num = DOMSelectors.quantityRandom.value;
  getRandomCards(num);
});

DOMSelectors.container.addEventListener("click", function (event) {
  if (event.target.id === "learn-more") {
    const card = event.target.closest(".card"); // once button is clickedtargets the closest div w the class card
    const index = card.getAttribute("data-index"); // gets a specific's card index num
    const modalData = fetchedData[index]; // gets the corresponding data
    createModal(modalData);
  }
});
