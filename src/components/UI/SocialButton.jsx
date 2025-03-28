import {FaGithub} from "react-icons/fa";

const SocialButton = () => {
    return <div className="flex justify-center space-x-3 mt-3">
        {/* Github AnimatedButton */}
        <button className="group flex items-center justify-center bg-white text-black rounded-lg text-[14px] font-[500] px-3 py-2 w-fit transition-all duration-300 shadow-[0px_4px_10px_rgba(0,0,0,0.2),0px_6px_20px_rgba(0,0,0,0.15)] hover:shadow-[0px_6px_12px_rgba(0,0,0,0.25),0px_8px_25px_rgba(0,0,0,0.2)] active:shadow-[0px_2px_5px_rgba(0,0,0,0.2),0px_4px_10px_rgba(0,0,0,0.15)]">
            <FaGithub className="w-5 h-5" />
            <span className="ml-0 max-w-0 opacity-0 group-hover:opacity-100 group-hover:max-w-[80px] group-hover:ml-2 transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap">Github</span>
        </button>

        {/* Google AnimatedButton */}
        <button className="group flex items-center justify-center bg-white text-black rounded-lg text-[14px] font-[500] px-3 py-2 w-fit transition-all duration-300 shadow-[0px_4px_10px_rgba(0,0,0,0.2),0px_6px_20px_rgba(0,0,0,0.15)] hover:shadow-[0px_6px_12px_rgba(0,0,0,0.25),0px_8px_25px_rgba(0,0,0,0.2)] active:shadow-[0px_2px_5px_rgba(0,0,0,0.2),0px_4px_10px_rgba(0,0,0,0.15)]">
            <svg className="w-5 h-[17px]" xmlSpace="preserve" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z" style={{ fill: '#FBBB00' }} />
                <path d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" style={{ fill: '#518EF8' }} />
                <path d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" style={{ fill: '#28B446' }} />
                <path d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z" style={{ fill: '#F14336' }} />
            </svg>

            <span className="ml-0 max-w-0 opacity-0 group-hover:opacity-100 group-hover:max-w-[80px] group-hover:ml-2 transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap">Google</span>
        </button>
    </div>
}
export default SocialButton