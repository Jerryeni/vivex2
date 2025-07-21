import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Upload, X } from 'lucide-react';
import { useProduct, useUpdateProduct } from '../../lib/hooks/useVendorQueries';
import { UpdateProductData } from '../../types/vendor';

const ProductEdit = () => {
  const { storeId, productId } = useParams<{ storeId: string; productId: string }>();
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const { data: product, isLoading } = useProduct(storeId!, productId!);
  const updateProductMutation = useUpdateProduct();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<UpdateProductData>();

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  const availableColors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Gray', value: '#808080' },
    { name: 'Orange', value: '#FFA500' },
    { name: 'Green', value: '#008000' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Purple', value: '#800080' },
    { name: 'Yellow', value: '#FFFF00' },
  ];

  const watchedSizes = watch('sizes', []);
  const watchedColors = watch('colors', []);

  // useEffect(() => {
  //   if (product?.data) {
  //     const productData = product.data;
  //     setValue('name', productData.name);
  //     setValue('description', productData.description);
  //     setValue('price', productData.price);
  //     setValue('discount', productData.discount);
  //     setValue('stock', productData.stock);
  //     setValue('category', productData.category);
  //     setValue('brand', productData.brand);
  //     setValue('weight', productData.weight);
  //     setValue('gender', productData.gender);
  //     setValue('sizes', productData.sizes);
  //     setValue('colors', productData.colors);
  //     setValue('tagNumber', productData.tagNumber);
  //     setSelectedImages(productData.images);
  //   }
  // }, [product, setValue]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setSelectedImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const toggleSize = (size: string) => {
    const currentSizes = watchedSizes || [];
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter(s => s !== size)
      : [...currentSizes, size];
    setValue('sizes', newSizes);
  };

  const toggleColor = (color: string) => {
    const currentColors = watchedColors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    setValue('colors', newColors);
  };

  const onSubmit = async (data: UpdateProductData) => {
    try {
      await updateProductMutation.mutateAsync({
        storeId: storeId!,
        productId: productId!,
        data: { ...data, id: productId! }
      });
      navigate('/vendor/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">PRODUCT EDIT</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Product Image */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                {selectedImages.length > 0 ? (
                  <div className="relative">
                    <img
                      src={selectedImages[0]}
                      alt="Product"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedImages([])}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Drop your images here, or <span className="text-orange-500 cursor-pointer">click to browse</span></p>
                    <p className="text-xs text-gray-500">1600 × 1200 (4:3) recommended. PNG, JPG and GIF files are allowed</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => e.target.files && handleFiles(e.target.files)}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Product Name</h3>
                  <input
                    {...register('name', { required: 'Product name is required' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Men Black Slim Fit T-shirt"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Product Categories</h3>
                    <select
                      {...register('category', { required: 'Category is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Home">Home</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Gender</h3>
                    <select
                      {...register('gender', { required: 'Gender is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Brand</h3>
                    <input
                      {...register('brand', { required: 'Brand is required' })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Larkon Fashion"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Weight</h3>
                    <input
                      {...register('weight')}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="300gm"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => toggleSize(size)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            watchedSizes?.includes(size)
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableColors.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => toggleColor(color.name)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            watchedColors?.includes(color.name)
                              ? 'border-orange-500 scale-110'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Top in sweatshirt fabric made from a cotton blend with a soft brushed inside. Relaxed fit with dropped shoulders, long sleeves and ribbing around the neckline, cuffs and hem. Small metal text appliqué."
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Tag Number</h3>
                    <input
                      {...register('tagNumber', { required: 'Tag number is required' })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="3K29400T"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Stock</h3>
                    <input
                      {...register('stock', { required: 'Stock is required', valueAsNumber: true })}
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="465"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Tag</h3>
                    <div className="flex items-center">
                      <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm">Popular</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Pricing Details</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          {...register('price', { required: 'Price is required', valueAsNumber: true })}
                          type="number"
                          step="0.01"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="80"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Discount</label>
                      <div className="relative">
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                        <input
                          {...register('discount', { valueAsNumber: true })}
                          type="number"
                          className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="30"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Tax</label>
                      <div className="relative">
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                        <input
                          type="number"
                          className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Add Product Photo */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add Product Photo</h3>
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                  <p className="text-lg text-gray-600 mb-2">Drop your images here, or <span className="text-orange-500 cursor-pointer">click to browse</span></p>
                  <p className="text-sm text-gray-500">1600 × 1200 (4:3) recommended. PNG, JPG and GIF files are allowed</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/vendor/products')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={updateProductMutation.isPending}
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateProductMutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;