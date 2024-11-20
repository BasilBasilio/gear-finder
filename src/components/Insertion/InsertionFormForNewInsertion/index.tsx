import { useForm, SubmitHandler } from 'react-hook-form';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { InsertionData } from './types';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, storage } from '../../../firebaseConfig';
import { useRef, useState } from 'react';
import { useUserAuth } from '../../../context/userAuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const InsertionForm: React.FC = () => {
  const { register, handleSubmit } = useForm<InsertionData>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const user = useUserAuth();
  const [description, setDescription] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'background',
    'align',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const names = Array.from(files).map(file => file.name);
      setFileNames(names);
    }
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(async file => {
      const storageRef = ref(storage, `images/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      } catch (error) {
        console.error('File upload failed: ', error);
        return null;
      }
    });
    const downloadUrls = await Promise.all(uploadPromises);
    return downloadUrls.filter((url): url is string => url !== null);
  };

  const handleProcedureContentChange = (description: string) => {
    setDescription(description);
  };

  const addInsertion = async (data: InsertionData) => {
    try {
      await addDoc(collection(db, 'insertions'), {
        ...data,
        description: description,
        userId: user?.uid,
        createdAt: Timestamp.now(),
      });
      alert('Insertion saved successfully');
    } catch (error) {
      console.error('Error: ', error);
    }
  };
  const onSubmit: SubmitHandler<InsertionData> = async data => {
    const files = fileInputRef.current?.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const imageUrls = await uploadFiles(fileArray);
      await addInsertion({ ...data, imageUrls });
    }
  };

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
            htmlFor="image"
            className="block text-gray-700 font-medium mb-2"
          >
            Insertion image
          </label>
          <input
            type="file"
            id="image"
            ref={fileInputRef}
            multiple
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleFileChange}
            required
          />
          {fileNames.length > 0 && (
            <ul className="mt-2 text-gray-600">
              {fileNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="notes"
          >
            Description
          </label>
          <ReactQuill
            className="h-56 pb-16"
            theme="snow"
            modules={modules}
            formats={formats}
            value={description}
            onChange={handleProcedureContentChange}
          />
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

export default InsertionForm;
