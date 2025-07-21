// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { Upload, X, ArrowLeft } from 'lucide-react';
// import { useCreateProduct, useProduct, useUpdateProduct } from '../../lib/hooks/useVendorQueries';

// const productSchema = z.object({
//   name: z.string().min(1, 'Product name is required'),
//   description: z.string().min(1, 'Description is required'),
//   price: z.number().min(0, 'Price must be positive'),
//   discount: z.number().min(0).max(100).optional(),
//   stock: z.number().min(0, 'Stock must be positive'),
//   category: z.string().min(1, 'Category is required'),
//   brand: z.string().min(1, 'Brand is required'),
//   weight: z.string().optional(),
//   gender: z.string().min(1, 'Gender is required'),
//   sizes: z.array(z.string()).optional(),
//   colors: z.array(z.string()).optional(),
//   tagNumber: z.string().min(1, 'Tag number is required'),
// });

// type ProductFormData = z.infer<typeof productSchema>;

// const ProductForm = () => {
//   const { storeId, productId } = useParams<{ storeId: string; productId?: string }>();
//   const navigate = useNavigate();
//   const [selectedImages, setSelectedImages] = useState<string[]>([]);
//   const [dragActive, setDragActive] = useState(false);

//   const isEdit = !!productId;
//   const { data: product, isLoading } = useProduct(storeId!, productId!, { enabled: isEdit });
//   const createProductMutation = useCreateProduct();
//   const updateProductMutation = useUpdateProduct();

//   const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
//     // resolver: zodResolver(productSchema),
//   });

//   const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
//   const availableColors = [
//     { name: 'Black', value: '#000000' },
//     { name: 'White', value: '#FFFFFF' },
//     { name: 'Gray', value: '#808080' },
//     { name: 'Orange', value: '#FFA500' },
//     { name: 'Green', value: '#008000' },
//     { name: 'Red', value: '#FF0000' },
//     { name: 'Blue', value: '#0000FF' },
//     { name: 'Purple', value: '#800080' },
//   ];

//   const watchedSizes = watch('sizes', []);
//   const watchedColors = watch('colors', []);

//   // useEffect(() => {
//   //   if (isEdit && product?.data) {
//   //     const productData = product.data;
//   //     setValue('name', productData.name);
//   //     setValue('description', productData.description);
//   //     setValue('price', productData.price);
//   //     setValue('discount', productData.discount);
//   //     setValue('stock', productData.stock);
//   //     setValue('category', productData.category);
//   //     setValue('brand', productData.brand);
//   //     setValue('weight', productData.weight);
//   //     setValue('gender', productData.gender);
//   //     setValue('sizes', productData.sizes);
//   //     setValue('colors', productData.colors);
//   //     setValue('tagNumber', productData.tagNumber);
//   //     setSelectedImages(productData.images);
//   //   }
//   // }, [product, setValue, isEdit]);

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(e.type === 'dragenter' || e.type === 'dragover');
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFiles(e.dataTransfer.files);
//     }
//   };

//   const handleFiles = (files: FileList) => {
//     Array.from(files).forEach(file => {
//       if (file.type.startsWith('image/')) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           if (e.target?.result) {
//             setSelectedImages(prev => [...prev, e.target!.result as string]);
//           }
//         };
//         reader.readAsDataURL(file);
//       }
//     });
//   };

//   const toggleSize = (size: string) => {
//     const currentSizes = watchedSizes || [];
//     const newSizes = currentSizes.includes(size)
//       ? currentSizes.filter(s => s !== size)
//       : [...currentSizes, size];
//     setValue('sizes', newSizes);
//   };

//   const toggleColor = (color: string) => {
//     const currentColors = watchedColors || [];
//     const newColors = currentColors.includes(color)
//       ? currentColors.filter(c => c !== color)
//       : [...currentColors, color];
//     setValue('colors', newColors);
//   };

//   const onSubmit = async (data: ProductFormData) => {
//     try {
//       if (isEdit) {
//         await updateProductMutation.mutateAsync({
//           storeId: storeId!,
//           productId: productId!,
//           data: { ...data, id: productId! }
//         });
//       } else {
//         // await createProductMutation.mutateAsync({
//         //   storeId: storeId!,
//         //   data: { ...data}
//         // });
//       }
//       navigate(`/vendor/stores/${storeId}/products`);
//     } catch (error) {
//       console.error('Error saving product:', error);
//     }
//   };

