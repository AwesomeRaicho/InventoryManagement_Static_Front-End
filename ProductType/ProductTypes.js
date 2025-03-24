let listContainer = document.getElementById("product-type-list");

window.onload = async function () {
  try {
    var response = await fetch("https://localhost:7200/api/ProductType", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let body = document.getElementById("body");
    body.innerHTML = "";
    body.innerHTML = `
    <h1 class="border p-3 text-white bg-info">Product Types</h1>
<div id="main-container">
      <div id="product-type-list" class="p-2"></div>
      <div id="add-new-container">
        <a href="ProductTypesCreate.html" id="add-new-link">Add</a>
      </div>
      <div id="back-menu-container">
        <a href="/Index.html" id="back-menu-link">←</a>
      </div>
    </div>
`;
    if (response.ok) {
      let result = await response.json();

      if (result.productTypes.length > 0) {
        for (var i = 0; i < result.productTypes.length; i++) {
          let div = document.createElement("div");
          div.classList.add("rounded-2");
          div.classList.add("bg-light");
          div.classList.add("border");
          div.classList.add("p-2");
          div.classList.add("ps-3");
          div.classList.add("mb-1");
          div.style = `display: flex; align-items: center;`;

          let anchor = document.createElement("a");
          anchor.innerText = `${result.productTypes[i].name}`;
          anchor.classList.add("fs-3");
          anchor.style = "text-decoration: none;";
          anchor.href = `../Products/products-by-product-type.html?id=${result.productTypes[i].id}`;

          let btnContainer = document.createElement("div");
          btnContainer.classList.add("ms-auto");

          btnContainer.style = "display: flex";
          btnContainer.innerHTML = `
          <a  data-product-type-id="${result.productTypes[i].id}" data-product-type-name="${result.productTypes[i].name}" data-concurrency-stamp="${result.productTypes[i].concurrencyStamp}" class="btn btn-success ms-1" id="edit-btn${result.productTypes[i].id}" >Edit</a>

          <a  data-product-type-id="${result.productTypes[i].id}" data-product-type-name="${result.productTypes[i].name}" class="btn btn-danger ms-1" id="del-btn${result.productTypes[i].id}">Del</a>
          `;

          //add element to list:
          let list = document.getElementById("product-type-list");

          div.appendChild(anchor);
          div.appendChild(btnContainer);
          list.appendChild(div);

          let editBtn = document.getElementById(
            `edit-btn${result.productTypes[i].id}`
          );
          editBtn.addEventListener("click", async (e) => {
            let id = e.target.dataset.productTypeId;
            let productTypeName = e.target.dataset.productTypeName;
            let concurrencyStamp = e.target.dataset.concurrencyStamp;
            console.log(id);
            console.log(productTypeName);
            console.log(concurrencyStamp);
            e.target.href = `/ProductType/ProductTypesEdit.html?id=${id}&productTypeName=${productTypeName}&concurrencyStamp=${concurrencyStamp}`;
          });

          let deleteBtn = document.getElementById(
            `del-btn${result.productTypes[i].id}`
          );
          deleteBtn.addEventListener("click", (e) => {
            console.log(e.target);
            let id = e.target.dataset.productTypeId;
            let productTypeName = e.target.dataset.productTypeName;
            console.log(id);
            console.log(productTypeName);
            e.target.href = `/ProductType/ProductTypeDelete.html?id=${id}&productTypeName=${productTypeName}`;
          });
        }
      } else {
        let list = document.getElementById("product-type-list");

        list.innerText = "Product Types: 0";
      }
    }
  } catch (error) {
    console.log(error);
  }
};
