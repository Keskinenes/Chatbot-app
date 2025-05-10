import { useState } from "react";
import chatbotLogo from "../assets/chatbot.png";
import { useNavigate } from "react-router-dom";

const DUMMY_USER = {
    email: "admin@admin.com",
    password: "admin",
};

export default function LoginPage({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
            localStorage.setItem("isLoggedIn", "true");
            navigate('/chatbot');
        } else {
            setError("E-posta veya şifre yanlış!");
        }
    }

    return (
        <div className="min-h-screen flex flex-row">
            <div className="w-1/2 flex items-center justify-center bg-gray-100 ">
                <form
                    onSubmit={handleLogin}
                    className="bg-white p-8 rounded-2xl shadow-md w-80 hover:scale-105 transition-all duration-300"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>
                    <input
                        type="email"
                        placeholder="E-posta"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full mb-3 "
                    />
                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full mb-3"
                    />
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 w-full rounded"
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>

            <div className="w-1/2 flex items-center justify-center ">
                <img src={chatbotLogo} alt="Logo" className="w-48" />
            </div>
        </div >
    );
}
