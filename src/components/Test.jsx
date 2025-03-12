import { useState } from "react";
import { motion } from "framer-motion"; // Import motion
import {
    FaGithub,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaMapMarkerAlt,
    FaVenusMars,
    FaTint,
    FaAt,
    FaCaretLeft,
    FaCalendarAlt,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

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
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-black p-4">
            {/*Parent*/}
            <div className="w-full max-w-[25rem] bg-green-600 p-8 rounded-2xl shadow-lg overflow-y-auto overflow-x-hidden">
                {/*first Child*/}
                <div className="my-4 bg-red-400">
                    {step === 2 && (
                        <button
                            onClick={handleBack}
                            className="absolute left-0 text-gray-700 hover:text-gray-900 text-sm bg-amber-200 rounded-[6px]"
                        >
                            <FaCaretLeft className="w-5 h-5" />
                        </button>
                    )}
                    <h2 className="text-2xl font-bold text-gray-700 text-center w-full">
                        {step === 1 ? "Sign Up" : "Almost There!"}
                    </h2>
                </div>

                {/*Form is Second Child*/}
                <form onSubmit={handleSubmit} className="flex-grow flex items-center justify-center bg-amber-300">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: step === 1 ? -100 : 100 }} // Start off-screen
                        animate={{ opacity: 1, x: 0 }} // Move to center
                        exit={{ opacity: 0, x: step === 1 ? -100 : 100 }} // Exit off-screen
                        transition={{ duration: 0.5 }} // Animation duration
                        className="space-y-3"
                    >
                        {step === 1 && (
                            <>
                                {[
                                    { name: "fullName", placeholder: "Full Name", icon: <FaUser /> },
                                    { name: "username", placeholder: "Username", icon: <FaAt /> },
                                    { name: "email", placeholder: "Email", icon: <FaEnvelope /> },
                                    { name: "phone", placeholder: "Phone", icon: <FaPhone /> },
                                ].map((field, index) => (
                                    <div key={index} className="relative">
                                        <input
                                            type="text"
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            onChange={handleChange}
                                            className="w-full p-[9px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm pr-10"
                                            required
                                        />
                                        <span className="absolute right-3 top-2.5 text-gray-500">{field.icon}</span>
                                    </div>
                                ))}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="w-full bg-blue-500 text-white p-[9px] rounded-lg hover:bg-blue-600 text-sm mt-3"
                                    >
                                        Next
                                    </button>
                                </div>

                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        className="w-full p-[9px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm pr-10"
                                        style={{
                                            WebkitTextSecurity: showPassword ? "none" : "disc",
                                            appearance: "none",
                                        }}
                                        required
                                    />
                                    <span
                                        className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                                        onClick={formData.password.length > 0 ? togglePasswordVisibility : null}
                                    >
                                        {formData.password.length > 0 ? (showPassword ? <FaEyeSlash /> : <FaEye />) : <FaLock />}
                                    </span>
                                </div>

                                <div className="relative">
                                    <input
                                        type="date"
                                        name="dob"
                                        onChange={handleChange}
                                        className="w-full p-[9px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm appearance-none"
                                        style={{
                                            appearance: "none",
                                            WebkitAppearance: "none",
                                            MozAppearance: "none",
                                        }}
                                        required
                                    />
                                    <span className="absolute right-3 top-2.5 text-gray-500 pointer-events-none">
                                        <FaCalendarAlt />
                                    </span>
                                </div>

                                <div className="relative">
                                    <select
                                        name="gender"
                                        onChange={handleChange}
                                        className="w-full p-[9px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm appearance-none pr-10"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <span className="absolute right-3 top-2.5 text-gray-500">
                                        <FaVenusMars />
                                    </span>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        onChange={handleChange}
                                        className="w-full p-[9px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm pr-10"
                                        required
                                    />
                                    <span className="absolute right-3 top-2.5 text-gray-500">
                                        <FaMapMarkerAlt />
                                    </span>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        name="bloodGroup"
                                        placeholder="Blood Group (Optional)"
                                        onChange={handleChange}
                                        className="w-full p-[9px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm pr-10"
                                    />
                                    <span className="absolute right-3 top-2.5 text-gray-500">
                                        <FaTint />
                                    </span>
                                </div>

                                <div className="relative">
                                    <button type="submit" className="w-full bg-blue-500 text-white p-[9px] rounded-lg hover:bg-blue-600 text-sm my-3">
                                        Sign Up
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </form>

                {/*Third Child*/}
                <div className="my-4 text-center text-gray-600 text-[14px] bg-blue-500">
                    <div className="text-center text-gray-600 text-[14px]">
                        Already have an account? <a href="#" className="text-blue-500 text-[14px] font-[600]">Login</a>
                    </div>

                    <div className="mt-3 text-center text-gray-600 text-[14px]">Or With</div>
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
        </div>
    );
}