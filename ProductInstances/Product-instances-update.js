window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);

  // Extract query parameters
  const productTypeId = urlParams.get("productTypeId");
  const producttypename = urlParams.get("producttypename");
  const productId = urlParams.get("productId");
  const productName = urlParams.get("productName");
  const barcode = urlParams.get("barcode");
  const locationshop = urlParams.get("locationId");
  const purchasePrice = urlParams.get("purchasePrice");
  const statusVal = urlParams.get("status");
  const concurrencyStamp = urlParams.get("concurrencyStamp");
  const InstanceId = urlParams.get("id");

  console.log(barcode);
  console.log(locationshop);
  console.log(purchasePrice);
  console.log(statusVal);
  console.log(concurrencyStamp);

  // Back button link setup
  let backBtn = document.getElementById("back-menu-link");
  backBtn.href = `../ProductInstances/Product-instances-by-product.html?id=${productId}&productTypeId=${productTypeId}&producttypename=${producttypename}&productName=${productName}`;

  let productInstanceForm = document.getElementById("product-instance-form");

  // Fetch locations and populate dropdown
  const response = await fetch("https://localhost:7200/api/Location", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    let result = await response.json();

    if (result.locations.length > 0) {
      let locationOptions = document.getElementById(
        "locations-options-container"
      );

      for (let i = 0; i < result.locations.length; i++) {
        let newOption = document.createElement("option");
        newOption.value = `${result.locations[i].id}`;
        newOption.innerText = `${result.locations[i].name}`;
        if (newOption.value === locationshop) {
          newOption.selected = true;
        }
        locationOptions.appendChild(newOption);
      }
    }
  }

  // Populate status dropdown
  let OptionsContainer = document.getElementById("status-container");
  let statusArray = ["Available", "Reserved", "Sold"];

  for (let i = 0; i < statusArray.length; i++) {
    let option = document.createElement("option");
    option.value = statusArray[i];
    option.innerText = statusArray[i];
    if (statusArray[i] === statusVal) {
      option.selected = true;
    }
    OptionsContainer.appendChild(option);
  }

  // Set barcode and purchase price input values
  let barcodeInput = document.getElementById("barcode-id");
  barcodeInput.value = barcode;

  let purchasePriceInput = document.getElementById("purchase-price-id");
  purchasePriceInput.value = purchasePrice;

  //add productInstanceId

  //add concurrencyStamp

  // Submit handler
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
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            barcode: barcode.value,
            purchasePrice: purchasePrice.value,
            locationId: location.value,
            status: status.value,
            id: InstanceId,
            concurrencyStamp: concurrencyStamp,
            productId: productId,
          }),
        }
      );

      if (response.ok) {
        let result = await response.json();
        console.log(result);
        window.location.href = `../ProductInstances/Product-instances-by-product.html?id=${productId}&productTypeId=${productTypeId}&producttypename=${producttypename}&productName=${productName}`;
      } else {
        // still redirect even if not OK
        window.location.href = `../ProductInstances/Product-instances-by-product.html?id=${productId}&productTypeId=${productTypeId}&producttypename=${producttypename}&productName=${productName}`;
      }
    } catch (error) {
      console.log(error);
    }
  });
};
