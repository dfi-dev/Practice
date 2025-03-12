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
            <div className="w-full max-w-[400px] bg-white p-6 rounded-xl shadow-lg flex flex-col py-16"
                 style={{
                     background: "linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(145deg, #e81cff, #40c9ff) border-box",
                     border: "2px solid transparent",
                     borderRadius: "16px",
                     backgroundClip: "padding-box, border-box",
                 }}
            >
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
                                                Finish
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
                    Already have an account? <a href="#" className="text-[#10c1bb] font-semibold">Login</a>
                </div>

                <div className="mt-2 text-center text-gray-600 text-sm">Or sign up with</div>
                <div className="flex justify-center space-x-3 mt-2">
                    <button className="flex items-center px-6 py-2 bg-gray-200 text-gray-700 rounded-lg text-[14px] font-[500]">
                        <FaGithub className="w-5 h-5 mr-2" /> Github
                    </button>

                    <button className="flex items-center px-6 py-2 bg-gray-200 text-gray-700 rounded-lg text-[14px] font-[500]">
                        <svg className="w-5 h-[17px] mr-2" xmlSpace="preserve" style={{ enableBackground: 'new 0 0 512 512' }} viewBox="0 0 512 512" y="0px" x="0px" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Layer_1" width={20} version="1.1">
                            <path d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z" style={{ fill: '#FBBB00' }} />
                            <path d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" style={{ fill: '#518EF8' }} />
                            <path d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" style={{ fill: '#28B446' }} />
                            <path d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z" style={{ fill: '#F14336' }} />
                        </svg> Google
                    </button>
                </div>
            </div>
        </div>
    );
}