import { useState } from "react";
import { useNavigate } from "react-router";

const DUMMY_USER = {
    email: "admin@admin.com",
    password: "admin",
}

export default function LoginPage() {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    // Kullanıcı girişi kontrol ediliyor
    const handleLogin = (e) => {
        e.preventDefault()
        if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
            localStorage.setItem("isLoggedIn", "true")
            navigate('/chatbot')
        }
        else {
            setError("E-posta veya Şifre yanlış")
        }
    }

    return (
        <div className="flex flex-row border min-h-screen">
            <div className="border-r flex w-1/2 items-center justify-center bg-gray-200">
                <form
                    onSubmit={handleLogin}
                    className="flex flex-col p-8 bg-white rounded-2xl shadow-md w-80 hover:scale-105 transition-all duration-300">
                    <h2 className="text-center font-bold text-2xl mb-5">GİRİŞ YAP</h2>
                    <input
                        type="email"
                        placeholder="E-posta"
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-5 border p-2 w-full" />
                    <input
                        type="password"
                        placeholder="Şifre"
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-5 border p-2 w-full" />
                    {
                        error && <p className="text-red-500 text-center text-sm mb-2">{error}</p>
                    }
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 w-full rounded cursor-pointer">
                        Giriş yap
                    </button>
                </form>
            </div>
            <div className="flex w-1/2 items-center justify-center">
                <img src="./src/assets/chatbot.png" alt="ChatbotLogo" className="w-60" />
            </div>
        </div>
    )
}
