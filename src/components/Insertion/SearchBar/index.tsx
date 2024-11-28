import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate(`/results?query=${query}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative">
        <input
          type="text"
          className="w-full p-3 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={query}
          placeholder="Search insertions..."
          onChange={e => {
            setQuery(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
};

export default SearchBar;
