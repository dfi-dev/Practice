import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";;
import {PiSealCheckFill, PiSealWarningFill} from "react-icons/pi";

export default function PasswordField({ name, value, onChange, error, onHover, togglePassword, showPassword}) {
    const [hoveredField, setHoveredField] = onHover;

    return (
        <div className="relative">
            {error && hoveredField === name  && (
                <span className="absolute top-[-10px] left-[9px] bg-red-500 text-white text-[10px] py-[2px] px-2 rounded shadow-md">
                    {error}
                </span>
            )}
            <input
                type={showPassword ? "text" : "password"}
                name = {name}
                placeholder="Password"
                value={value}
                onChange={onChange}
                className="w-full py-[9px] px-[14px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10c1bb] text-sm pr-10"
            />
            <span
                className="absolute right-[20px] top-3 text-gray-500"
                onClick={() => value > 0 &&  togglePassword()}
                onMouseEnter={() => setHoveredField(name)}
                onMouseLeave={() => setHoveredField(null)}
            >
                {value > 0 ? (showPassword ? <FaEyeSlash /> : <FaEye />) : <FaLock />}
            </span>
            {error ? (
                <div className="absolute right-[6px] top-[6px]"
                     onMouseEnter={() => setHoveredField(name)}
                     onMouseLeave={() => setHoveredField(null)}>
                    <PiSealWarningFill className="w-[14px] h-[14px] text-red-500" />
                </div>
            ) : value && !error ? ( // Show success icon only if field has value and no error
                <PiSealCheckFill className="absolute right-[6px] top-[6px] w-[14px] h-[14px] text-green-500" />
            ) : null }
        </div>
    );
}
