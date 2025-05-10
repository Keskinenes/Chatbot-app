import { Link } from 'react-router-dom';

export default function ErrorPage() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="text-center p-6 bg-white rounded shadow-md">
                <h2 className="text-4xl font-bold text-red-600 mb-4">404</h2>
                <p className="text-lg text-gray-700 mb-4">Sayfa Bulunamadı</p>
                <p className="text-sm text-gray-500 mb-6">Aradığınız sayfa mevcut değil. Lütfen URL'yi kontrol edin.</p>
                <Link
                    to="/"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
                >
                    Anasayfaya Dön
                </Link>
            </div>
        </div>
    );
}
