const locationForm = document.getElementById("location-form");

locationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let locationName = document.getElementById("location-name");

  try {
    let response = await fetch("https://localhost:7200/api/Location", {
      method: "Post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: locationName.value,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      window.location.href = `/Locations/Locations.html`;
    } else {
      var errorList = document.getElementById("error-list");
      var error = document.createElement("li");
      error.innerText = "";
      error.innerText = result.error;
      errorList.appendChild(error);
    }
  } catch (error) {
    console.log(error);
  }
});
