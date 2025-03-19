const form = document.getElementById("product-type-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let productTypeName = document.getElementById("product-type-name");

  console.log(productTypeName.value);

  try {
    const response = await fetch("https://localhost:7200/api/ProductType", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productTypeName.value,
      }),
    });

    if (response.ok) {
      let result = await response.json();

      console.log(result);
    }
    window.location.href = "ProductTypes.html";
  } catch (error) {
    console.log(error);
    window.location.href = "ProductTypes.html";
  }
});
