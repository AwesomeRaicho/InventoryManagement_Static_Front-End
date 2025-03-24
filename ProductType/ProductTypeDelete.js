console.log("Finally?");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const productTypeName = urlParams.get("productTypeName");
console.log(id);
console.log(productTypeName);

let label = document.getElementById("product-type-name");
label.innerText = productTypeName;

let delBtn = document.getElementById("delete-btn");

delBtn.addEventListener("click", async (e) => {
  try {
    const response = await fetch(
      `https://localhost:7200/api/ProductType/${id}`,
      {
        method: "Delete",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    let result = await response.json();
    console.log(result);

    window.location.href = `/ProductType/ProductTypes.html`;
  } catch (error) {
    console.log(error);
  }
});

let cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener("click", (e) => {
  window.location.href = `/ProductType/ProductTypes.html`;
});
