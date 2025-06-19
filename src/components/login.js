import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

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
        organizationId: "TECHCORP_IN", // Default value from docs
    });
    const [signupError, setSignupError] = React.useState("");

    // --- API HANDLERS ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");
        try {
            const api = (await import("../api")).default;
            const response = await api.post("/auth/login", { email: loginEmail, password: loginPassword });
            const { token } = response.data.data;
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } catch (err) {
            const message = err.response?.data?.message || "Login failed. Please try again.";
            setLoginError(message);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setSignupError("");
        try {
            const api = (await import("../api")).default;
            const response = await api.post("/auth/signup", signupData);
            const { token } = response.data.data;
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } catch (err) {
            console.error("Signup Error Response:", err.response); // Detailed error logging
            if (err.response && err.response.status === 500) {
                setSignupError("A server error occurred. Please try again later.");
            } else {
                const message = err.response?.data?.message || "Signup failed. Please check your details.";
                setSignupError(message);
            }
        }
    };

    // --- UTILITY HANDLERS ---
    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    const handleRoleSelect = (role, e) => {
        setSignupData({ ...signupData, role: role.toLowerCase() });
        document.getElementById("role-selected").textContent = role;
        e.target.closest("details").open = false;
    };

    return (
        <div id="webcrumbs">
            <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-8 py-12">
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
                                className="flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 bg-primary-500 text-white hover:bg-primary-600"
                                onClick={(e) => {
                                    document.getElementById("login-form").style.display = "block";
                                    document.getElementById("signup-form").style.display = "none";
                                    e.target.classList.add("bg-primary-500", "text-white");
                                    e.target.classList.remove("bg-gray-50", "text-gray-600");
                                    e.target.nextElementSibling.classList.add("bg-gray-50", "text-gray-600");
                                    e.target.nextElementSibling.classList.remove("bg-primary-500", "text-white");
                                }}
                            >
                                Login
                            </button>
                            <button
                                className="flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
                                onClick={(e) => {
                                    document.getElementById("signup-form").style.display = "block";
                                    document.getElementById("login-form").style.display = "none";
                                    e.target.classList.add("bg-primary-500", "text-white");
                                    e.target.classList.remove("bg-gray-50", "text-gray-600");
                                    e.target.previousElementSibling.classList.add("bg-gray-50", "text-gray-600");
                                    e.target.previousElementSibling.classList.remove("bg-primary-500", "text-white");
                                }}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Login Form */}
                        <div id="login-form" className="p-8">
                            <form className="space-y-6" onSubmit={handleLogin}>
                                {loginError && <div className="text-red-500 text-center text-sm mb-4">{loginError}</div>}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <input
                                        type="password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-primary-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-600 hover:to-indigo-700">
                                    Sign In
                                </button>
                            </form>
                        </div>

                        {/* Signup Form */}
                        <div id="signup-form" className="p-8" style={{ display: "none" }}>
                            <form className="space-y-4" onSubmit={handleSignup}>
                                {signupError && <div className="text-red-500 text-center text-sm mb-4">{signupError}</div>}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    <details className="relative">
                                        <summary className="w-full px-4 py-3 border border-gray-200 rounded-xl cursor-pointer list-none flex justify-between items-center">
                                            <span id="role-selected" className="text-gray-700">Employee</span>
                                            <span className="material-symbols-outlined text-gray-400">expand_more</span>
                                        </summary>
                                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 z-50">
                                            {["Employee", "Manager", "Admin"].map(role => (
                                                <div key={role} className="px-4 py-3 hover:bg-gray-50 cursor-pointer" onClick={(e) => handleRoleSelect(role, e)}>
                                                    {role}
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization ID</label>
                                    <input type="text" name="organizationId" value={signupData.organizationId} onChange={handleSignupChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" placeholder="Enter organization ID" required />
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-primary-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-600 hover:to-indigo-700">
                                    Create Account
                                </button>
                            </form>
                        </div>

                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-500 text-sm">Secure • Multi-tenant • AI-powered HR assistance</p>
                    </div>
                </div>
            </div>
        </div>
    );
};