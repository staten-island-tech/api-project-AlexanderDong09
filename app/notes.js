//
// gets data
// shows the data
// ^ will happen before the data is get, which isnt good
// we use smthn called asyncrhonus or however the hell you spell it (async) function

async function getData() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    // gaurd clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.log(error);
    console.log("sorry could not find that pocket monster");
  }

  // fetch returns a promise (a promise that you'll get something) (like a receipt)
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const data = await response.json();

  console.log(response);
}

getData();
