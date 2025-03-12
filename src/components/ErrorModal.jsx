import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useEffect } from "react";

const ErrorModal = ({ errors, onClose }) => {
    if (!errors || Object.keys(errors).length === 0) return null;

    // Auto close modal after 5 seconds
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white/30 dark:bg-gray-900/80 text-gray-900 dark:text-gray-200 rounded-3xl shadow-2xl p-6 max-w-md w-full border border-gray-300 dark:border-gray-700 relative"
                initial={{ y: -50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -50, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-all"
                >
                    <XCircle size={28} />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
                    🚨 Errors Detected!
                </h2>

                {/* Error List */}
                <ul className="space-y-3">
                    {Object.keys(errors).map((key) => (
                        <li
                            key={key}
                            className="flex items-center space-x-3 bg-red-200/50 dark:bg-red-900/50 p-3 rounded-lg"
                        >
                            <XCircle size={22} className="text-red-500" />
                            <span className="text-red-700 dark:text-red-300 font-medium">
                                {errors[key]}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="mt-6 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium px-6 py-3 rounded-xl w-full transition-all"
                >
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
};

export default ErrorModal;
