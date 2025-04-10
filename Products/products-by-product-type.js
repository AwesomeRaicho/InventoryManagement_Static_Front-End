window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("id");
  const productTypeName = urlParams.get("producttypename");
  try {
    let response = await fetch(
      `https://localhost:7200/api/Product/by-product-type?ProductTypeId=${id}`,
      {
        method: "Get",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    //console.log(productTypeName);
    let body = document.getElementById("body");
    body.innerHTML = "";
    body.innerHTML = `
<h1 class="border p-3 text-white bg-info">${productTypeName}</h1>
    <div id="main-container">
      <div id="product-list" style="margin-bottom: 150px"></div>
        <div id="back-menu-container">
        <a href="/ProductType/ProductTypes.html" id="back-menu-link">←</a>
      </div>
      <div id="add-new-container">
        <a href="ProductCreate.html?id=${id}&producttypename=${productTypeName}" id="add-new-link">Add</a>
      </div>
    </div>
`;

    if (response.ok) {
      let result = await response.json();
      var listContainer = document.getElementById("product-list");
      if (result.product_List.length) {
        for (let i = 0; i < result.product_List.length; i++) {
          var productDiv = document.createElement("div");
          productDiv.classList.add("m-1");
          productDiv.classList.add("border");
          productDiv.classList.add("p-2");
          productDiv.innerHTML = `
    <p class="fs-4 fw-semibold m-0">${result.product_List[i].productName}</p>
    <p class="fw-normal m-0">Product#: ${result.product_List[i].productNumber}</p>
    <p class="m-0">Stock: ${result.product_List[i].stockAmount}</p>
    <p class="m-0 mb-2 fst-italic"><span class="text-success fw-semibold">Price:</span> ${result.product_List[i].price}.00</p>
    `;

          let propsDiv = document.createElement("div");
          propsDiv.classList.add("m-0");
          propsDiv.classList.add("p-0");
          propsDiv.classList.add("mb-3");
          if (result.product_List[i].properties != null) {
            const dictionary = new Map();
            //console.log(result.product_List[i].properties);
            result.product_List[i].properties.forEach((element) => {
              //add properties to the map
              if (dictionary.has(element.propertyTypeName)) {
                dictionary.get(element.propertyTypeName).push(element.name);
              } else {
                dictionary.set(element.propertyTypeName, []);
                dictionary.get(element.propertyTypeName).push(element.name);
              }
            });
            //add the map to the UI
            //console.log(dictionary);
            dictionary.forEach((v, k) => {
              let propSet = document.createElement("div");

              propSet.classList.add("m-0");
              propSet.classList.add("mb-1");
              propSet.classList.add();
              propSet.innerHTML = `<h6 class="text-info" style="margin:0px">${k}:</h6>`;
              let propIntContainer = document.createElement("div");
              v.forEach((v) => {
                let propInstance = document.createElement("span");
                propInstance.innerText = `${v}, `;
                propIntContainer.appendChild(propInstance);
              });
              propSet.appendChild(propIntContainer);
              propsDiv.appendChild(propSet);
            });
          } else {
            propsDiv.innerText = "No properties";
          }

          productDiv.appendChild(propsDiv);
          console.log(result.product_List[i]);
          //product buttons
          let btnContainers = document.createElement("div");
          btnContainers.classList.add("d-flex");

          //List btn
          let listLink = document.createElement("a");
          listLink.classList.add("fs-6");
          listLink.classList.add("btn");
          listLink.classList.add("btn-primary");
          listLink.classList.add("m-1");

          listLink.href = `../ProductInstances/Product-instances-by-product.html?id=${result.product_List[i].id}&productTypeId=${id}&producttypename=${productTypeName}&productName=${result.product_List[i].productName}`;
          listLink.innerText = "List";
          btnContainers.appendChild(listLink);

          //edit btn
          let editLink = document.createElement("a");
          editLink.classList.add("fs-6");
          editLink.classList.add("btn");
          editLink.classList.add("btn-success");
          editLink.classList.add("m-1");
          editLink.classList.add("ms-auto");
          editLink.href = `ProductEdit.html?id=${result.product_List[i].id}&productName=${result.product_List[i].productName}&productTypeName=${productTypeName}&productTypeId=${id}&productNumber=${result.product_List[i].productNumber}&price=${result.product_List[i].price}&concurrencyStamp=${result.product_List[i].concurrencyStamp}`;
          editLink.innerText = "Edit";
          btnContainers.appendChild(editLink);

          //delete btn
          let deleteLink = document.createElement("a");
          deleteLink.classList.add("fs-6");
          deleteLink.classList.add("btn");
          deleteLink.classList.add("btn-danger");
          deleteLink.classList.add("m-1");

          deleteLink.href = `ProductDelete.html?id=${result.product_List[i].id}&productName=${result.product_List[i].productName}&productTypeName=${productTypeName}&productTypeId=${id}`;
          deleteLink.innerText = "Del";
          btnContainers.appendChild(deleteLink);

          productDiv.appendChild(btnContainers);

          listContainer.appendChild(productDiv);
        }
      } else {
        listContainer.innerHTML = `<h4 class="p-3">Products: 0</h4>`;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
