// import React, { useState } from "react";
// import { RxCross2 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const VerifyOtpModel = ({ verifyOtp, setVerifyOtp, formData }) => {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [verificationStatus, setVerificationStatus] = useState(""); // To hold verification status message
//   const navigate = useNavigate();

//   const handleChange = (e, index) => {
//     const { value } = e.target;
//     if (isNaN(value)) return; // Only allow numeric input

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Move to the next input box if the current box is filled
//     if (value && index < 3) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     console.log("Entered OTP:", otp.join(""));

//     try {
//       const response = await axios.post('/api/users/verification', 
//         { otp: otp.join(""), ...formData }, 
//         {
//           headers: {
//             "Content-Type": "application/json", // Adjust if sending multipart/form-data
//           },
//         }
//       );

//       if (response.status === 200) {
//         console.log("Verification successful");
//         setVerificationStatus("Verification successful! Redirecting...");
//         setTimeout(() => {
//           setVerifyOtp(false);
//           navigate("/admin/dashboard"); // Redirect to the dashboard or another protected route
//         }, 2000); // Wait for 2 seconds before redirecting to show the message
//       } else {
//         setVerificationStatus("Verification failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during verification:", error);
//       setVerificationStatus("An error occurred. Please try again.");
//     }

//     // Reset the OTP input fields
//     setOtp(["", "", "", ""]);
//   };

//   return (
//     <div className="flex flex-col items-center md:top-52 top-64 border absolute bg-gray-100">
//       <div className="bg-white border shadow-md rounded-lg p-6 w-full max-w-sm relative">
//         <h2 className="text-2xl font-semibold text-center mb-4">Verify OTP</h2>
//         <RxCross2 className="absolute cursor-pointer right-5 top-5" onClick={() => setVerifyOtp(!verifyOtp)} />
//         <p className="text-center text-gray-700 mb-6">
//           We have sent a 4-digit OTP to your registered mobile number.
//         </p>
//         <form className="space-y-4 w-full" onSubmit={handleVerifyOtp}>
//           <div className="flex justify-between">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 id={`otp-${index}`}
//                 type="text"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleChange(e, index)}
//                 className="w-12 h-12 text-center text-xl border border-gray-300 p-2 rounded-lg"
//               />
//             ))}
//           </div>
//           <button
//             type="submit"
//             className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             Verify OTP
//           </button>
//           <div className="text-center mt-4">
//             {verificationStatus && <p className="text-blue-600">{verificationStatus}</p>}
//             <a href="#" className="text-blue-600">
//               Resend OTP
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtpModel;
