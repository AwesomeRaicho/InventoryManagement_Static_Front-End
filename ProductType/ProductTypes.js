let listContainer = document.getElementById("product-type-list");

window.onload = async function () {
  try {
    var response = await fetch("https://localhost:7200/api/ProductType", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      let result = await response.json();

      if (result.productTypes.length > 0) {
        for (var i = 0; i < result.productTypes.length; i++) {
          console.log(result.productTypes[i]);

          let div = document.createElement("div");
          div.classList.add("rounded-2");
          div.classList.add("bg-light");
          div.classList.add("border");
          div.classList.add("p-2");
          div.classList.add("ps-3");
          div.classList.add("mb-1");

          let anchor = document.createElement("a");
          anchor.innerText = `${result.productTypes[i].name}`;
          anchor.classList.add("fs-3");
          anchor.style = "text-decoration: none;";
          anchor.href = `../Products/products-by-product-type.html?id=${result.productTypes[i].id}`;

          //add element to list:
          let list = document.getElementById("product-type-list");
          div.appendChild(anchor);
          list.appendChild(div);
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
