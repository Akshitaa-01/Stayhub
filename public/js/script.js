(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        const categories = form.querySelectorAll(".category-checkbox");
        if (categories.length > 0) {
            const categorySelected = [...categories].some(
                (category) => category.checked
            );

            const dropdown = form.querySelector("#categoryDropdown");

            if (!categorySelected) {
                event.preventDefault();
                event.stopPropagation();

                dropdown.classList.add("is-invalid");
            } else {
                dropdown.classList.remove("is-invalid");
            }
        }
        form.classList.add("was-validated");
      },
      false,
    );
  });
})();


const checkboxes = document.querySelectorAll(".category-checkbox");
const dropdown = document.querySelector("#categoryDropdown");

if (dropdown) {

    const updateCategoryText = () => {
        const selected = [...checkboxes]
            .filter((box) => box.checked)
            .map((box) => box.value);

        dropdown.querySelector("span").textContent =
            selected.length
                ? selected.join(", ")
                : "Select categories";
    };

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", updateCategoryText);
    });
    updateCategoryText();
}

let taxToggle=document.querySelector(".tax-toggle");
taxToggle.addEventListener("click",()=>{
    let taxInfo=document.getElementsByClassName("tax-info");
    for (info of  taxInfo){
        if  (info.style.display=="inline"){
            info.style.display="none";
        }else {
            info.style.display="inline"
        }
    }
})