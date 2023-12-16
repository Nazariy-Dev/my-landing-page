(function () {
    //Add event listener for open form button
    var openFormButton = document.querySelector('.arrow-down');
    let form = document.querySelector('.form-container');

    if (openFormButton) {
        openFormButton.addEventListener("click", function (e) {
            e.preventDefault()
            Business.form.open()
        })
    }

    if(form){
        form.addEventListener("submit", function (e) {
            if(Business.form.isValid()){
                console.log("Form is valid")
            } else {
                console.log("Is not valid")
            }
            e.preventDefault()
        })
    }

    document.addEventListener("keyup", function (e) {
        if(e.key === "Escape" && !form.classList.contains("is-hidden")){
            Business.form.close()
        }
    })
}());
