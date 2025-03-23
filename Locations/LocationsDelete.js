const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const locationName = urlParams.get("locationName");
console.log(id);
console.log(locationName);

let locationNamelabel = document.getElementById("location-name");
locationNamelabel.innerText = `${locationName}`;

let deleteBtn = document.getElementById("delete-btn");
let cancelBtn = document.getElementById("cancel-btn");

cancelBtn.addEventListener("click", (e) => {
  console.log("clicked");
  window.location.href = `/Locations/Locations.html`;
});

deleteBtn.addEventListener("click", async (e) => {
  console.log("clicked");

  try {
    const response = await fetch(`https://localhost:7200/api/Location/${id}`, {
      method: "Delete",
      headers: {
        "content-type": "application/json",
      },
    });

    let result = await response.json();
    console.log(result);

    window.location.href = `/Locations/Locations.html`;
  } catch (error) {
    console.log(error);
  }
});
