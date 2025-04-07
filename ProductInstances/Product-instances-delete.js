const urlParams = new URLSearchParams(window.location.search);

const productInstanceId = urlParams.get("id");
const productInstanceBarcode = urlParams.get("barcode");
const productId = urlParams.get("productId");
const productName = urlParams.get("productName");
const productTypeName = urlParams.get("producttypename");
const productTypeId = urlParams.get("productTypeId");

console.log(productInstanceId);
console.log(productInstanceBarcode);
console.log(productId);
console.log(productName);
console.log(productTypeName);
console.log(productTypeId);

let productBarcode = document.getElementById("product-name");
productBarcode.innerText = `#${productInstanceBarcode}`;

//BUTONS
let backBtn = document.getElementById("cancel-btn");
backBtn.addEventListener("click", (e) => {
  window.location.href = `../ProductInstances/Product-instances-by-product.html?id=${productId}&productTypeId=${productTypeId}&producttypename=${productTypeName}&productName=${productName}`;
});

let deleteBtn = document
  .getElementById("delete-btn")
  .addEventListener("click", async (e) => {
    try {
      let response = await fetch(
        `https://localhost:7200/api/ProductInstance/${productInstanceId}`,
        {
          method: "Delete",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Deleted Successfuly");
        window.location.href = `../ProductInstances/Product-instances-by-product.html?id=${productId}&productTypeId=${productTypeId}&producttypename=${productTypeName}&productName=${productName}`;
      }
    } catch (error) {
      console.log(error);
      window.location.href = `../ProductInstances/Product-instances-by-product.html?id=${productId}&productTypeId=${productTypeId}&producttypename=${productTypeName}&productName=${productName}`;
    }
  });
