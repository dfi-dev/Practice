import {useCallback, useState} from "react";
import SocialButton from "../components/UI/SocialButton.jsx";
import LoginForm from "../components/Forms/LoginForm.jsx";
import {validateForm} from "../utils/validateForm.js";
import Modal from "../components/Modals/Modal.jsx";


const LoginPage = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [showModel, setShowModel] = useState(false);

    const handleLogin = useCallback(() => {
        const newErrors = validateForm(formData);
        if(Object.keys(newErrors).length > 0){
            setShowModel(true);

        }
        console.log("Current formData:", formData); // ✅ This will log the latest formData

        setIsPasswordCorrect(formData.username === "admin" && formData.password === "123");
    }, [formData]);

    const onClose = () => {
        setShowModel(false);
    }




    return (
        <div className="flex h-screen items-center justify-center p-4">
            <div className="w-full max-w-[400px] bg-[#ffe2e2] px-8 py-14 rounded-xl shadow-[10px_10px_20px_rgba(0,0,0,0.3)] flex flex-col">

            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Welcome Back</h2>
               <LoginForm
                   onSubmit={handleLogin}
                   formData={formData}
                   setFormData={setFormData}
                   isPasswordCorrect={isPasswordCorrect}
               />
                <div className="mt-4 text-center text-gray-600 text-sm">
                    Don't have an account? <a href="#" className="text-[#10c1bb] font-medium">Sign Up</a>
                </div>
                <div className="my-2 text-center text-gray-600 text-sm">Or login with</div>
                <SocialButton/>
            </div>
            {showModel && <Modal message="Validation Failed!" onClose={onClose}/>}
        </div>
    );
}
 export default LoginPage