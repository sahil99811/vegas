import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

export default function ImageCard({ data }) {
    const navigate = useNavigate();
    
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <img 
          src={data?.urls?.regular} 
          alt={data?.alt_description} 
          className="w-full h-48 object-cover" 
        />
        <div className="p-2">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full" 
            onClick={() => {
              navigate(`/editImage/${data?.id.toLowerCase()}`, {
                state: {
                  url: data.urls.small_s3
                }
              });
            }}
          >
            Add Caption
          </button>
        </div>
      </div>
    );
}

// PropTypes definition
ImageCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
      small_s3: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
  }).isRequired,
};
