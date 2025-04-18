window.onload = async function () {
  let urlParams = new URLSearchParams(window.location.search);

  let productTypeId = urlParams.get("productTypeId");
  let producttypename = urlParams.get("producttypename");
  let productId = urlParams.get("productId");
  const productName = urlParams.get("productName");

  //   console.log(productTypeId);
  //   console.log(producttypename);

  //backBtn
  let backBtn = document.getElementById("back-menu-link");

  backBtn.href = `../ProductInstances/Product-instances-by-product.html?id=${productId}&productTypeId=${productTypeId}&producttypename=${producttypename}&productName=${productName}`;

  let productInstanceForm = document.getElementById("product-instance-form");
  //console.log(productInstanceForm);

  //FETCH LOCATIONS
  const response = await fetch("https://localhost:7200/api/Location", {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  //console.log(response);
  if (response.ok) {
    let result = await response.json();
    //console.log(result);

    if (result.locations.length > 0) {
      let locationOptions = document.getElementById(
        "locations-options-container"
      );
      for (let i = 0; i < result.locations.length; i++) {
        let newOption = document.createElement("option");
        newOption.value = `${result.locations[i].id}`;
        newOption.innerText = `${result.locations[i].name}`;
        //console.log(newOption);
        locationOptions.appendChild(newOption);
      }
    }
  }

  //SUBMIT FORM
  productInstanceForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let barcode = document.getElementById("barcode-id");
    let purchasePrice = document.getElementById("purchase-price-id");
    let location = document.getElementById("location-id");
    let status = document.getElementById("status-id");
    try {
      const response = await fetch(
        "https://localhost:7200/api/ProductInstance",
        {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            barcode: barcode.value,
            purchasePrice: purchasePrice.value,
            locationId: location.value,
            status: status.value,
            productId: productId,
          }),
        }
      );
      let result = await response.json();

      if (response.ok) {
        console.log(result);
        window.location.href = `../ProductInstances/Product-instances-by-product.html?id=${productId}&productTypeId=${productTypeId}&producttypename=${producttypename}&productName=${productName}`;
      }
      console.log(result);
      let errorList = document.getElementById("error-list");
      let liError = document.createElement("li");
      errorList.innerText = "";
      liError.innerText = result.error;
      errorList.appendChild(liError);
      //window.location.href = `../ProductInstances/Product-instances-by-product.html?id=${productId}&productTypeId=${productTypeId}&producttypename=${producttypename}&productName=${productName}`;
    } catch (error) {
      console.log(error);
    }
  });
};
