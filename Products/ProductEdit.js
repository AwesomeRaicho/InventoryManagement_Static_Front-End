window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);

  const productTypeId = urlParams.get("productTypeId");
  const productTypeName = urlParams.get("productTypeName");
  const productName = urlParams.get("productName");
  const id = urlParams.get("id");
  const productNumber = urlParams.get("productNumber");
  const price = urlParams.get("price");

  const backBtn = document.getElementById("back-menu-link");
  backBtn.href = `/Products/products-by-product-type.html?id=${productTypeId}&producttypename=${productTypeName}`;

  //Add product Type name to the form header:
  const formProductType = document.getElementById("product-type-name");
  formProductType.innerText = `${productName}`;

  let productNumberinput = document.getElementById("ProductNumber");
  productNumberinput.value = `${productNumber}`;

  let ProductName = document.getElementById("ProductName");
  ProductName.value = `${productName}`;

  let Price = document.getElementById("Price");
  Price.value = `${price}`;

  //get all available properties for check marking
  const propertiesContainer = document.getElementById("properties-container");
  try {
    const response = await fetch(
      "https://localhost:7200/api/PropertyInstance/all-property-types-and-instances",
      {
        method: "Get",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      const result = await response.json();
      Object.entries(result.all_properties.value).forEach(
        ([propertyTypeName, instances]) => {
          let div = document.createElement("div");
          div.classList.add("mb-3", "p-3", "border", "rounded");
          div.innerHTML = `<h5 class="fw-bold">${propertyTypeName}</h5>`;

          instances.forEach((instance) => {
            let inputGroup = document.createElement("div");
            inputGroup.classList.add("input-group", "mb-2");

            let inputGroupText = document.createElement("div");
            inputGroupText.classList.add("input-group-text");

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = instance.id;
            checkbox.classList.add("form-check-input", "mt-0");
            checkbox.setAttribute(
              "aria-label",
              `Checkbox for ${instance.name}`
            );

            inputGroupText.appendChild(checkbox);

            let textInput = document.createElement("input");
            textInput.type = "text";
            textInput.classList.add("form-control");
            textInput.value = instance.name;
            textInput.setAttribute(
              "aria-label",
              `Text input for ${instance.name}`
            );
            textInput.readOnly = true;

            inputGroup.appendChild(inputGroupText);
            inputGroup.appendChild(textInput);

            div.appendChild(inputGroup);
          });

          propertiesContainer.appendChild(div);
        }
      );
    } else {
      propertiesContainer.innerText = "0 Properties to choose from.";
    }
  } catch (error) {
    console.log(error);
  }
};

const productForm = document.getElementById("product-form");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const Id = urlParams.get("id");
    const productTypeName = urlParams.get("productTypeName");
    const concurrencyStamp = urlParams.get("concurrencyStamp");
    if (!Id) {
      alert("Missing Product Type ID.");
      return;
    }

    // Get input values
    const productNumber = document.getElementById("ProductNumber").value.trim();
    const productName = document.getElementById("ProductName").value.trim();
    const price = parseFloat(document.getElementById("Price").value) || 0;
    const productTypeId = urlParams.get("productTypeId");

    // Collect checked property IDs
    const selectedProperties = [];
    document
      .querySelectorAll("#properties-container input[type='checkbox']:checked")
      .forEach((checkbox) => {
        selectedProperties.push(checkbox.value);
      });

    // Construct request payload
    const productRequest = {
      productNumber,
      productName,
      price,
      Id,
      productTypeId,
      propertyIds: selectedProperties.length > 0 ? selectedProperties : null,
      concurrencyStamp,
    };

    //console.log("Submitting Product:", productRequest);

    // Send fetch request
    const response = await fetch("https://localhost:7200/api/Product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productRequest),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Product update Successfully!");
      console.log("Server Response:", data);
      window.location.href = `/Products/products-by-product-type.html?id=${productTypeId}&producttypename=${productTypeName}`;
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.Error || "Failed to update product"}`);
      console.error("Error Response:", errorData);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("An error occurred while submitting the product.");
  }
});
