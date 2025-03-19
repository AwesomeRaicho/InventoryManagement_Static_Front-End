const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("PropertyTypeId");
const propertyTypeName = urlParams.get("PropertyTypeName");
const ConcurrencyStamp = urlParams.get("ConcurrencyStamp");

var input = document.getElementById("productTypeNameId");
input.value = propertyTypeName;

let form = document
  .getElementById("update-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const newValue = document.getElementById("productTypeNameId");
    try {
      const response = await fetch("https://localhost:7200/api/PropertyType", {
        method: "Put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          Id: id,
          Name: newValue.value,
          ConcurrencyStamp: ConcurrencyStamp,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result);
        window.location.href = `/PropertyType/PropertyType.html?id=${id}`;
      } else {
        console.log(result);
        let errorList = document.getElementById("error-list");
        errorList.innerText = "";
        if (result.error != null) {
          var li = document.createElement("li");
          li.innerText = result.error;
          errorList.appendChild(li);
        } else if (result.errors != null) {
          for (const key in result.errors) {
            var li = document.createElement("li");
            li.innerText = `${key}: ${result.errors[key]}`;
            errorList.appendChild(li);
          }
        }
      }
    } catch (error) {
      console.log(error);
      if (result.error != null) {
        console.log(result.error);
      }
      if (result.errors != null) {
        console.log(result.errors);
      }
    }
  });
