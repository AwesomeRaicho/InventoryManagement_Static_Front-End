window.onload = async function () {
  try {
    var response = await fetch("https://localhost:7200/api/PropertyType", {
      method: "Get",
      headers: {
        "content-type": "application/json",
      },
    });

    let body = document.getElementById("body");
    body.innerHTML = "";
    body.innerHTML = `
    <h1 class="border p-3 text-white bg-info">Property Types</h1>
    <div
    id="property-type-list"
    class="p-2"
    style="z-index: 2; margin-bottom: 120px"
    ></div>
    <div id="add-new-container">
    <a href="/PropertyType/PropertyTypeCreate.html" id="add-new-link">Add</a>
    </div>
    <div id="back-menu-container">
    <a href="/Index.html" id="back-menu-link">←</a>
    </div>
    `;
    let listContainer = document.getElementById("property-type-list");

    if (response.ok) {
      var result = await response.json();

      for (let i = 0; i < result.propertyTypes.length; i++) {
        var propertyDiv = document.createElement("div");
        propertyDiv.classList.add("border");
        propertyDiv.classList.add("bg-light");
        propertyDiv.classList.add("p-2");
        propertyDiv.classList.add("mb-1");
        propertyDiv.style = `display: flex; align-items: center;`;

        propertyDiv.innerHTML = `<a href="../PropertyInstance/PropertyInstance.html?id=${result.propertyTypes[i].id}&propertyname=${result.propertyTypes[i].name}" class="fs-4 ps-2" style="text-decoration: none; width: 100%">${result.propertyTypes[i].name}</a>`;
        let btnContainer = document.createElement("div");
        btnContainer.style = "display: flex";
        btnContainer.innerHTML = `
        <a  data-property-type-id="${result.propertyTypes[i].id}" data-property-type-name="${result.propertyTypes[i].name}" data-concurrency-stamp="${result.propertyTypes[i].concurrencyStamp}" class="btn btn-success ms-1" id="edit-btn${result.propertyTypes[i].id}">Edit</a>
        <a  data-property-type-id="${result.propertyTypes[i].id}" data-property-type-name="${result.propertyTypes[i].name}" class="btn btn-danger ms-1" id="del-btn${result.propertyTypes[i].id}">Del</a>
        `;
        propertyDiv.appendChild(btnContainer);
        listContainer.appendChild(propertyDiv);
        //edit and delete button
        document
          .getElementById(`edit-btn${result.propertyTypes[i].id}`)
          .addEventListener("click", async (e) => {
            console.log("clicked");

            let propertyId = e.target.dataset.propertyTypeId;
            let propertyName = e.target.dataset.propertyTypeName;
            let concurrencyStamp = e.target.dataset.concurrencyStamp;
            e.target.href = `/PropertyType/PropertyTypeEdit.html?PropertyTypeId=${propertyId}&PropertyTypeName=${propertyName}&ConcurrencyStamp=${concurrencyStamp}`;
          });
        document
          .getElementById(`del-btn${result.propertyTypes[i].id}`)
          .addEventListener("click", async (e) => {
            console.log("clicked");
            let propertyId = e.target.dataset.propertyTypeId;
            let propertyName = e.target.dataset.propertyTypeName;
            e.target.href = `/PropertyType/PropertyTypeDelete.html?PropertyTypeId=${propertyId}&PropertyTypeName=${propertyName}`;
          });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
