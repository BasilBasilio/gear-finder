import { Form } from 'react-router-dom';

const SearchBar: React.FC = () => {
  return (
    <Form action="/results">
      <input
        name="query"
        type="text"
        className="ml-4 rounded-sm"
        placeholder="Search insertions..."
      />
    </Form>
  );
};

export default SearchBar;
