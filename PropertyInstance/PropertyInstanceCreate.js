const form = document.getElementById("property-instance-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("property-instance-name");
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  try {
    const response = await fetch(
      `https://localhost:7200/api/PropertyInstance`,
      {
        method: "Post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          PropertyTypeId: id,
        }),
      }
    );
    const result = await response.json();
    console.log(response.ok);
    console.log(result);
    if (response.ok) {
      window.location.href = `/PropertyInstance/PropertyInstance.html?id=${id}`;
    } else {
      console.log(result);
      var errorList = document.getElementById("error-list");
      var error = document.createElement("li");
      error.innerText = "";
      error.innerText = result.error;
      errorList.appendChild(error);
    }
  } catch (error) {
    console.log(error);
    window.location.href = `/PropertyInstance/PropertyInstance.html?id=${id}`;
  }
});
