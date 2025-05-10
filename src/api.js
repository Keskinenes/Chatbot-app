

const API_URL = "https://681f23b872e59f922ef55613.mockapi.io/message";

export const fetchMessages = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Veri alınırken bir hata oluştu");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Hata:", error);
        throw error;
    }
};
