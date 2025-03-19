window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("id");
  const instanceList = document.getElementById("property-instance-list");

  const addLink = document.getElementById("add-new-link");
  addLink.href = `/PropertyInstance/PropertyInstanceCreate.html?id=${id}`;
  try {
    const response = await fetch(
      `https://localhost:7200/api/PropertyInstance/by-property-type?PropertyTypeId=${id}`,
      {
        method: "Get",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      const result = await response.json();

      for (let i = 0; i < result.property_Instances.length; i++) {
        let instanceDiv = document.createElement("div");
        instanceDiv.classList.add("border");
        instanceDiv.classList.add("bg-light");
        instanceDiv.classList.add("p-2");
        instanceDiv.classList.add("mb-1");
        instanceDiv.classList.add("d-flex");
        instanceDiv.classList.add("flex-column");

        instanceDiv.innerHTML = `
        <div class="d-flex w-100">
          <p class="fs-4 m-0 ">${result.property_Instances[i].name}</p>
          <button data-prop-id="${result.property_Instances[i].id}" id="${result.property_Instances[i].id}" class="ms-auto me-3 btn btn-danger">Del</button>
        </div>
        <div class="text-danger" id="error-list" style="font-size: 12px">
        <ul class="m-0 ">
        </ul>
        </div>
        `;
        instanceList.appendChild(instanceDiv);
        let cancelBtn = document.getElementById(
          result.property_Instances[i].id
        );
        if (cancelBtn != null) {
          cancelBtn.addEventListener("click", async (e) => {
            const propID = e.target.dataset.propId;

            try {
              const response = await fetch(
                `https://localhost:7200/api/PropertyInstance/${propID}`,
                {
                  method: "Delete",
                  headers: {
                    "content-type": "application/json",
                  },
                }
              );
              const result = await response.json();
              if (response.ok) {
                console.log(result);
                window.history.back();
              } else {
                console.log(result);
                let erroList = document.getElementById("error-list");
                erroList.innerHTML = `<li class="py-1">${result.error}</li>`;
              }
            } catch (error) {
              console.log(error);
              console.log(result);
            }
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
