const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const locationName = urlParams.get("locationName");
const concurrencyStamp = urlParams.get("concurrencystamp");

let locationNameId = document.getElementById("locationNameId");
locationNameId.value = locationName;

//submit proccess
let updateForm = document.getElementById("update-form");
updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(locationNameId.value);
  try {
    let response = await fetch(`https://localhost:7200/api/Location`, {
      method: "Put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: locationNameId.value,
        id: id,
        concurrencyStamp: concurrencyStamp,
      }),
    });
    let result = await response.json();

    if (response.ok) {
      window.location.href = `/Locations/Locations.html`;
    } else {
      console.log(result);
      let errorList = document.getElementById("error-list");

      errorList.innerHTML = `<li>${result.error}</li>`;
    }
  } catch (error) {
    console.log(error);
  }
});
