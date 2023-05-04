export default function login_validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }


    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'Must be greater than 8 & less than 20 Characters';
    }

    else if (values.password.includes(" ")) {
        errors.password = "Invalid Password"
    }

    return errors
}

export function register_validation(values) {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = "Required"
    }
    else if (values.firstName.includes(" ")) {
        errors.firstName = "Invalid firstName"
    }


    if (!values.lastName) {
        errors.lastName = "Required"
    }
    else if (values.lastName.includes(" ")) {
        errors.lastName = "Invalid lastName"
    }

    if (!values.organizationName) {
        errors.organizationName = "Required"
    }

    if (!values.email) {
        errors.email = 'Required';
    }

    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }


    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'Must be greater than 8 & less than 20 Characters';
    }

    else if (values.password.includes(" ")) {
        errors.password = "Invalid Password"
    }

    return errors
}