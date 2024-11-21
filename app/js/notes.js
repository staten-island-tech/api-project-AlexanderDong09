//
// gets data
// shows the data
// ^ will happen before the data is get, which isnt good
// we use smthn called asyncrhonus or however the hell you spell it (async) function

const DOMSelectors = {
  container: document.querySelector(".container"),
};

async function getData() {
  try {
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=ul8UJtZB9tVcNUR2v9fwokows0p7JuQ4atB6G65d&count=10"
    );
    // gaurd clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.log(error);
    console.log("sorry coudlnt fid that");
  }

  // fetch returns a promise (a promise that you'll get something) (like a receipt)
  const response = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=ul8UJtZB9tVcNUR2v9fwokows0p7JuQ4atB6G65d&count=5"
  );

  const data = await response.json();

  console.log(data); // if something breaks change to response
  createCards(data);

  // make the crap appear on the screen later
}

// find somewhere to add .filter((item) => item.media_type != "video"), you only want photos. ask whalen about it probably

getData();

function createCards(data) {
  // if video make video card, if image make image
  if (data.media_type === "video") {
    data.forEach((item) => {
      //create video card

      //create image function
      const card = `
        <div class="card w-96 bg-base-100 shadow-xl p-10 m-10">  
            <h2 class="header text-5xl">${item.title}</h2>
            <video src="${item.hdurl}">
            <h3>Was APOD on: ${item.date}</h3>
            <h4>Copyright: ${item.copyright || "not available, sorry! :("}</h4>
            <h5>Image Description: ${
              item.explanation || "Not available, sorry!"
            }</h5>
        </div>
      `;

      DOMSelectors.container.insertAdjacentHTML("beforeend", card);
    });
  } else {
    data.forEach((item) => {
      //create video card

      //create image function
      const card = `
        <div class="card w-96 bg-base-100 shadow-xl p-10 m-10">  
            <h2 class="header text-5xl">${item.title}</h2>
            <img src="${item.hdurl}">
            <h3>Was APOD on: ${item.date}</h3>
            <h4>Copyright: ${item.copyright || "not available, sorry! :("}</h4>
            <h5>Image Description: ${
              item.explanation || "Not available, sorry!"
            }</h5>
        </div>
      `;

      DOMSelectors.container.insertAdjacentHTML("beforeend", card);
    });
  }
}