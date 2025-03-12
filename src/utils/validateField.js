const validateField = (name, value) => {

    switch (name) {
        case "fullName":
            return value.trim() ? "" : "Full Name is required";
        case "email":
            if (!value.trim()) return "Email is required";
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? "" : "Invalid email format";
        case "phone":
            if (!value.trim()) return "Phone number is required";
            return /^\d{10}$/.test(value) ? "" : "Phone number must be 10 digits";
        case "password":
            if (!value) return "Password is required";
            if (value.length < 8) return "Password must be at least 8 characters";
            return /[A-Za-z]/.test(value) && /\d/.test(value) ? "" : "Password must contain letters and numbers";
        case "address":
            return value.length >= 5 ? "" : "Address must be at least 5 characters";
        case "username":
            return value.length > 0 ? "" : "Username is required";
        case "dob":
            return value ? "" : "Date of birth is required";
        case "gender":
            return value ? "" : "Gender is required";
        default:
            return "";
    }
};

export default validateField;
