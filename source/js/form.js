(function () {
    var me = {}
    var form = document.querySelector('.form-container')
    var closeButton = null;

    function onClose() {
        me.close();
        closeButton.removeEventListener('click', onClose)
    }

    me.open = function () {
        form.classList.remove("is-hidden")
        closeButton = document.querySelector('.form__close-button')
        closeButton.addEventListener('click', onClose)
    } 

    me.close = function () {
        form.classList.add("is-hidden")
    }

    me.isValid = function () {
        var requiredFields = document.querySelectorAll('[data-valid="required"]');
        var emailValue = Business.validation.isEmail(document.querySelector('[data-email]').value)
        var numberValue = Business.validation.isNumber(document.querySelector('[data-number]').value)

        if(!me.isAllCompleted(requiredFields)){
            console.log("Fill all fields")
            return false
        } else if(!emailValue){
            console.log("Not valid email")
            return false
        } else if(!numberValue){
            console.log("Not valid munber")
            return false
        }
        return true
    }

    me.isAllCompleted = function (data) {
        var result = true;
        for (var i = 0; i < data.length; i++) {
            if (!Business.validation.isNotEmpty(data[i].value)) {
                result = false;
                break;
            }
        }
        return result;
    }

    Business.form = me;
}());