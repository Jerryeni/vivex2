
import React, { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useCategories, useSubcategoriesByCategory } from '../../lib/api/product';
import { useCreateProduct } from '../../lib/hooks/useVendorQueries';
import { useParams } from 'react-router-dom';

// Types
interface ProductVariation {
  color: string;
  size: string;
  quantity: number;
}

interface CreateProductData {
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  discount_rate?: number;
  promo_code?: string;
  is_promo_code_applicable: boolean;
  is_negotiable: boolean;
  is_hidden: boolean;
  is_archived: boolean;
  is_deleted: boolean;
  is_hot: boolean;
  is_featured: boolean;
  is_best_deal: boolean;
  is_top_rated: boolean;
  is_new_arrival: boolean;
  is_flash_sale: boolean;
  is_best_seller: boolean;
  category_id: number;
  subcategory_id: number;
  variations: string[]; // Array of JSON strings as expected by backend
  images: string[];
}

const initialFormData: CreateProductData = {
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
  category_id: 0,
  subcategory_id: 0,
  variations: [],
  images: [],
};

const ProductForm = () => {
  const { storeId: storeIdParam } = useParams<{ storeId: string }>();
  const storeId = Number(storeIdParam);
  const [formData, setFormData] = useState<CreateProductData>(initialFormData);
  const [variations, setVariations] = useState<ProductVariation[]>([]); // Separate state for UI
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Store actual File objects
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { data: categories } = useCategories();
  const { data: subcategories } = useSubcategoriesByCategory(formData.category_id);
  const createProductMutation = useCreateProduct();

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
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

  const filteredSubcategories = subcategories?.filter((sub: { category_id: number; }) => sub.category_id === formData.category_id) || [];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(e.target.value);
    setFormData(prev => ({
      ...prev,
      category_id: categoryId,
      subcategory_id: 0,
    }));
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subcategoryId = Number(e.target.value);
    setFormData(prev => ({
      ...prev,
      subcategory_id: subcategoryId,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Store actual File objects
      setImageFiles(prev => [...prev, ...files]);

      // Create preview URLs
      const previewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...previewUrls]);
    }
  };

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    // Clean up the preview URL
    URL.revokeObjectURL(previewImages[index]);

    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  // Size selection
  const handleSizeSelection = (size: string) => {
    setVariations(prev => {
      const existingIndex = prev.findIndex(v => v.size === size);

      if (existingIndex >= 0) {
        return prev.filter((_, i) => i !== existingIndex);
      }

      const newVariation: ProductVariation = {
        color: '',
        size,
        quantity: 1
      };

      return [...prev, newVariation];
    });
  };

  // Color selection
  const handleColorSelection = (color: string, index: number) => {
    setVariations(prev => {
      const updatedVariations = [...prev];
      updatedVariations[index] = {
        ...updatedVariations[index],
        color
      };
      return updatedVariations;
    });
  };

  // Quantity change
  const handleQuantityChange = (index: number, quantity: number) => {
    setVariations(prev => {
      const updatedVariations = [...prev];
      updatedVariations[index] = {
        ...updatedVariations[index],
        quantity
      };
      return updatedVariations;
    });
  };

  useEffect(() => {
    if (isNaN(storeId)) {
      console.error('Invalid storeId in URL');
      alert('Invalid storeId in URL');
    }
  }, [storeId]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.category_id === 0) newErrors.category_id = 'Category is required';
    if (formData.subcategory_id === 0) newErrors.subcategory_id = 'Subcategory is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (imageFiles.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    if (variations.length === 0) {
      alert('Please add at least one variation');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for multipart/form-data submission
      const submissionFormData = new FormData();
      
      // Add all form fields
      submissionFormData.append('name', formData.name);
      submissionFormData.append('description', formData.description);
      submissionFormData.append('price', formData.price.toString());
      submissionFormData.append('discount_price', (formData.discount_price || 0).toString());
      submissionFormData.append('discount_rate', (formData.discount_rate || 0).toString());
      submissionFormData.append('promo_code', formData.promo_code || '');
      submissionFormData.append('is_promo_code_applicable', formData.is_promo_code_applicable.toString());
      submissionFormData.append('is_negotiable', formData.is_negotiable.toString());
      submissionFormData.append('is_hidden', formData.is_hidden.toString());
      submissionFormData.append('is_archived', formData.is_archived.toString());
      submissionFormData.append('is_deleted', formData.is_deleted.toString());
      submissionFormData.append('is_hot', formData.is_hot.toString());
      submissionFormData.append('is_featured', formData.is_featured.toString());
      submissionFormData.append('is_best_deal', formData.is_best_deal.toString());
      submissionFormData.append('is_top_rated', formData.is_top_rated.toString());
      submissionFormData.append('is_new_arrival', formData.is_new_arrival.toString());
      submissionFormData.append('is_flash_sale', formData.is_flash_sale.toString());
      submissionFormData.append('is_best_seller', formData.is_best_seller.toString());
      submissionFormData.append('category_id', formData.category_id.toString());
      submissionFormData.append('subcategory_id', formData.subcategory_id.toString());
      
      // Add actual file objects for images
      imageFiles.forEach((file, index) => {
        submissionFormData.append('images', file);
      });

      // Add each variation separately with the same key 'variations'
      variations.forEach(variation => {
        submissionFormData.append('variations', JSON.stringify({
          color: variation.color,
          size: variation.size,
          quantity: variation.quantity
        }));
      });

      console.log('Submitting variations:', variations);
      console.log('Submitting files:', imageFiles);

      // You'll need to update your useCreateProduct hook to handle FormData
      await createProductMutation.mutateAsync({
        storeId,
        data: submissionFormData
      });

      alert('Product created successfully!');
      setFormData(initialFormData);
      setVariations([]);
      setImageFiles([]);
      setPreviewImages([]);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Preview Section */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Product Preview</h3>
                {previewImages.length > 0 ? (
                  <div className="space-y-4">
                    <img
                      src={previewImages[0]}
                      alt="Main preview"
                      className="w-full h-64 object-cover rounded-md border"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      {previewImages.slice(1).map((src, index) => (
                        <div key={index} className="relative">
                          <img
                            src={src}
                            alt={`Preview ${index + 2}`}
                            className="w-full h-20 object-cover rounded-md border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index + 1)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="mt-4">
                  <h4 className="font-semibold text-lg">{formData.name || "Product Name"}</h4>
                  <p className="text-xl font-bold text-green-600">
                    ${formData.price || 0}
                  </p>
                  {variations.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        {variations.length} variation{variations.length > 1 ? 's' : ''} available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">Drag & drop images here or</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Click to browse
                  </label>
                </div>
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Price
                  </label>
                  <input
                    type="number"
                    name="discount_price"
                    value={formData.discount_price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Rate
                  </label>
                  <input
                    type="number"
                    name="discount_rate"
                    value={formData.discount_rate}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleCategoryChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Select Category</option>
                    {categories?.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subcategory</label>
                  <select
                    name="subcategory_id"
                    value={formData.subcategory_id}
                    onChange={handleSubcategoryChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Select Subcategory</option>
                    {subcategories?.map((subcategory: any) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                  {errors.subcategory_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.subcategory_id}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    name="promo_code"
                    value={formData.promo_code}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter promo code"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_promo_code_applicable"
                    checked={formData.is_promo_code_applicable}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">
                    Promo Code Applicable
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Product Variations */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Variations</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map(size => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeSelection(size)}
                          className={`px-3 py-1 rounded-md border text-sm font-medium ${variations.some(v => v.size === size)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {variations.map((variation, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
                      <div className="flex-shrink-0">
                        <span className="text-sm font-medium">Size: {variation.size}</span>
                      </div>

                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Color</label>
                        <div className="flex gap-1">
                          {availableColors.map(color => (
                            <button
                              key={color.name}
                              type="button"
                              onClick={() => handleColorSelection(color.name, index)}
                              className={`w-6 h-6 rounded-full border-2 ${variation.color === color.name
                                ? 'border-blue-500 ring-2 ring-blue-200'
                                : 'border-gray-300'
                                }`}
                              style={{ backgroundColor: color.code }}
                              title={color.name}
                            />
                          ))}
                        </div>
                        {variation.color && (
                          <span className="text-xs text-gray-600 mt-1 block">
                            Selected: {variation.color}
                          </span>
                        )}
                      </div>

                      <div className="flex-shrink-0">
                        <label className="block text-xs text-gray-600 mb-1">Quantity</label>
                        <input
                          type="number"
                          value={variation.quantity}
                          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                          min="1"
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Flags */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Flags</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'is_negotiable', 'is_hidden', 'is_archived', 'is_deleted',
                    'is_hot', 'is_featured', 'is_best_deal', 'is_top_rated',
                    'is_new_arrival', 'is_flash_sale', 'is_best_seller'
                  ].map(field => (
                    <label key={field} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name={field}
                        checked={formData[field as keyof CreateProductData] as boolean}
                        onChange={handleCheckboxChange}
                        className="rounded"
                      />
                      <span className="text-sm font-medium">
                        {field.replace(/_/g, ' ').replace('is ', '')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    previewImages.forEach(url => URL.revokeObjectURL(url));
                    setFormData(initialFormData);
                    setVariations([]);
                    setImageFiles([]);
                    setPreviewImages([]);
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || createProductMutation.isPending}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || createProductMutation.isPending ? 'Creating...' : 'Create Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Edit, Trash2, Eye, Plus, ArrowLeft } from 'lucide-react';
// import { useDeleteProduct, useStoreProducts } from '../../lib/hooks/useVendorQueries';

// interface Product {
//   id: string;
//   name: string;
//   brand?: string;
//   category?: string | { name: string };
//   price: number;
//   stock: number;
//   isActive: boolean;
//   // Add other product properties as needed
// }

// const ProductsList = () => {
//   const { storeId } = useParams<{ storeId: string }>();
//   const { data: products, isLoading } = useStoreProducts(storeId!);
//   const deleteProductMutation = useDeleteProduct();

//   const handleDelete = async (productId: string) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await deleteProductMutation.mutateAsync({ storeId: storeId!, productId });
//       } catch (error) {
//         console.error('Error deleting product:', error);
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <Link
//             to="/vendor/stores"
//             className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <ArrowLeft className="h-5 w-5" />
//           </Link>
//           <h2 className="text-xl font-semibold text-gray-900">Store Products</h2>
//         </div>
//         <Link
//           to={`/vendor/stores/${storeId}/products/create`}
//           className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
//         >
//           <Plus className="h-4 w-4" />
//           <span>Add Product</span>
//         </Link>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Product
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Price
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Stock
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {products?.data?.data.map((product: Product) => (
//                 <tr key={product.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 bg-gray-300 rounded-lg mr-4"></div>
//                       <div>
//                         <div className="text-sm font-medium text-gray-900">{product.name}</div>
//                         <div className="text-sm text-gray-500">{product.brand || 'No brand'}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">
//                       {typeof product.category === 'object' 
//                         ? product.category?.name 
//                         : product.category || 'No category'}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{product.stock}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                       product.isActive
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-red-100 text-red-800'
//                     }`}>
//                       {product.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex items-center space-x-2">
//                       <button className="text-gray-400 hover:text-gray-600">
//                         <Eye className="h-4 w-4" />
//                       </button>
//                       <Link
//                         to={`/vendor/stores/${storeId}/products/${product.id}/edit`}
//                         className="text-orange-600 hover:text-orange-900"
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(product.id)}
//                         className="text-red-600 hover:text-red-900"
//                         disabled={deleteProductMutation.isPending}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {products?.data?.data.length === 0 && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 mb-4">No products found</div>
//           <Link
//             to={`/vendor/stores/${storeId}/products/create`}
//             className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
//           >
//             Add First Product
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductsList;