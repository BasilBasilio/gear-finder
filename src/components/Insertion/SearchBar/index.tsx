import { useState } from 'react';
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
    <div>
      <input
        type="text"
        className="rounded-sm mt-1"
        value={query}
        placeholder="Search insertions..."
        onChange={e => {
          setQuery(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
