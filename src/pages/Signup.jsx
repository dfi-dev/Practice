import {useCallback, useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaVenusMars, FaAt, FaCalendarAlt, FaLock, FaCheckCircle, FaHourglassEnd} from "react-icons/fa";
import {MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight} from "react-icons/md";
import validateField from "../utils/validateField.js";
import InputField from "../components/InputField.jsx";
import PasswordField from "../components/PasswordField.jsx";
import SelectField from "../components/SelectField.jsx";
import {validateForm} from "../utils/validateForm.js";
import SocialButton from "../components/SocialButton.jsx";
import StepTracker from "../components/StepTracker.jsx";


export default function Signup() {
    const formInitialState = useMemo(() => ({
        fullName: "", username: "", email: "", phone: "",
        password: "", confirmPassword: "", dob: "", gender: "", address: "", bloodGroup: ""
    }), []);

    const [formData, setFormData] = useState(formInitialState);
    const [step, setStep] = useState(1);
    const [showWait, setShowCheck] = useState(false);
    const [showCheck, setStartAnimation] = useState(false);
    const [errors, setErrors] = useState({});
    const [hoveredField, setHoveredField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        if(name === "password"){
            console.log(`value of ${name} is ${value}`)
            console.log(`and value of confirmPassword is ${formData.confirmPassword}`)
        }if(name === "confirmPassword"){
            console.log(`value of ${name} is ${value}`)
            console.log(formData.password)
        }

        setFormData((prev) => {
            if (prev[name] === value) return prev; // Avoid unnecessary state updates
            const updatedForm = { ...prev, [name]: value };

            // If password changes, revalidate confirmPassword
            if (name === "password" && updatedForm.confirmPassword) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword: updatedForm.confirmPassword !== value ? "Passwords do not match" : "",
                }));
            }

            return updatedForm;
        });

        setErrors((prevErrors) => {
            if (!value.length) {
                const { [name]: _, ...rest } = prevErrors; // Remove error when input is empty
                return rest;
            }

            return {
                ...prevErrors,
                ...(name === "confirmPassword"
                    ? { confirmPassword: value !== e.target.form.password.value ? "Passwords do not match" : "" }
                    : { [name]: validateField(name, value, formData) }),
            };
        });
    }, []);




    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setShowCheck(true);
        setTimeout(() => setStartAnimation(true), 1000);
    }, [formData]);


    useEffect(() => {
        if (showWait) {
            const resetTimeout = setTimeout(() => {
                setShowCheck(false);
                setStartAnimation(false);
                // setStep(1);
                // setFormData(formInitialState);
            }, 3000);
            return () => clearTimeout(resetTimeout);
        }
    }, [showWait, formInitialState]);


    const handleNext = useCallback(() => setStep((prev) => prev + 1), []);
    const handlePrev = useCallback(() => setStep((prev) => prev - 1), []);


    return (
        <div className="flex h-screen items-center justify-center p-4">
            <div
                className="w-full max-w-[400px] bg-[#ffe2e2]  px-8 py-14 rounded-xl shadow-[10px_10px_20px_rgba(0,0,0,0.3)] flex flex-col">
                {/* Step Indicator */}
                <StepTracker step={step}/>

                <div className="flex justify-between items-center mb-8">
                    <h2 className=" font-bold text-sm text-gray-700 text-center w-full flex items-center justify-center gap-2 uppercase">
                        {step === 1 ? "Create Your Account" : step === 2 ? "Personal Information" : "Contact Details"}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: step === 1 ? -50 : 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: step === 1 ? -50 : 50, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="space-y-3"
                    >
                        {step === 1 && (
                            <>
                                <InputField
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    icon={<FaAt/>}
                                    value={formData.username}
                                    onChange={handleChange}
                                    error={errors.username}
                                    onHover={[hoveredField, setHoveredField]}
                                />

                                <PasswordField
                                    name="password"
                                    placeholder={"Password"}
                                    icon= {<FaLock/>}
                                    value={formData.password}
                                    onChange={handleChange}
                                    showPassword={showPassword}  // Pass current state
                                    togglePassword={() => setShowPassword((prev) => !prev)} // Toggle function
                                    error={errors.password}
                                    onHover={[hoveredField, setHoveredField]}
                                />

                                <PasswordField
                                    name="confirmPassword"
                                    placeholder={"Confirm Password"}
                                    icon = {<FaCheckCircle />}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    showPassword={showPassword}  // Pass current state
                                    togglePassword={() => setShowPassword((prev) => !prev)} // Toggle function
                                    error={errors.confirmPassword}
                                    onHover={[hoveredField, setHoveredField]}
                                />


                                <div className="relative">
                                    <motion.button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex items-center justify-center w-full bg-[#12b9b3] text-white p-[9px] rounded-lg hover:bg-[#10c1bb] text-sm font-[500] gap-1"
                                        whileHover={{scale: 1.04}}
                                    >
                                        Next
                                        <motion.span
                                            animate={{x: [0, 4, 0]}} // Moves forward and comes back
                                            transition={{duration: 0.8, repeat: Infinity}}
                                        ><MdOutlineKeyboardDoubleArrowRight className="text-lg"/></motion.span>
                                    </motion.button>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <InputField
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    icon={<FaUser/>}
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    error={errors.fullName}
                                    onHover={[hoveredField, setHoveredField]}
                                />

                                <InputField
                                    type="date"
                                    name="dob"
                                    placeholder="Date of Birth"
                                    icon={<FaCalendarAlt/>}
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

                                <SelectField
                                    name="gender"
                                    icon={<FaVenusMars/>}
                                    value={formData.gender}
                                    onChange={handleChange}
                                    onHover={[hoveredField, setHoveredField]}
                                    error={errors.gender}
                                    options={[
                                        {value: "", label: "Select Gender"},
                                        {value: "male", label: "Male"},
                                        {value: "female", label: "Female"},
                                        {value: "other", label: "Other"},
                                    ]}
                                    required
                                />

                                <div className="relative flex w-full gap-4">
                                    <motion.button
                                        type="button"
                                        onClick={handlePrev} // Assuming one is a "Previous" button
                                        className="flex items-center justify-center w-full bg-[#12b9b3] text-white p-[9px] rounded-lg hover:bg-[#10c1bb] text-sm font-[500] gap-1"
                                        whileHover={{ scale: 1.04 }}
                                    >
                                        <motion.span
                                            animate={{x: [0, 4, 0]}} // Moves forward and comes back
                                            transition={{duration: 0.8, repeat: Infinity}}
                                        ><MdOutlineKeyboardDoubleArrowLeft className="text-lg mr-[4px]"/></motion.span>
                                        Prev
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex items-center justify-center w-full bg-[#12b9b3] text-white p-[9px] rounded-lg hover:bg-[#10c1bb] text-sm font-[500] gap-1"
                                        whileHover={{ scale: 1.04 }}
                                    >
                                        Next
                                        <motion.span
                                            animate={{ x: [0, 4, 0] }} // Moves forward and comes back
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                        >
                                            <MdOutlineKeyboardDoubleArrowRight className="text-lg" />
                                        </motion.span>
                                    </motion.button>
                                </div>

                            </>
                        )}

                        {step === 3 && (
                            <>
                                <InputField
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    icon={<FaEnvelope/>}
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    onHover={[hoveredField, setHoveredField]}
                                />

                                <InputField
                                    name="phone" type="phone"
                                    placeholder="Phone"
                                    icon={<FaPhone/>}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={errors.phone}
                                    onHover={[hoveredField, setHoveredField]}
                                />
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

                                <div className="relative flex w-full gap-4">
                                    <motion.button
                                        type="button"
                                        onClick={handlePrev} // Assuming one is a "Previous" button
                                        className="flex items-center justify-center w-1/2 bg-[#12b9b3] text-white p-[9px] rounded-lg hover:bg-[#10c1bb] text-sm font-[500] gap-1"
                                        whileHover={{ scale: 1.04 }}
                                    >
                                        <motion.span
                                            animate={{x: [0, 4, 0]}} // Moves forward and comes back
                                            transition={{duration: 0.8, repeat: Infinity}}
                                        ><MdOutlineKeyboardDoubleArrowLeft className="text-lg mr-[4px]"/></motion.span>
                                        Prev
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="flex items-center justify-center w-1/2 bg-[#12b9b3] text-white p-[9px] rounded-lg hover:bg-[#10c1bb] text-sm font-[500] gap-1"
                                        whileHover={{scale: 1.04}}
                                        disabled={showWait} // Disable button during animation
                                    >
                                        {showCheck ? (
                                            <>
                                                <motion.svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <motion.path
                                                        d="M4 16L12 26L28 6"
                                                        stroke="white"
                                                        strokeWidth="5" /* Increased thickness */
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        initial={{ pathLength: 0, strokeWidth: 2 }}
                                                        animate={{ pathLength: 1, strokeWidth: [2, 5, 4] }} /* Dynamic stroke effect */
                                                        transition={{ duration: 1.2, ease: "easeInOut" }}
                                                    />
                                                </motion.svg>

                                            </>
                                        ) : showWait ? (
                                            <span className="text-white text-lg"><FaHourglassEnd /></span>
                                        ) : (
                                            <>
                                                Submit
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </form>

                <div className="mt-4 text-center text-gray-600 text-sm">
                    Already have an account? <a href="#"
                                                className="text-[#10c1bb]  font-sans font-medium tracking-wide">Login</a>
                </div>

                <div className="my-2 text-center text-gray-600 text-sm">Or sign up with</div>
                <SocialButton/>
            </div>
        </div>
    );
}