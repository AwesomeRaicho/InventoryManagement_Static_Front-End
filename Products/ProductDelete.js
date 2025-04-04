const urlParams = new URLSearchParams(window.location.search);

const productTypeId = urlParams.get("productTypeId");
const productTypeName = urlParams.get("productTypeName");

const id = urlParams.get("id");
const productName = urlParams.get("productName");
console.log(id);
console.log(productName);

let label = document.getElementById("product-name");
label.innerText = `${productName}`;

let delBtn = document.getElementById("delete-btn");

delBtn.addEventListener("click", async (e) => {
  try {
    const response = await fetch(`https://localhost:7200/api/Product/${id}`, {
      method: "Delete",
      headers: {
        "content-type": "application/json",
      },
    });

    let result = await response.json();
    console.log(result);

    window.location.href = `/Products/products-by-product-type.html?id=${productTypeId}&producttypename=${productTypeName}`;
  } catch (error) {
    console.log(error);
  }
});

let cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener("click", (e) => {
  window.location.href = `/Products/products-by-product-type.html?id=${productTypeId}&producttypename=${productTypeName}`;
});
