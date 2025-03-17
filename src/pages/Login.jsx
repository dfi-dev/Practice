import {useCallback, useMemo, useState} from "react";
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
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);


    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            if (prev[name] === value) return prev;
            return { ...prev, [name]: value };
        });
    }, []);


    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        setTimeout(() => {
            if(formData.username === "admin" && formData.password === "123") setIsPasswordCorrect(true);
        }, 3000);
    }, []);


    const lockIcon = useMemo(() => (
        isPasswordCorrect ? <FaUnlockKeyhole className="text-lg" /> : <FaLock className="text-lg" />
    ), [isPasswordCorrect]);


    return (
        <div className="flex h-screen items-center justify-center p-4">
            <div className="w-full max-w-[400px] bg-white p-6 rounded-xl shadow-lg flex flex-col py-16">

            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                    <InputField
                        name="username"
                        type="text"
                        placeholder="Username"
                        icon={<FaAt/>}
                        // value={formData.username}
                        onChange={handleChange}
                        shouldValidate={false}
                        onHover={[]}

                    />
                    <PasswordField
                        name="password"
                        // value={formData.password}
                        onChange={handleChange}
                        showPassword={showPassword}
                        togglePassword={() => setShowPassword((prev) => !prev)}
                        shouldValidate={false}
                        onHover={[]}
                    />
                    <motion.button
                        type="submit"
                        className="flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-[#10c1bb] text-white p-[9px] rounded-lg text-sm font-[500] gap-2"
                        whileHover={{ scale: 1.04 }}>
                        <motion.span
                            animate={
                                isPasswordCorrect
                                    ? { y: [0, -5, 0], rotate: [0, 15, -15, 0] }
                                    : { rotate: 0 }
                            }
                            transition={{ duration: 0.5, repeat: 0, repeatType: "reverse" }}>
                            {lockIcon}
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