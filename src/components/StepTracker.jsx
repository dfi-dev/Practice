import { motion } from "framer-motion";

const StepTracker = ({ step }) => {
    return (
        <div className="relative w-full flex flex-col items-center mb-4">
            {/* Progress Bar */}
            <ul className="relative flex justify-between items-center w-full font-montserrat mx-auto">
                {["Account Setup", "Personal Info", "Contact Details"].map((label, index) => (
                    <li key={index} className="relative flex-1 text-center uppercase font-medium">
                        {/* Connector Line */}
                        {index > 0 && (
                            <div className="absolute top-[24%] left-0 w-full h-[2px] bg-gray-300" style={{ left: "-50%" }}>
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-[#27AE60]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: step > index ? "100%" : "0%" }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                ></motion.div>
                            </div>
                        )}

                        {/* Step Circle */}
                        <motion.div
                            className={`relative z-10 w-5 h-5 flex items-center justify-center mx-auto text-white text-[10px] font-bold
                            ${step > index ? "bg-[#27AE60]" : "bg-gray-300"}`}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: step > index ? 1.1 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {index + 1}
                        </motion.div>

                        {/* Step Label */}
                        <span className="block mt-1 text-[10px] text-gray-700">{label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StepTracker;
