import { useEffect, useState } from 'react';
import ImageCard from '../components/ImageCard';
import { fetchImages } from '../service';
import LoginForm from '../components/LoginForm';

export default function HomePage() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userDetails = localStorage.getItem("details");
    
    if (userDetails) {
      setIsLoggedIn(true);
      fetchData();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchImages(searchQuery);
      if (res.length === 0) {
        setError('No images found or rate limit exceeded.');
      } else {
        setImages(res);
      }
    } catch (error) {
      console.log(error);
      setError('Failed to fetch images. Please try again later.');
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.search.value);
    fetchData();
  };

  

  return (
    <div className="p-4">
      {!isLoggedIn ? (
        <LoginForm setLogin={setIsLoggedIn}/>
      ) : (
        <>
          <header className="mb-4">
            <div className='flex flex-col gap-3 mb-4'>
              <span className="font-bold">Name: {JSON.parse(localStorage.getItem("details"))?.name}</span>
              <span className="font-bold">Email: {JSON.parse(localStorage.getItem("details"))?.email}</span>
            </div>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                name="search"
                placeholder="Enter search term..."
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Search</button>
            </form>
          </header>
          <main>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                  <ImageCard key={image.id} data={image} />
                ))}
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}
