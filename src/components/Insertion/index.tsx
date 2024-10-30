import { useState } from 'react';
import { getDatabase, ref, set, push } from 'firebase/database';
import app from '../../firebaseConfig';

const Insertion: React.FC = () => {
  const [insertionData, setInsertionData] = useState({
    instrumentType: '',
    model: '',
    description: '',
    rentalPrice: '',
    condition: '',
    location: '',
    deliveryMethod: '',
    notes: '',
    images: null as FileList | null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setInsertionData({ ...insertionData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setInsertionData({ ...insertionData, images: e.target.files });
    }
  };

  const addInsertion = async () => {
    const db = getDatabase(app);
    const newInsertionRef = push(ref(db, 'Insertion'));

    try {
      await set(newInsertionRef, insertionData);
      alert('Insertion saved successfully');
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInsertion();
    console.log('Form data: ', insertionData);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create new insertion
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="instrumentType"
          >
            Instrument type
          </label>
          <input
            type="text"
            id="instrumentType"
            name="instrumentType"
            value={insertionData.instrumentType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="model"
          >
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={insertionData.model}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="rentalPrice"
          >
            Rent price (€)
          </label>
          <input
            type="number"
            id="rentalPrice"
            name="rentalPrice"
            value={insertionData.rentalPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="condition"
          >
            Instrument condition
          </label>
          <select
            id="condition"
            name="condition"
            value={insertionData.condition}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="" disabled>
              Seleziona...
            </option>
            <option value="new">Brand new</option>
            <option value="good">Good</option>
            <option value="used">Used with marks</option>
          </select>
        </div>

        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="images"
          >
            Instrument photo(s)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md p-2"
            multiple
            accept="image/*"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="location"
          >
            Pickup/delivery location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={insertionData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="deliveryMethod"
          >
            Delivery method
          </label>
          <select
            id="deliveryMethod"
            name="deliveryMethod"
            value={insertionData.deliveryMethod}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="pickup">Collection on site</option>
            <option value="delivery">Home delivery</option>
            <option value="shipping">Shipping</option>
          </select>
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="notes"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={insertionData.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={3}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
        >
          Save insertion
        </button>
      </form>
    </div>
  );
};

export default Insertion;
