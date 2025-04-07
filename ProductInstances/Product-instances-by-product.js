window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productTypeId = urlParams.get("productTypeId");
  const id = urlParams.get("id");
  const producttypename = urlParams.get("producttypename");
  const productName = urlParams.get("productName");

  console.log(productTypeId);
  console.log(id);
  console.log(producttypename);
  console.log(productName);

  try {
    let response = await fetch(
      `https://localhost:7200/api/ProductInstance/by-product?ProductId=${id}&producttypename=${producttypename}`,
      {
        method: "Get",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    let body = document.getElementById("body");
    body.innerHTML = "";
    body.innerHTML = `
  <body>
  <h1 class="border p-3 text-white bg-info"> ${producttypename} > ${productName}</h1>
    <div id="instances-list" class="p-2"></div>
      <div id="back-menu-container">
        <a href="/Products/products-by-product-type.html?id=${productTypeId}&producttypename=${producttypename}" id="back-menu-link">←</a>
      </div>
      <div id="add-new-container">
        <a href="Product-instances-create.html?productTypeId=${productTypeId}&producttypename=${producttypename}&productId=${id}&productName=${productName}" id="add-new-link">Add</a>
      </div>
  </body>
`;
    if (response.ok) {
      var result = await response.json();
      console.log(result);
      var listContainer = document.getElementById("instances-list");
      listContainer.style = `margin-bottom: 100px`;
      var list = result.product_instances_by_product;

      if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          let instDiv = document.createElement("div");
          instDiv.classList.add("border");
          instDiv.classList.add("p-2");
          instDiv.classList.add("mb-2");

          instDiv.innerHTML = `
          <p class="m-0 fw-bold fs-2">#${list[i].barcode}</p>
          <p class="m-0"><span class="fw-bold">Location: </span> ${
            list[i].locationName
          }</p>
          <p class="m-0 mb-2"><span class="fw-bold">Entry:  </span> ${list[
            i
          ].entryDate.slice(0, list[i].entryDate.indexOf("T"))}</p>
          <p class="m-0 mb-3 fw-bold fst-italic text-success">${
            list[i].status
          }</p>

          <div class="d-flex">
            <a href="#" class="btn btn-success">Update</a>
            <a href="/ProductInstances/Product-instances-delete.html?id=${
              list[i].id
            }&barcode=${list[i].barcode}&productId=${
            list[i].productId
          }&productName=${
            list[i].productName
          }&producttypename=${producttypename}&productTypeId=${productTypeId}" class="btn btn-danger ms-auto">Delete</a>
          </div>
          `;

          listContainer.appendChild(instDiv);
        }
      } else {
        listContainer.innerHTML = `<h2>Product instances: 0</h2>`;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