//   if (isEdit && isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="border-b border-gray-200 px-6 py-4">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => navigate(`/vendor/stores/${storeId}/products`)}
//               className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <ArrowLeft className="h-5 w-5" />
//             </button>
//             <h2 className="text-lg font-semibold text-gray-900">
//               {isEdit ? 'Edit Product' : 'Create Product'}
//             </h2>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
//                 <input
//                   {...register('name')}
//                   type="text"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter product name"
//                 />
//                 {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                   <select
//                     {...register('category')}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Fashion">Fashion</option>
//                     <option value="Electronics">Electronics</option>
//                     <option value="Home">Home</option>
//                     <option value="Sports">Sports</option>
//                   </select>
//                   {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
//                   <select
//                     {...register('gender')}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Men">Men</option>
//                     <option value="Women">Women</option>
//                     <option value="Unisex">Unisex</option>
//                   </select>
//                   {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
//                   <input
//                     {...register('brand')}
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Brand name"
//                   />
//                   {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
//                   <input
//                     {...register('weight')}
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="e.g., 300gm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
//                 <div className="flex flex-wrap gap-2">
//                   {availableSizes.map((size) => (
//                     <button
//                       key={size}
//                       type="button"
//                       onClick={() => toggleSize(size)}
//                       className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                         watchedSizes?.includes(size)
//                           ? 'bg-blue-500 text-white'
//                           : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
//                 <div className="flex flex-wrap gap-2">
//                   {availableColors.map((color) => (
//                     <button
//                       key={color.name}
//                       type="button"
//                       onClick={() => toggleColor(color.name)}
//                       className={`w-8 h-8 rounded-full border-2 transition-all ${
//                         watchedColors?.includes(color.name)
//                           ? 'border-blue-500 scale-110'
//                           : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                       style={{ backgroundColor: color.value }}
//                       title={color.name}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                 <textarea
//                   {...register('description')}
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Product description"
//                 />
//                 {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
//               </div>

//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
//                   <input
//                     {...register('price', { valueAsNumber: true })}
//                     type="number"
//                     step="0.01"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="0.00"
//                   />
//                   {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
//                   <input
//                     {...register('discount', { valueAsNumber: true })}
//                     type="number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="0"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
//                   <input
//                     {...register('stock', { valueAsNumber: true })}
//                     type="number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="0"
//                   />
//                   {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Tag Number</label>
//                 <input
//                   {...register('tagNumber')}
//                   type="text"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Product tag number"
//                 />
//                 {errors.tagNumber && <p className="text-red-500 text-sm mt-1">{errors.tagNumber.message}</p>}
//               </div>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
//                 <div
//                   className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//                     dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
//                   }`}
//                   onDragEnter={handleDrag}
//                   onDragLeave={handleDrag}
//                   onDragOver={handleDrag}
//                   onDrop={handleDrop}
//                 >
//                   <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-sm text-gray-600 mb-2">
//                     Drop your images here, or{' '}
//                     <label className="text-blue-500 cursor-pointer">
//                       click to browse
//                       <input
//                         type="file"
//                         multiple
//                         accept="image/*"
//                         onChange={(e) => e.target.files && handleFiles(e.target.files)}
//                         className="hidden"
//                       />
//                     </label>
//                   </p>
//                   <p className="text-xs text-gray-500">PNG, JPG and GIF files are allowed</p>
//                 </div>

//                 {selectedImages.length > 0 && (
//                   <div className="grid grid-cols-2 gap-4 mt-4">
//                     {selectedImages.map((image, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={image}
//                           alt={`Product ${index + 1}`}
//                           className="w-full h-32 object-cover rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
//                           className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//                         >
//                           <X className="h-4 w-4" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={() => navigate(`/vendor/stores/${storeId}/products`)}
//               className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={createProductMutation.isPending || updateProductMutation.isPending}
//               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
//             >
//               {createProductMutation.isPending || updateProductMutation.isPending 
//                 ? 'Saving...' 
//                 : isEdit ? 'Update Product' : 'Create Product'
//               }
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;

