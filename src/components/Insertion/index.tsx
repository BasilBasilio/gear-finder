import { useForm, SubmitHandler } from 'react-hook-form';
import { InsertionData } from '../interfaces';

const Insertion: React.FC = () => {
  const { register, handleSubmit } = useForm<InsertionData>();
  const onSubmit: SubmitHandler<InsertionData> = data => console.log(data);

  // const addInsertion = async () => {
  //   const db = getDatabase(app);
  //   const newInsertionRef = push(ref(db, 'Insertion'));

  //   try {
  //     await set(newInsertionRef, insertionData);
  //     alert('Insertion saved successfully');
  //   } catch (error) {
  //     console.error('Error: ', error);
  //   }
  // };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create new insertion
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="instrumentType"
          >
            Instrument type
          </label>
          <input
            {...register('instrumentType')}
            type="text"
            id="instrumentType"
            name="instrumentType"
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
            {...register('model')}
            type="text"
            id="model"
            name="model"
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
            {...register('rentalPrice')}
            type="number"
            id="rentalPrice"
            name="rentalPrice"
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
            {...register('condition')}
            id="condition"
            name="condition"
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
            {...register('images')}
            type="file"
            id="images"
            name="images"
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
            {...register('location')}
            type="text"
            id="location"
            name="location"
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
            {...register('deliveryMethod')}
            id="deliveryMethod"
            name="deliveryMethod"
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
            {...register('notes')}
            id="notes"
            name="notes"
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