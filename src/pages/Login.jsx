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
            <div className="w-full max-w-[400px] px-6 py-16 rounded-xl shadow-[10px_10px_20px_rgba(0,0,0,0.3)] flex flex-col relative overflow-hidden
    before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl before:top-[-20px] before:left-[-20px]
    after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-2xl after:bottom-[-20px] after:right-[-20px]">

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
                        className="flex items-center justify-center w-full bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white p-[9px] rounded-lg text-sm font-[500] gap-2"
                        whileHover={{ scale: 1.04 }}>
                        <motion.span
                            animate={
                                isPasswordCorrect
                                    ? { y: [0, -5, 0], rotate: [0, 15, -15, 0] } // Bouncing & rotating effect
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