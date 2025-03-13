import { useState } from "react";
import { motion } from "framer-motion";
import {FaGithub, FaUser, FaEnvelope, FaPhone,FaMapMarkerAlt, FaVenusMars, FaTint, FaAt, FaCaretLeft, FaCalendarAlt} from "react-icons/fa";
import {IoMdSend} from "react-icons/io";
import {MdOutlineKeyboardDoubleArrowRight} from "react-icons/md";
import validateField from "../utils/validateField.js";
import InputField from "../components/InputField.jsx";
import PasswordField from "../components/PasswordField.jsx";
import SelectField from "../components/SelectField.jsx";
import {validateForm} from "../utils/validateForm.js";
import SocialButton from "../components/SocialButton.jsx";

export default function Signup() {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        dob: "",
        gender: "",
        address: "",
        bloodGroup: "",
    });

    const [step, setStep] = useState(1);
    const [showCheck, setShowCheck] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);
    const [errors, setErrors] = useState({});
    const [hoveredField, setHoveredField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));


        const fieldError = validateField(name, value);

        setErrors((prevErrors) => {
            if (value.length === 0) {
                const { [name]: _, ...rest } = prevErrors; // Remove error when input is empty
                return rest;
            }
            return {
                ...prevErrors,
                [name]: fieldError
            };
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm(formData); // Validate full form

        setErrors(newErrors); // Show all errors on submit

        if (Object.keys(newErrors).length > 0) {
            return; // Stop submission if there are errors
        }

        setShowCheck(true);
        setTimeout(() => {
            setStartAnimation(true);
        }, 1000);

        setTimeout(() => {
            setShowCheck(false);
            setStartAnimation(false);
            setStep(1);
        }, 3000);

        console.log("Form submitted:", formData);
    };


    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };


    return (
        <div className="flex h-screen items-center justify-center p-4">
            {/* Background Effect */}
            <div className="w-full max-w-[400px] bg-[#ffe2e2] p-6 rounded-xl shadow-[10px_10px_20px_rgba(0,0,0,0.3)] flex flex-col py-16">

                <div className="flex justify-between items-center mb-8">
                    {step > 1 && (
                        <button
                            onClick={handleBack}
                            className="text-gray-700 hover:text-gray-900 bg-gray-200 p-2 rounded-full"
                        >
                            <FaCaretLeft className="w-5 h-5" />
                        </button>
                    )}
                    <h2 className="text-2xl font-bold text-gray-700 text-center w-full flex items-center justify-center gap-2">
                        {step === 1 ? (<><span className="w-3 h-3 bg-[#12b9b3] rounded-full animate-ping mr-2"></span> Register</>) : step === 2 ? "Just One More Step" : "Almost Done!"}
                    </h2>

                </div>
                <form onSubmit={handleSubmit} className="flex-grow flex flex-col space-y-4">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: step === 1 ? -100 : 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: step === 1 ? -100 : 100 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-5"
                    >
                        {step === 1 && (
                            <>
                                <InputField name="fullName" type="text" placeholder="Full Name" icon={<FaUser />} value={formData.fullName} onChange={handleChange} error={errors.fullName} onHover={[hoveredField, setHoveredField]}/>
                                <InputField name="email" type="email" placeholder="Email" icon={<FaEnvelope />} value={formData.email} onChange={handleChange} error={errors.email} onHover={[hoveredField, setHoveredField]}/>
                                <InputField name="phone" type="phone" placeholder="Phone" icon={<FaPhone />} value={formData.phone} onChange={handleChange} error={errors.phone} onHover={[hoveredField, setHoveredField]}/>

                                <div className="relative">
                                    <motion.button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex items-center justify-center w-full bg-[#12b9b3] text-white p-[9px] rounded-lg hover:bg-[#10c1bb] text-sm font-[500] my-3 gap-1"
                                        whileHover={{ scale: 1.04 }}
                                    >
                                        Next
                                        <motion.span
                                            animate={{ x: [0, 4, 0] }} // Moves forward and comes back
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                        ><MdOutlineKeyboardDoubleArrowRight className="text-lg"/></motion.span>
                                    </motion.button>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <InputField
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    icon={<FaAt />}
                                    value={formData.username}
                                    onChange={handleChange}
                                    error={errors.username}
                                    onHover={[hoveredField, setHoveredField]}
                                />

                                <PasswordField
                                    name= "password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    showPassword={showPassword}  // Pass current state
                                    togglePassword={() => setShowPassword((prev) => !prev)} // Toggle function
                                    error={errors.password}
                                    onHover={[hoveredField, setHoveredField]}
                                />

                                <InputField
                                    type="date"
                                    name="dob"
                                    placeholder="Date of Birth"
                                    icon={<FaCalendarAlt />}
                                    value={formData.dob}
                                    onChange={handleChange}
                                    error={errors.dob}
                                    onHover={[hoveredField, setHoveredField]}
                                    extraProps={{
                                        style: {
                                            appearance: "none",
                                            WebkitAppearance: "none",
                                            MozAppearance: "none",
                                        },
                                    }}
                                />

                                <div className="relative">
                                    <motion.button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex items-center justify-center w-full bg-[#12b9b3] text-white p-[9px] rounded-lg hover:bg-[#10c1bb] text-sm font-[500] my-3 gap-1"
                                        whileHover={{ scale: 1.04 }}
                                    >
                                        Next
                                        <motion.span
                                            animate={{ x: [0, 4, 0] }} // Moves forward and comes back
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                        ><MdOutlineKeyboardDoubleArrowRight className="text-lg"/></motion.span>
                                    </motion.button>
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <InputField
                                    name="address"
                                    type="text"
                                    placeholder="Address"
                                    icon={<FaMapMarkerAlt/>}
                                    value={formData.address}
                                    onChange={handleChange}
                                    error={errors.address}
                                    onHover={[hoveredField, setHoveredField]}
                                />

                                <SelectField
                                    name="gender"
                                    icon={<FaVenusMars/>}
                                    value={formData.gender}
                                    onChange={handleChange}
                                    onHover={[hoveredField, setHoveredField]}
                                    error={errors.gender}
                                    options={[
                                        { value: "", label: "Select Gender" },
                                        { value: "male", label: "Male" },
                                        { value: "female", label: "Female" },
                                        { value: "other", label: "Other" },
                                    ]}
                                    required
                                />

                                <SelectField
                                    name="bloodGroup"
                                    icon={<FaTint />}
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    error={errors.bloodGroup}
                                    onHover={[hoveredField, setHoveredField]}
                                    options={[
                                        { value: "", label: "Blood Group (Optional)"},
                                        { value: "A+", label: "A+" },
                                        { value: "A-", label: "A-" },
                                        { value: "B+", label: "B+" },
                                        { value: "B-", label: "B-" },
                                        { value: "O+", label: "O+" },
                                        { value: "O-", label: "O-" },
                                        { value: "AB+", label: "AB+" },
                                        { value: "AB-", label: "AB-" },
                                    ]}
                                />


                                <div className="relative">
                                    <motion.button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="flex items-center justify-center w-full bg-[#12b9b3] text-white p-[9px] rounded-lg hover:bg-[#10c1bb] text-sm font-[500] my-3 gap-1"
                                        whileHover={{ scale: 1.04 }}
                                        disabled={showCheck} // Disable button during animation
                                    >
                                        {startAnimation ? (
                                            <>
                                                <motion.svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <motion.path d="M3 16L12 26L29 5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }}/>
                                                </motion.svg></>
                                        ) : showCheck ? (
                                            <span className="text-white">Processing...</span> // Temporary text before check appears
                                        ) : (
                                            <>

                                                <motion.span
                                                    animate={{ x: [0, 4, 0] }} // Moves forward and comes back
                                                    transition={{ duration: 0.8, repeat: Infinity }}
                                                >
                                                    <IoMdSend className="text-lg" />
                                                </motion.span>
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </form>

                <div className="mt-4 text-center text-gray-600 text-sm">
                    Already have an account? <a href="#" className="text-[#10c1bb]  font-sans font-medium tracking-wide">Login</a>
                </div>

                <div className="my-2 text-center text-gray-600 text-sm">Or sign up with</div>
                <SocialButton/>
            </div>
        </div>
    );
}