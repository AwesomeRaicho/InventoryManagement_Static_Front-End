window.onload = async function () {
  try {
    const response = await fetch("https://localhost:7200/api/Location", {
      method: "Get",
      headers: {
        "content-type": "application/json",
      },
    });

    const body = document.getElementById("body");
    body.innerHTML = "";
    body.innerHTML = `
    <h1 class="border p-3 text-white bg-info">Locations</h1>
    <div
      id="locations-list"
      class="p-2"
      style="z-index: 2; margin-bottom: 120px"
    ></div>
    <div id="add-new-container">
      <a href="/Locations/LocationsCreate.html" id="add-new-link">Add</a>
    </div>
    <div id="back-menu-container">
      <a href="/Index.html" id="back-menu-link">←</a>
    </div>
`;

    let locationList = document.getElementById("locations-list");
    if (response.ok) {
      const result = await response.json();
      if (result.locations.length == 0) {
        locationList.innerHTML = `<p class="fs-4 p-1">There are no locations added.</p>`;
      } else {
        for (let i = 0; i < result.locations.length; i++) {
          let locationDiv = document.createElement("div");
          locationDiv.classList.add("border");
          locationDiv.classList.add("bg-light");
          locationDiv.classList.add("p-2");
          locationDiv.classList.add("mb-1");
          locationDiv.style = `display: flex; align-items: center;`;

          locationDiv.innerHTML = `<p class="m-0 fs-5">${result.locations[i].name}</p>`;

          let btnContainer = document.createElement("div");
          btnContainer.classList.add("ms-auto");
          btnContainer.style = "display: flex";
          btnContainer.innerHTML = `
          <a  data-location-id="${result.locations[i].id}" data-location-name="${result.locations[i].name}" data-concurrency-stamp="${result.locations[i].concurrencyStamp}" class="btn btn-success ms-1" id="edit-btn${result.locations[i].id}" >Edit</a>

          <a  data-location-id="${result.locations[i].id}" data-location-name="${result.locations[i].name}" class="btn btn-danger ms-1" id="del-btn${result.locations[i].id}">Del</a>
          `;
          locationDiv.appendChild(btnContainer);
          locationList.appendChild(locationDiv);
          //Cancel btns
          document
            .getElementById(`del-btn${result.locations[i].id}`)
            .addEventListener("click", async (e) => {
              let locationId = e.target.dataset.locationId;
              let locationName = e.target.dataset.locationName;

              e.target.href = `/Locations/LocationsDelete.html?id=${locationId}&locationName=${locationName}`;
            });

          //Edit btn
          document
            .getElementById(`edit-btn${result.locations[i].id}`)
            .addEventListener("click", async (e) => {
              let locationId = e.target.dataset.locationId;
              let locationName = e.target.dataset.locationName;
              let concurrencyStamp = e.target.dataset.concurrencyStamp;

              e.target.href = `/Locations/LocationsEdit.html?id=${locationId}&locationName=${locationName}&concurrencystamp=${concurrencyStamp}`;
            });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
