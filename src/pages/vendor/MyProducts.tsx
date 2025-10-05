import React from 'react';
import { Plus, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { useDeleteProduct, useProducts } from '../../lib/hooks/useVendorQueries';
import { useNavigate, useParams } from 'react-router-dom';
import { OptimizedImage } from '../../components/ui/OptimizedImage';
import { Product } from '../../types/vendor';

const MyProducts: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const { 
    data: productsResponse, 
    isLoading, 
    isError,
    error
  } = useProducts(); // Pass storeId to the query
  const deleteProductMutation = useDeleteProduct();

  const navigate = useNavigate();

  // const handleDelete = async (productId: string) => {
  //   // if (!storeId) {
  //   //   console.error('Store ID is missing');
  //   //   return;
  //   // }
    
  //   if (window.confirm('Are you sure you want to delete this product?')) {
  //     try {
  //       await deleteProductMutation.mutateAsync({ storeId, productId });
  //     } catch (error) {
  //       console.error('Error deleting product:', error);
  //       alert('Failed to delete product');
  //     }
  //   }
  // };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">
          Error loading products: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    );
  }

  if (!storeId) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Store ID is missing</div>
      </div>
    );
  }

  const products = productsResponse?.data?.data || [];

  if (products.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
            <p className="text-gray-600 mt-1">Manage your product catalog</p>
          </div>
          <button 
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            onClick={() => navigate(`/vendor/stores/${storeId}/products/create`)}
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500 mb-4">You don't have any products yet.</p>
          <button
            onClick={() => navigate(`/vendor/stores/${storeId}/products/create`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Create Your First Product</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <button 
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          onClick={() => navigate(`/vendor/stores/${storeId}/products/create`)}
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              {Array.from(new Set(products.map(p => p.category || 'Uncategorized')))
                .filter(Boolean)
                .map(category => (
                  <option key={category}>{category}</option>
                ))}
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{products.length} {products.length === 1 ? 'product' : 'products'}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product: Product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {product.images?.[0] ? (
                        <OptimizedImage 
                          src={product.images[0]} 
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover mr-4"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-300 rounded-lg mr-4"></div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {product.name || 'Unnamed Product'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.category || 'Uncategorized'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {/* {product.stock || 0} */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      !product.is_archived
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {!product.is_archived ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => navigate(`/vendor/stores/${storeId}/products/${product.id}`)}
                        aria-label="View product"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => navigate(`/vendor/stores/${storeId}/products/${product.id}/edit`)}
                        aria-label="Edit product"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        // onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={deleteProductMutation.isPending}
                        aria-label="Delete product"
                      >
                        {deleteProductMutation.isPending ? (
                          <span className="animate-pulse">Deleting...</span>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;