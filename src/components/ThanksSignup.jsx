import { FaCheckCircle, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ThanksSignup = () => {
    return (
        <div className="flex-1 p-52 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center mx-4"
            >
                <div className="flex justify-center mb-6">
                    <FaCheckCircle className="text-green-500 text-6xl" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for registering with our CPA network. Your account is currently pending approval. We will notify you once your account is approved.
                </p>
                <div className="flex items-center justify-center space-x-2">
                    <FaClock className="text-yellow-500 text-2xl" />
                    <span className="text-gray-700 font-medium">Pending Approval</span>
                </div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-8"
                >
                    <Link to={'/'}
                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                        
                    >
                        Okay, Got It!
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ThanksSignup;