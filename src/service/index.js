import axios from 'axios';

export const fetchImages = async (query) => {
  try {
    let response;
    
    if (query) {
      // Fetch images based on the search query
      response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: query, 
          per_page: 10, 
          page: 1, 
        },
        headers: {
          Authorization: `Client-ID Hk8XVFWGFbGSITJvQ_1LHNJZBr8FgQ_mX3tKhpx_eM4`,
        },
      });
    } else {
      // Fetch random images if no query is provided
      response = await axios.get('https://api.unsplash.com/photos', {
        params: {
            per_page: 40,
        },
        headers: {
          Authorization: `Client-ID Hk8XVFWGFbGSITJvQ_1LHNJZBr8FgQ_mX3tKhpx_eM4`,
        },
      });
    }

    return response.data.results || response.data; // Return the fetched images

  } catch (error) {
    // Handle rate limit error specifically
    if (error.response && error.response.status === 403) {
      console.error('Rate limit exceeded. Please wait before making more requests.');
    } else {
      console.error('Error fetching images from Unsplash:', error);
    }
    return []; // Return an empty array to avoid breaking the UI
  }
};
// Hk8XVFWGFbGSITJvQ_1LHNJZBr8FgQ_mX3tKhpx_eM4
