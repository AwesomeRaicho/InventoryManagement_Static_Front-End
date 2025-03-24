const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const productTypeName = urlParams.get("productTypeName");
const concurrencyStamp = urlParams.get("concurrencyStamp");

// console.log(id);
// console.log(productTypeName);
// console.log(concurrencyStamp);
let productTypeNameId = document.getElementById("productTypeNameId");

productTypeNameId.value = productTypeName;

const updateForm = document.getElementById("update-form");

updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(productTypeNameId.value);
  try {
    let response = await fetch(`https://localhost:7200/api/ProductType`, {
      method: "Put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: productTypeNameId.value,
        id: id,
        concurrencyStamp: concurrencyStamp,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      window.location.href = "/ProductType/ProductTypes.html";
    } else {
      let erroList = document.getElementById("error-list");
      erroList.innerHTML = `<li>${result.error}</li>`;
    }
  } catch (error) {
    console.log(error);
  }
});
