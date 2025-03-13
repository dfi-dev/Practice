import { useState } from "react";
import { motion } from "framer-motion";
import {FaAt, FaEnvelope, FaLock, FaLockOpen} from "react-icons/fa";
import InputField from "../components/InputField.jsx";
import PasswordField from "../components/PasswordField.jsx";
import {validateForm} from "../utils/validateForm.js";
import SocialButton from "../components/SocialButton.jsx";
import {HiLockOpen} from "react-icons/hi2";
import {FaUnlockKeyhole} from "react-icons/fa6";


const Login = () => {
    console.log("App rendered")
    const [hoveredField, setHoveredField] = useState(null);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setTimeout(() => {
            setIsPasswordCorrect(true)
        }, 1000);
        setTimeout(() => {
            setIsPasswordCorrect(false)
        }, 3000);
    };


    return (
        <div className="flex h-screen items-center justify-center p-4">
            <div className="w-full max-w-[400px] bg-[#ffe2e2] p-6 rounded-xl shadow-[10px_10px_20px_rgba(0,0,0,0.3)] flex flex-col py-16">
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <InputField
                        name="username"
                        type="text"
                        placeholder="Username"
                        icon={<FaAt/>}
                        value={formData.username}
                        onChange={handleChange}
                        error={errors.username}
                        shouldValidate={false}
                        onHover={[hoveredField, setHoveredField]}
                    />
                    <PasswordField
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        showPassword={showPassword}
                        togglePassword={() => setShowPassword((prev) => !prev)}
                        error={errors.password}
                        shouldValidate={false}
                        onHover={[hoveredField, setHoveredField]}
                    />
                    <motion.button
                        type="submit"
                        className="flex items-center justify-center w-full bg-[#12b9b3] text-white p-[9px] rounded-lg hover:bg-[#10c1bb] text-sm font-[500] gap-2"
                        whileHover={{ scale: 1.04 }}>
                        <motion.span
                            animate={
                                isPasswordCorrect
                                    ? { y: [0, -5, 0], rotate: [0, 15, -15, 0] } // Bouncing & rotating effect
                                    : { rotate: 0 }
                            }
                            transition={{ duration: 0.5, repeat: 0, repeatType: "reverse" }}>
                            {isPasswordCorrect ? < FaUnlockKeyhole  className="text-lg" /> : <FaLock className="text-lg" />}
                        </motion.span>
                    </motion.button>
                </form>
                <div className="mt-4 text-center text-gray-600 text-sm">
                    Don't have an account? <a href="#" className="text-[#10c1bb] font-medium">Sign Up</a>
                </div>
                <div className="my-2 text-center text-gray-600 text-sm">Or login with</div>
                <SocialButton/>
            </div>
        </div>
    );
}
 export default Login