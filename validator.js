// Đối tượng Validator
function Validator(options) {
    // option.form = ''
    // option.rules = []
    // option.errorSelector = ''

    // Thực hiện validate
    validate = (inputElelent, errorElement, rule) => {

        let errorMessage = rule.test(inputElelent.value)
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElelent.parentElement.classList.add('invalid')
        }
        else {
            errorElement.innerText = ''
            inputElelent.parentElement.classList.remove('invalid')
        }
    }

    // Lấy element của form
    var formElement = document.querySelector(options.form)
    if (formElement) {
        options.rules.forEach(rule => {
            let inputElelent = formElement.querySelector(rule.selector)
            let errorElement = inputElelent.parentElement.querySelector(options.errorSelector)

            if (inputElelent) {
                // Xử lý trượng hợp blur khỏi input
                inputElelent.onblur = () => {
                    validate(inputElelent, errorElement, rule)
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElelent.oninput = () => {
                    errorElement.innerText = ''
                    inputElelent.parentElement.classList.remove('invalid')
                }
            }
        })

    }
}

// Định nghĩa rules
Validator.isRequired = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Trường này phải là email'
        }
    }
}

Validator.minLength = (selector, min) => {
    return {
        selector: selector,
        test: (value) => {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
        }
    }
}

Validator.isConfirmed = (selector, confirmValue) => {
    return {
        selector: selector,
        test: (value) => {
            console.log(document.querySelector('#form-1 #password').value)
            return value == confirmValue ? undefined : `Mật khẩu không chính xác`
        }
    }
}