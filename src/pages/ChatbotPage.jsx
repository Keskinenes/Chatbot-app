import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { CiLight, CiDark } from "react-icons/ci";
import { fetchMessages } from "../api";

export default function ChatbotPage() {
    const [messages, setMessages] = useState([])
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [input, setInput] = useState("")
    const [allData, setAllData] = useState([]);

    const bottomRef = useRef(null);

    const navigate = useNavigate()

    // Oturum Kapatma 
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn")
        navigate("/")
    }

    //Dark modu ekleme çıkarma
    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDarkMode])

    // mesaj ekleyince en son mesaja gelicek scroll kaymayacak
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    //Apiden çektiğimiz verileri tutuyoruz 
    useEffect(() => {
        const loadMessages = async () => {
            const data = await fetchMessages();
            setAllData(data);
        };
        loadMessages();
    }, [])

    //Chatbot Soru ve cevap kısmı 
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
    }



    //Ekrana önce botun mesajını bırakmak için id'si 1 olanı buluyoruz onu ekrana eklıyoruz
    useEffect(() => {
        if (allData.length > 0) {
            const initialMessage = allData.find((msg) => msg.id === "1");
            if (initialMessage) {
                setMessages((prevMessages) => {
                    if (!prevMessages.some((msg) => msg.id === initialMessage.id)) {
                        return [...prevMessages, initialMessage];
                    }
                    return prevMessages;
                });
            }
        }
    }, [allData])

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200 dark:bg-gray-950">
            <div className=" absolute top-1 right-2 ">
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600"
                >
                    Çıkış Yap
                </button>
            </div>
            <div className="border max-w-2xl w-full items-center bg-gray-300 rounded-lg shadow-lg dark:bg-gray-800" >
                <div className="flex items-center justify-between mb-4 p-5">
                    <h1 className="text-2xl font-bold dark:text-white">CHATBOT</h1>
                    <button className="text-4xl cursor-pointer text-black dark:text-white"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                    >
                        {isDarkMode ? <CiLight /> : <CiDark />}
                    </button>
                </div>
                <div className="space-y-4 overflow-y-auto max-h-80 m-5">
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
                        className="p-2 w-full resize-none break-words bg-gray-200 m-5 rounded-xl dark:bg-gray-400"
                        placeholder="Mesajınızı yazın...."
                    />
                    <button
                        type="submit"
                        className="mr-2 p-2 w-[200px] cursor-pointer bg-gray-600 text-white dark:bg-gray-600 rounded-lg"
                    >
                        Gönder
                    </button>
                </form>
            </div>
        </div>
    );
}