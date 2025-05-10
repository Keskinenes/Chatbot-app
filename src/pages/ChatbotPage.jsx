
import React, { useState, useRef, useEffect } from "react";
import { CiLight, CiDark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { fetchMessages } from "../api";

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [allData, setAllData] = useState([]);
    const bottomRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDarkMode]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn"); // Giriş bilgisi temizlenir
        navigate("/"); // Login sayfasına yönlendirilir
    };
    useEffect(() => {
        const loadMessages = async () => {
            const data = await fetchMessages();
            setAllData(data);
        };
        loadMessages();
    }, []);
    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim() === "") return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        const matchedMessage = allData.find(
            (msg, index, arr) =>
                msg.sender === "user" &&
                msg.text.toLowerCase() === input.toLowerCase() &&
                arr[index + 1]?.sender === "bot"
        );

        let botMessage = "Üzgünüm, bunu anlamadım.";
        if (matchedMessage) {
            const botResponse = allData.find(
                (msg) => msg.id === (parseInt(matchedMessage.id) + 1).toString() && msg.sender === "bot"
            );
            if (botResponse) {
                botMessage = botResponse.text;
            }
        }

        const botMessageObj = { sender: "bot", text: botMessage };
        setMessages((prev) => [...prev, botMessageObj]);
    };
    useEffect(() => {
        if (allData.length > 0) {
            const initialMessage = allData.find((msg) => msg.id === "1"); // id'si 1 olan mesajı buluyoruz
            if (initialMessage) {
                setMessages((prevMessages) => {
                    // Eğer mesaj zaten eklenmişse, tekrar eklemiyoruz
                    if (!prevMessages.some((msg) => msg.id === initialMessage.id)) {
                        return [...prevMessages, initialMessage];
                    }
                    return prevMessages;
                });
            }
        }
    }, [allData]); // allData değiştiğinde çalışacak
    return (
            <div className="min-h-screen flex items-center justify-center bg-gray-300 dark:bg-gray-900 dark:border transition-colors">
                <div className=" absolute top-1 right-2 ">
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600"
                    >
                        Çıkış Yap
                    </button>
                </div>
                <div className="border max-w-2xl w-full p-5 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold text-center dark:text-white">CHATBOT</h1>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2 text-4xl rounded cursor-pointer ${isDarkMode ? "bg-transparent text-white" : "bg-transparent text-black"}`}
                        >
                            {isDarkMode ? <CiLight /> : <CiDark />}
                        </button>
                    </div>

                    <div className="space-y-4 overflow-y-auto max-h-80 mb-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-lg max-w-full break-words ${msg.sender === "user"
                                        ? "bg-neutral-900 text-white dark:bg-gray-600"
                                        : "bg-gray-100 dark:bg-gray-300 dark:text-black"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    <form onSubmit={handleSend} className="flex items-center">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white resize-none break-words"
                            placeholder="Mesajınızı yazın..."
                        />
                        <button
                            type="submit"
                            className="ml-2 p-2 w-[200px] cursor-pointer bg-neutral-900 text-white dark:bg-gray-600 rounded-lg"
                        >
                            Gönder
                        </button>

                    </form>
                </div>
            </div>
    );
}

export default App;