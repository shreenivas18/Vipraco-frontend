import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const Component = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const api = await import("../api");
            const response = await api.default.post("/auth/login", { email, password });
            const { token } = response.data.data;
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Login failed. Please try again.");
            }
        }
    };

    return (
        <div id="webcrumbs">
            <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-8 py-12">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                            <span className="material-symbols-outlined text-white text-2xl">smart_toy</span>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                            VipraCo
                        </h1>
                        <p className="text-gray-600 text-sm">Your Intelligent HR Assistant</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="flex">
                            <button
                                className="flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 bg-primary-500 text-white hover:bg-primary-600"
                                onClick={(e) => {
                                    document.getElementById("login-form").style.display = "block"
                                    document.getElementById("signup-form").style.display = "none"
                                    e.target.classList.add("bg-primary-500", "text-white")
                                    e.target.classList.remove("bg-gray-50", "text-gray-600")
                                    e.target.parentElement.children[1].classList.add("bg-gray-50", "text-gray-600")
                                    e.target.parentElement.children[1].classList.remove("bg-primary-500", "text-white")
                                }}
                            >
                                Login
                            </button>
                            <button
                                className="flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
                                onClick={(e) => {
                                    document.getElementById("signup-form").style.display = "block"
                                    document.getElementById("login-form").style.display = "none"
                                    e.target.classList.add("bg-primary-500", "text-white")
                                    e.target.classList.remove("bg-gray-50", "text-gray-600")
                                    e.target.parentElement.children[0].classList.add("bg-gray-50", "text-gray-600")
                                    e.target.parentElement.children[0].classList.remove("bg-primary-500", "text-white")
                                }}
                            >
                                Sign Up
                            </button>
                        </div>

                        <div id="login-form" className="p-8">
                            <form className="space-y-6" onSubmit={handleLogin}>
                                {error && (
                                    <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                                            mail
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                                            lock
                                        </span>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="current-password"
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                    </label>
                                    <a
                                        href="#"
                                        className="text-sm text-primary-500 hover:text-primary-600 transition-colors duration-300"
                                    >
                                        Forgot password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>

                        <div id="signup-form" className="p-8" style={{display: "none"}}>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                                                badge
                                            </span>
                                            <input
                                                type="text"
                                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 hover:shadow-sm bg-gray-50 focus:bg-white"
                                                placeholder="First name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                                                badge
                                            </span>
                                            <input
                                                type="text"
                                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 hover:shadow-sm bg-gray-50 focus:bg-white"
                                                placeholder="Last name"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                                            mail
                                        </span>
                                        <input
                                            type="email"
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 hover:shadow-sm bg-gray-50 focus:bg-white"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                                            lock
                                        </span>
                                        <input
                                            type="password"
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 hover:shadow-sm bg-gray-50 focus:bg-white"
                                            placeholder="Create a password"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                                            work
                                        </span>
                                        <details className="relative">
                                            <summary className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 hover:shadow-sm bg-gray-50 focus:bg-white cursor-pointer list-none">
                                                <span id="role-selected" className="text-gray-500">
                                                    Select your role
                                                </span>
                                                <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                    expand_more
                                                </span>
                                            </summary>
                                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 z-50">
                                                <div
                                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 rounded-t-xl"
                                                    onClick={(e) => {
                                                        document.getElementById("role-selected").textContent =
                                                            "Employee"
                                                        e.target.closest("details").open = false
                                                    }}
                                                >
                                                    Employee
                                                </div>
                                                <div
                                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                                                    onClick={(e) => {
                                                        document.getElementById("role-selected").textContent = "Manager"
                                                        e.target.closest("details").open = false
                                                    }}
                                                >
                                                    Manager
                                                </div>
                                                <div
                                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 rounded-b-xl"
                                                    onClick={(e) => {
                                                        document.getElementById("role-selected").textContent = "Admin"
                                                        e.target.closest("details").open = false
                                                    }}
                                                >
                                                    Admin
                                                </div>
                                            </div>
                                        </details>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Organization ID
                                    </label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                                            business
                                        </span>
                                        <input
                                            type="text"
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 hover:shadow-sm bg-gray-50 focus:bg-white"
                                            placeholder="Enter organization ID"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        I agree to the{" "}
                                        <a
                                            href="#"
                                            className="text-primary-500 hover:text-primary-600 transition-colors duration-300"
                                        >
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="#"
                                            className="text-primary-500 hover:text-primary-600 transition-colors duration-300"
                                        >
                                            Privacy Policy
                                        </a>
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    Create Account
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-500 text-sm">Secure • Multi-tenant • AI-powered HR assistance</p>
                        <div className="flex justify-center items-center mt-4 space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-500">24/7 Available</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="material-symbols-outlined text-gray-400 text-sm">security</span>
                                <span className="text-xs text-gray-500">Enterprise Security</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Next: "Add password strength indicator and real-time validation" */}
            </div>
        </div>
    )
}
