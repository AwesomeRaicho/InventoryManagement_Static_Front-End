const form = document.getElementById("property-instance-form");
const name = document.getElementById("property-instance-name");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const propertyName = urlParams.get("propertyname");

const backBtn = document.getElementById("back-menu-link");
backBtn.href = `/PropertyInstance/PropertyInstance.html?id=${id}&propertyname=${propertyName}`;
const createLabel = document.getElementById("create-label");
createLabel.innerHTML = `Add new Property to "<span class="text-success">${propertyName}</span>"`;
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      `https://localhost:7200/api/PropertyInstance`,
      {
        method: "Post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          PropertyTypeId: id,
        }),
      }
    );
    const result = await response.json();
    console.log(response.ok);
    console.log(result);
    if (response.ok) {
      window.location.href = `/PropertyInstance/PropertyInstance.html?id=${id}&propertyname=${propertyName}`;
    } else {
      console.log(result);
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
