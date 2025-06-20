import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Navbar from '../components2/Navbar/Navbar';


export const Component = () => {
    const navigate = useNavigate();

    // --- STATE MANAGEMENT ---
    // Login State
    const [loginEmail, setLoginEmail] = React.useState("");
    const [loginPassword, setLoginPassword] = React.useState("");
    const [loginError, setLoginError] = React.useState("");

    // Signup State
    const [signupData, setSignupData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "employee",
        organizationId: "", // Default value from docs
    });
    const [signupError, setSignupError] = React.useState("");
    const [activeTab, setActiveTab] = React.useState('login');
    const [isLoading, setIsLoading] = React.useState(false);

    // --- API HANDLERS ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");
        setIsLoading(true);
        try {
            const api = (await import("../api")).default;
            const response = await api.post("/auth/login", { email: loginEmail, password: loginPassword });
            const { token } = response.data.data;
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } catch (err) {
            const message = err.response?.data?.message || "Invalid credentials";
            window.alert(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setSignupError("");
        setIsLoading(true);
        try {
            const api = (await import("../api")).default;
            const response = await api.post("/auth/signup", signupData);
            const { token } = response.data.data;
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } catch (err) {
            console.error("Signup Error Response:", err.response); // Detailed error logging
            if (err.response && err.response.status === 500) {
                window.alert("A server error occurred. Please try again later.");
            } else {
                const message = err.response?.data?.message || "Signup failed. Please check your details.";
                window.alert(message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // --- UTILITY HANDLERS ---
    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Navbar showLoginButton={false} isLandingPage={false} />
            <div id="webcrumbs" className="page-with-navbar">
            <div className="w-full min-h-screen bg-gray-50 px-8 py-12">
                <div className="max-w-md mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                            <span className="material-symbols-outlined text-white text-2xl">smart_toy</span>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                            VipraCo
                        </h1>
                        <p className="text-gray-600 text-sm">Your Intelligent HR Assistant</p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        {/* Tabs */}
                        <div className="flex">
                            <button
                                className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 ${activeTab === 'login' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                onClick={() => setActiveTab('login')}
                            >
                                Login
                            </button>
                            <button
                                className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 ${activeTab === 'signup' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('signup')}
                            >
                                Signup
                            </button>
                        </div>

                        {/* Login Form */}
                        {activeTab === 'login' && (
                            <div id="login-form" className="p-8">
                                <form onSubmit={handleLogin} className="space-y-6">
                                    {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" placeholder="Enter your email" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" placeholder="Enter your password" required />
                                    </div>
                                    <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-primary-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-600 hover:to-indigo-700 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {isLoading ? 'Please wait...' : 'Login'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Signup Form */}
                        {activeTab === 'signup' && (
                            <div id="signup-form" className="p-8">
                                <form onSubmit={handleSignup} className="space-y-5">
                                    {signupError && <p className="text-red-500 text-sm">{signupError}</p>}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                            <input type="text" name="firstName" value={signupData.firstName} onChange={handleSignupChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" placeholder="First name" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                            <input type="text" name="lastName" value={signupData.lastName} onChange={handleSignupChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" placeholder="Last name" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input type="email" name="email" value={signupData.email} onChange={handleSignupChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" placeholder="Enter your email" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                        <input type="password" name="password" value={signupData.password} onChange={handleSignupChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" placeholder="Create a password" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                        <input type="text" name="role" id="role" value="Employee" readOnly className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Organization ID</label>
                                        <input type="text" name="organizationId" value={signupData.organizationId} onChange={handleSignupChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" placeholder="Enter organization ID" required />
                                    </div>
                                    <div style={{ marginTop: '24px' }}>
                                    <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-primary-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-600 hover:to-indigo-700 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {isLoading ? 'Please wait...' : 'Create Account'}
                                    </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-gray-500 text-sm">Secure • Multi-tenant • AI-powered HR assistance</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};