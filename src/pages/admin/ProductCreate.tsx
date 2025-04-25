import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Trash, } from 'lucide-react';
import { useCreateProduct, useCategories, useSubcategories } from '../../lib/api/product';
import { ProductFormData, } from '../../types';

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  price: 0,
  discount_price: 0,
  discount_rate: 0,
  promo_code: '',
  is_promo_code_applicable: false,
  is_negotiable: false,
  is_hidden: false,
  is_archived: false,
  is_deleted: false,
  is_hot: false,
  is_featured: false,
  is_best_deal: false,
  is_top_rated: false,
  is_new_arrival: false,
  is_flash_sale: false,
  is_best_seller: false,
  variations: [],
  category: { name: '', description: '' },
  subcategory: { name: '', description: '', category: { name: '', description: '' } },
  image_files: [],
  remove_image_ids: [],
};

export const ProductCreate = () => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const createProduct = useCreateProduct();
  const { data: categories } = useCategories();
  const { data: subcategories } = useSubcategories(formData.category.name);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const navigate = useNavigate();

  // Handle Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  // Handle Checkbox Change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle Image Upload
  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const files = Array.from(e.target.files);
  //     setFormData((prev) => ({
  //       ...prev,
  //       image_files: [...prev.image_files, ...files],
  //     }));
  //     setPreviewImages((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  //   }
  // };

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
  
      setFormData((prev) => ({
        ...prev,
        image_files: [...prev.image_files, ...files], // Only store File objects
      }));
  
      // Store preview URLs separately
      setPreviewImages((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
    }
  };

  // const convertFileToUri = async (file: File): Promise<string> => {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result as string);
  //     reader.readAsDataURL(file);
  //   });
  // };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      const updatedImages = prev.image_files.filter((_, i) => i !== index);
      return { ...prev, image_files: updatedImages };
    });
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const availableSizes = ["XS", "S", "M", "XL", "XXL", "3XL"];
  const availableColors = [
    { name: "Purple", code: "#800080" },
    { name: "Gold", code: "#FFD700" },
    { name: "Gray", code: "#B0B0B0" },
    { name: "White", code: "#FFFFFF" },
    { name: "Orange", code: "#FFA500" },
    { name: "Green", code: "#008000" },
    { name: "Light Blue", code: "#87CEEB" },
    { name: "Red", code: "#FF6347" },
    { name: "Dark Blue", code: "#2C3E50" }
  ];

  // Handle size selection
  const handleSizeSelection = (size: string) => {
    setFormData((prev) => {
      const existingVariation = prev.variations.find(v => v.size === size);
      if (existingVariation) {
        return { ...prev, variations: prev.variations.filter(v => v.size !== size) };
      }
      return { ...prev, variations: [...prev.variations, { color: "", size, quantity: 1 }] };
    });
  };

  // Handle color selection
  const handleColorSelection = (color: string) => {
    setFormData((prev) => {
      const existingVariation = prev.variations.find(v => v.color === color);
      if (existingVariation) {
        return { ...prev, variations: prev.variations.filter(v => v.color !== color) };
      }
      return { ...prev, variations: prev.variations.map(v => ({ ...v, color })) };
    });
  };

  // Handle quantity input
  // const handleQuantityChange = (index: number, value: number) => {
  //   setFormData((prev) => {
  //     const updatedVariations = prev.variations.map((variation, i) =>
  //       i === index ? { ...variation, quantity: value } : variation
  //     );
  //     return { ...prev, variations: updatedVariations };
  //   });
  // };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createProduct.mutateAsync(formData);
      alert('Product created successfully!');
      navigate('/admin/products');
      setFormData(initialFormData);
      setPreviewImages([]);
    } catch (error) {
      console.error('Error creating product:', error);
      console.log(formData);
      alert('Failed to create product.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product Preview Section */}
        <div className="bg-white p-4 shadow rounded-lg col-span-1 sm:col-span-2 lg:col-span-1">
          {previewImages.length > 0 ? (
            <img src={previewImages[0]} alt="Preview" className="w-full h-64 object-cover rounded-md" />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
              No Image
            </div>
          )}
          <div className="flex gap-2 mt-2">
            {previewImages.slice(1).map((src, index) => (
              <div key={index} className="relative w-16 h-16 border rounded-md overflow-hidden">
                <img src={src} alt={`Preview ${index + 2}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => handleRemoveImage(index + 1)}
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <h2 className="mt-4 font-semibold">{formData.name || "Product Name"}</h2>
          <p className="text-lg font-bold">
            ${formData.price} <span className="text-sm text-red-500">({formData.discount_rate}% Off)</span>
          </p>
        </div>

        {/* Image Upload Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 border-2 border-dashed p-6 text-center rounded-lg">
          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600">Drag & drop images here or</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer text-orange-500">
            Click to browse
          </label>
        </div>

        {/* Product Information Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-3">
          {['name', 'price', 'discount_price', 'promo_code', 'quantity'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-2">{field.replace(/_/g, ' ')}</label>
              <input
                type={field.includes('price') ? 'number' : 'text'}
                name={field}
                value={formData[field as keyof ProductFormData] as string | number}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md capitalize"
              />
            </div>
          ))}
        </div>

        {/* Category and Subcategory Selection */}
        <div className="col-span-1 sm:col-span-2">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select name="category" value={formData.category.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
              <option value="">Select Category</option>
              {categories?.map((category: any) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subcategory</label>
            <select name="subcategory" value={formData.subcategory.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
              <option value="">Select Subcategory</option>
              {subcategories?.map((subcategory: any) => (
                <option key={subcategory.name} value={subcategory.name}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Variations */}
        <div className="col-span-3 flex flex-wrap gap-4">
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium mb-2">Size:</label>
            <div className="flex gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`px-3 py-1 rounded-md border ${formData.variations.some(v => v.size === size) ? "bg-blue-500 text-white" : "bg-gray-300"
                    }`}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium mb-2">Colors:</label>
            <div className="flex gap-2">
              {availableColors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 ${formData.variations.some(v => v.color === color.name) ? "border-blue-500" : "border-transparent"
                    }`}
                  style={{ backgroundColor: color.code }}
                  onClick={() => handleColorSelection(color.name)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Description as Textarea */}
        <div className="col-span-3">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter product description"
          />
        </div>

        {/* Boolean Fields as Checkboxes */}
        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'is_promo_code_applicable', 'is_negotiable', 'is_hidden', 'is_archived', 'is_deleted',
            'is_hot', 'is_featured', 'is_best_deal', 'is_top_rated', 'is_new_arrival', 'is_flash_sale', 'is_best_seller'
          ].map((field) => (
            <label key={field} className="flex items-center">
              <input
                type="checkbox"
                name={field}
                checked={formData[field as keyof ProductFormData] as boolean}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              {field.replace(/_/g, ' ')}
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <div className="col-span-3 flex justify-end">
          <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};