import React, { useState } from 'react';
import { Upload, Trash, X } from 'lucide-react';
import { useCategories, useSubcategories, useCreateProduct } from '../../lib/api/product';

// Types
interface ProductVariation {
  color: string;
  size: string;
  quantity: number;
}

interface CreateProductData {
  name: any;
  description: string;
  price: number;
  discount: number;
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
  category: string;
  subcategory: string;
  category_id: number;
  subcategory_id: number;
  brand: string;
  stock: number;
  variations: ProductVariation[];
  images: string[];
  image_files: File[];
}

const initialFormData: CreateProductData = {
  name: '',
  description: '',
  price: 0,
  discount: 0,
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
  category: '',
  subcategory: '',
  category_id: 0,
  subcategory_id: 0,
  brand: '',
  stock: 0,
  variations: [],
  images: [],
  image_files: [],
};

const ProductForm = ({ storeId }: { storeId: string }) => {
  const [formData, setFormData] = useState<CreateProductData>(initialFormData);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { data: categories } = useCategories();
  const { data: subcategories } = useSubcategories(formData.category.name);
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

  // Fix: Add null check for subcategories
  const filteredSubcategories = subcategories?.filter((sub: { category_id: number; }) => sub.category_id === formData.category_id) || [];

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(e.target.value);
    const selectedCategory = categories?.find((cat: { id: number; }) => cat.id === categoryId);
    setFormData(prev => ({
      ...prev,
      category_id: categoryId,
      category: selectedCategory?.name || '',
      subcategory_id: 0,
      subcategory: ''
    }));
  };

  // Handle subcategory change
  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subcategoryId = Number(e.target.value);
    const selectedSubcategory = filteredSubcategories.find((sub: { id: number; }) => sub.id === subcategoryId);
    setFormData(prev => ({
      ...prev,
      subcategory_id: subcategoryId,
      subcategory: selectedSubcategory?.name || ''
    }));
  };

  // Handle basic input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        image_files: [...prev.image_files, ...files],
      }));
      setPreviewImages(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
    }
  };

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      image_files: prev.image_files.filter((_, i) => i !== index),
    }));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  // Handle size selection
  const handleSizeSelection = (size: string) => {
    setFormData(prev => {
      const existingVariation = prev.variations.find(v => v.size === size);
      if (existingVariation) {
        return {
          ...prev,
          variations: prev.variations.filter(v => v.size !== size)
        };
      }
      return {
        ...prev,
        variations: [...prev.variations, { color: "", size, quantity: 1 }]
      };
    });
  };

  // Handle color selection for variations
  const handleColorSelection = (color: string, variationIndex: number) => {
    setFormData(prev => ({
      ...prev,
      variations: prev.variations.map((variation, index) =>
        index === variationIndex ? { ...variation, color } : variation
      )
    }));
  };

  // Handle quantity change
  const handleQuantityChange = (index: number, quantity: number) => {
    setFormData(prev => ({
      ...prev,
      variations: prev.variations.map((variation, i) =>
        i === index ? { ...variation, quantity } : variation
      )
    }));
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
    if (formData.category_id === 0) newErrors.category_id = 'Category is required';
    if (formData.subcategory_id === 0) newErrors.subcategory_id = 'Subcategory is required';
    if (formData.image_files.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the data for API submission
      const submitData = {
        ...formData,
        // Convert File objects to base64 or handle as needed by your API
        images: formData.image_files.map(file => file.name), // Adjust based on your API requirements
      };

      await createProductMutation.mutateAsync({
        // storeId, 
        data: submitData
      });

      alert('Product created successfully!');

      // Reset form
      setFormData(initialFormData);
      setPreviewImages([]);

    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
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
                    Discount
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                  {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter brand name"
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
                  <select name="subcategory" value={formData.subcategory.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
                    <option value="">Select Subcategory</option>
                    {subcategories?.map((subcategory: any) => (
                      <option key={subcategory.name} value={subcategory.name}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
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
                          className={`px-3 py-1 rounded-md border text-sm font-medium ${formData.variations.some(v => v.size === size)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.variations.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium">Configure Variations:</h4>
                      {formData.variations.map((variation, index) => (
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
                  )}
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
                    setFormData(initialFormData);
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

