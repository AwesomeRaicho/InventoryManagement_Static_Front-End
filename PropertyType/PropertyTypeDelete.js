const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("PropertyTypeId");
const propertyName = urlParams.get("PropertyTypeName");
console.log(id);
console.log(propertyName);

let productTypeName = document.getElementById("product-type-name");
productTypeName.innerText = propertyName;

let deleteBtn = document.getElementById("delete-btn");
let cancelBtn = document.getElementById("cancel-btn");

deleteBtn.addEventListener("click", async (e) => {
  try {
    const response = await fetch(
      `https://localhost:7200/api/PropertyType/${id}`,
      {
        method: "Delete",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      const result = await response.json();

      console.log(result);
      window.location.href = "/PropertyType/PropertyType.html";
    }
  } catch (error) {
    console.log(error);
  }
});

cancelBtn.addEventListener("click", (e) => {
  window.history.back();
});
