window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("id");

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
    if (response.ok) {
      let result = await response.json();
      var listContainer = document.getElementById("product-list");
      if (result.product_List.length) {
        for (let i = 0; i < result.product_List.length; i++) {
          console.log(result.product_List[i]);

          var productDiv = document.createElement("div");
          productDiv.classList.add("m-1");
          productDiv.classList.add("border");
          productDiv.classList.add("p-2");
          productDiv.innerHTML = `
    <p class="fs-4 fw-semibold m-0">${result.product_List[i].productName}</p>
    <p class="fw-normal m-0">Product#: ${result.product_List[i].productNumber}</p>
    <p class="m-0">Stock: ${result.product_List[i].stockAmount}</p>
    <p class="m-0 fst-italic"><span class="text-success fw-semibold">Price:</span> ${result.product_List[i].price}.00</p>
    `;

          if (result.product_List[i].properties != null) {
          } else {
            let propsDiv = document.createElement("div");
            propsDiv.classList.add("m-0");
            propsDiv.classList.add("p-0");
            propsDiv.classList.add("mb-3");
            propsDiv.innerText = "No pproperties";
            productDiv.appendChild(propsDiv);
          }

          let listLink = document.createElement("a");
          listLink.classList.add("fs-6");
          listLink.classList.add("btn");
          listLink.classList.add("btn-primary");
          listLink.href = `../ProductInstances/Product-instances-by-product.html?id=${result.product_List[i].id}`;
          listLink.innerText = "List";
          productDiv.appendChild(listLink);

          listContainer.appendChild(productDiv);
        }
      } else {
        listContainer.innerHTML = `<h4>Products: 0</h4>`;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
