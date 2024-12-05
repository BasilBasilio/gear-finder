import { useForm, SubmitHandler } from 'react-hook-form';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ListingData } from '../../ListingData';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../../firebaseConfig';
import { useRef, useState } from 'react';
import { useUserAuth } from '../../../../context/userAuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ReactQuill from 'react-quill';
import { useTranslation } from 'react-i18next';
import GooglePlacesAutocompleteComponent from '../GooglePlacesAutocompleteComponent';
import { toast } from 'sonner';

const ListingUpdateForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<ListingData>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const user = useUserAuth();
  const { objectId } = useParams();
  const [description, setDescription] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const getListingByListingId = async (objectId: string) => {
    try {
      const listingRef = doc(db, `listing/${objectId}`);
      const docSnap = await getDoc(listingRef);
      return docSnap.data() as ListingData;
    } catch (error) {
      console.error('Error fetching documents:', error);
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

  const updateListing = async (data: ListingData) => {
    const listingRef = doc(db, `listings/${objectId}`);
    toast.promise(
      () =>
        updateDoc(listingRef, {
          ...data,
          userId: user?.uid,
          createdAt: Timestamp.now(),
        }),
      {
        loading: 'Loading...',
        success: t('toast.updated'),
        error: t('toast.error'),
      },
    );
    navigate('/');
  };

  const handleProcedureContentChange = (description: string) => {
    setDescription(description);
  };

  const { data: listing } = useQuery({
    queryFn: () => getListingByListingId(objectId || ''),
    queryKey: ['listing', 'byListingId', objectId],
  });

  const onSubmit: SubmitHandler<ListingData> = async data => {
    const files = fileInputRef.current?.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const imageUrls = await uploadFiles(fileArray);
      await updateListing({ ...data, imageUrls });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {t('listing.update')}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="instrument"
          >
            {t('listing.instrument')}
          </label>
          <select
            {...register('instrumentType')}
            id="instrument"
            name="instrument"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="" disabled>
              {t('listing.selectInstrument')}
            </option>
            <option value="electricGuitar">
              {t('listing.electricGuitar')}
            </option>
            <option value="acousticGuitar">
              {t('listing.acousticGuitar')}
            </option>
            <option value="bass">{t('listing.bass')}</option>
            <option value="drum">{t('listing.drum')}</option>
            <option value="guitarPedal">{t('listing.guitarPedal')}</option>
            <option value="guitarAmp">{t('listing.guitarAmp')}</option>
            <option value="bassAmp">{t('listing.bassAmp')}</option>
            <option value="guitarCabinet">{t('listing.guitarCabinet')}</option>
            <option value="bassCabinet">{t('listing.bassCabinet')}</option>
            <option value="synth">{t('listing.synth')}</option>
          </select>
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="model"
          >
            {t('listing.model')}
          </label>
          <input
            {...register('model')}
            type="text"
            id="model"
            name="model"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder={listing?.model}
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="rentalPrice"
          >
            {t('listing.rentprice')}
          </label>
          <input
            {...register('rentalPrice')}
            type="number"
            id="rentalPrice"
            name="rentalPrice"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder={`${listing?.rentalPrice}€/Day`}
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="condition"
          >
            {t('listing.condition')}
          </label>
          <select
            {...register('condition')}
            id="condition"
            name="condition"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="" disabled>
              {listing?.condition}
            </option>
            <option value="new">{t('listing.new')}</option>
            <option value="good">{t('listing.good')}</option>
            <option value="used">{t('listing.used')}</option>
          </select>
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="delivery"
          >
            {t('listing.delivery')}
          </label>
          <GooglePlacesAutocompleteComponent setValue={setValue} />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="deliveryMethod"
          >
            {t('listing.deliverymethod')}
          </label>
          <select
            {...register('deliveryMethod')}
            id="deliveryMethod"
            name="deliveryMethod"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="" disabled>
              {listing?.deliveryMethod}
            </option>
            <option value="pickup">{t('listing.collection')}</option>
            <option value="delivery">{t('listing.homedelivery')}</option>
            <option value="shipping">{t('listing.shipping')}</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-gray-700 font-medium mb-2"
          >
            {t('listing.image')}
          </label>
          <input
            type="file"
            id="image"
            ref={fileInputRef}
            multiple
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleFileChange}
            placeholder={listing?.imageUrls?.[0]}
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
            {t('listing.description')}
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
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700"
          >
            {t('listing.updateListing')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingUpdateForm;
