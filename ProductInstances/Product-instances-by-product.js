window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("id");
  try {
    let response = await fetch(
      `https://localhost:7200/api/ProductInstance/by-product?ProductId=${id}`,
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
    <div id="instances-list" class="p-2"></div>
          <div id="back-menu-container">
        <a href="/Index.html" id="back-menu-link">←</a>
      </div>
  </body>
`;
    if (response.ok) {
      var result = await response.json();
      //console.log(result.product_instances_by_product);
      var listContainer = document.getElementById("instances-list");
      var list = result.product_instances_by_product;

      if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          let instDiv = document.createElement("div");
          instDiv.classList.add("border");
          instDiv.classList.add("p-2");
          instDiv.classList.add("mb-2");

          list[i].entryDate.in;

          instDiv.innerHTML = `
          <p class="m-0">#${list[i].barcode}</p>
          <p class="m-0">Location: ${list[i].LocationName}</p>
          <p class="m-0 fw-bold fst-italic text-success">${list[i].status}</p>
          <p class="m-0 mb-2">Entry: ${list[i].entryDate.slice(
            0,
            list[i].entryDate.indexOf("T")
          )}</p>
          <a href="#">Update</a>
          
          `;

          listContainer.appendChild(instDiv);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
