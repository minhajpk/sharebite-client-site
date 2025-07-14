import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/axiosSecure';
import Swal from 'sweetalert2';

const AddDonation = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append('image', imageFile);

      // Upload image to imgbb
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api_key}`,
        formData
      );

      if (!imgRes.data.success) {
        return toast.error('Image upload failed');
      }

      const imageUrl = imgRes.data.data.display_url;

      const donation = {
        title: data.title,
        type: data.type,
        quantity: data.quantity,
        pickupTime: data.pickupTime,
        restaurantName: user?.displayName || 'Unknown',
        restaurantEmail: user?.email,
        location: data.location,
        image: imageUrl,
        status: 'Pending',
        createdAt: new Date(),
      };

      const res = await axiosSecure.post('/donations', donation);

      if (res.data.insertedId) {
        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your Food has been Successfully Donated",
                            showConfirmButton: false,
                            timer: 2000
                        });
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error('Submission failed');
    }
  };

  return (
    <div className='max-w-7xl'>
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Donation</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Donation Title</label>
          <input
            {...register('title', { required: true })}
            className="input input-bordered w-full"
            placeholder="Surplus Pastries"
          />
          {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Food Type</label>
          <input
            {...register('type', { required: true })}
            className="input input-bordered w-full"
            placeholder="Bakery / Produce / Etc."
          />
          {errors.type && <span className="text-red-500 text-sm">Food type is required</span>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            {...register('quantity', { required: true })}
            className="input input-bordered w-full"
            placeholder="10 kg / 25 portions"
          />
          {errors.quantity && <span className="text-red-500 text-sm">Quantity is required</span>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Pickup Time Window</label>
          <input
            {...register('pickupTime', { required: true })}
            className="input input-bordered w-full"
            placeholder="3 PM - 6 PM"
          />
          {errors.pickupTime && <span className="text-red-500 text-sm">Pickup time is required</span>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Restaurant Name</label>
          <input
            value={user?.displayName || ''}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Restaurant Email</label>
          <input
            value={user?.email || ''}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            {...register('location', { required: true })}
            className="input input-bordered w-full"
            placeholder="123 Main St, Dhaka"
          />
          {errors.location && <span className="text-red-500 text-sm">Location is required</span>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            {...register('image', { required: true })}
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
          {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
        </div>

        <button
          type="submit"
          className="btn bg-[#0e606e] w-full text-white hover:scale-105 transition duration-300 hover:bg-[#0e606e]"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Add Donation'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddDonation;
