import { Link } from "react-router"

export default function ErrorPage() {
    return (
        <div className='min-h-screen bg-gray-200 flex items-center justify-center'>
            <div className='border text-center  rounded shadow-lg bg-gray-300 p-5'>
                <h2 className='text-red-700 text-4xl font-bold mb-4'>404</h2>
                <p className='text-lg text-gray-500 mb-6'>Sayfa Bulunamadı</p>
                <p className='text-sm text-gray-500 mb-6'>Aradığınız sayfa mevcut değil. Lütfen URL'yi kontrol edin.</p>
                <Link to="/" className='border p-2 rounded text-2xl text-red-600'>
                    Anasayfaya Dön
                </Link>
            </div>
        </div>
    )
}