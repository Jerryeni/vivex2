import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Upload } from 'lucide-react';

interface CategoryFormData {
  name: string;
  createdBy: string;
  stock: string;
  tagId: string;
  description: string;
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
}

export const CategoryEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: 'Fashion Men, Women & Kid\'s',
    createdBy: 'Seller',
    stock: '46233',
    tagId: 'FS16276',
    description: 'Astra Fashion has store again captivated fashion enthusiasts with its latest collection, seamlessly blending elegance with comfort in a range of exquisite designs.',
    metaTitle: 'Fashion Brand',
    metaKeyword: 'Fashion',
    metaDescription: 'Type description'
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">CATEGORY EDIT</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Thumbnail Preview */}
          <div className="col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="aspect-w-1 aspect-h-1 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
                  alt="Category thumbnail"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="text-sm">
                <div className="flex justify-between mb-2">
                  <span>Created By</span>
                  <span>{formData.createdBy}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stock</span>
                  <span>{formData.stock}</span>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <button type="button" className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  Delete Category
                </button>
                <button type="button" className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Update
                </button>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="font-semibold mb-6">Add Thumbnail Photo</h2>
              <div 
                className={`mb-6 border-2 border-dashed rounded-lg p-8 text-center ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Drop your images here, or{' '}
                  <button type="button" className="text-orange-500 hover:text-orange-600">
                    click to browse
                  </button>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="font-semibold">General Information</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category Title
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Created By
                    </label>
                    <select
                      name="createdBy"
                      value={formData.createdBy}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Seller">Seller</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="text"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tag ID
                    </label>
                    <input
                      type="text"
                      name="tagId"
                      value={formData.tagId}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <h2 className="font-semibold pt-4">Meta Options</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Keyword
                    </label>
                    <input
                      type="text"
                      name="metaKeyword"
                      value={formData.metaKeyword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};