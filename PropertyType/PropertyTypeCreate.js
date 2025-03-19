const form = document.getElementById("property-type-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const propertyTypeName = document.getElementById("property-type-name");

  try {
    const response = await fetch("https://localhost:7200/api/PropertyType", {
      method: "Post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ Name: propertyTypeName.value }),
    });
    const result = await response.json();
    if (response.ok) {
      console.log(result);
      window.location.href = "/PropertyType/PropertyType.html";
    } else {
      let errorList = document.getElementById("error-list");
      let error = document.createElement("li");
      error.innerText = result.error;
      errorList.innerText = "";
      errorList.appendChild(error);
    }
  } catch (error) {
    console.log(error);
    window.location.href = "/PropertyType/PropertyType.html";
  }
});
