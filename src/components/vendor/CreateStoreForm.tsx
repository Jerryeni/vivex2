import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vendorApi } from '../../lib/api/vendor';
import { InputField } from '../ui/input-field';
import { Input } from '../ui/input';

type StoreFormData = {
  name: string;
  store_url_alias?: string;
  motor_quotes?: string;
  our_story?: string;
  our_mission?: string;
  address?: string;
  email?: string;
  phone_number: string;
  is_active?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  store_logo?: FileList;
};

const CreateStoreForm: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<StoreFormData>();

  const createStoreMutation = useMutation({
    mutationFn: (data: StoreFormData) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'store_logo' && value instanceof FileList && value.length > 0) {
          formData.append('store_logo', value[0]);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      return vendorApi.createStore(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'stores'] });
      navigate('/vendor/stores');
    },
  });

  const onSubmit = (data: StoreFormData) => {
    createStoreMutation.mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Store</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Logo */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">Store Logo</label>
            <input type="file" {...register('store_logo')} className="w-full border p-2 rounded" />
          </div>

          {/* Required Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Store Name</label>
            <Input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="form-input"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <Input
              type="text"
              {...register('phone_number', { required: 'Phone number is required' })}
              className="form-input"
            />
            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
          </div>

          {/* Optional Fields */}
          <InputField label="Store URL Alias" name="store_url_alias" register={register} />
          <InputField label="Motor Quotes" name="motor_quotes" register={register} />
          <InputField label="Our Story" name="our_story" register={register} />
          <InputField label="Our Mission" name="our_mission" register={register} />
          <InputField label="Address" name="address" register={register} />
          <InputField label="Email" name="email" register={register} />
          <InputField label="Facebook" name="facebook" register={register} />
          <InputField label="Instagram" name="instagram" register={register} />
          <InputField label="Twitter" name="twitter" register={register} />
          <InputField label="Whatsapp" name="whatsapp" register={register} />

          <div>
            <label className="block text-sm font-medium text-gray-700">Is Active</label>
            <select {...register('is_active')} className="form-select w-full p-2 border border-gray-300 rounded-md">
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="col-span-full flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/vendor/stores')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createStoreMutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {createStoreMutation.isPending ? 'Creating...' : 'Create Store'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateStoreForm;