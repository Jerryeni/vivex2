import React from 'react';
import { Link } from 'react-router-dom';
import { Store, MapPin, Package, Edit, Plus } from 'lucide-react';
import { useVendorStores } from '../../lib/hooks/useVendorQueries';
import { OptimizedImage } from '../ui/OptimizedImage';

const StoresList: React.FC = () => {
  const { data: stores, isLoading, error } = useVendorStores();

  console.log(stores);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Failed to load stores. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">My Stores</h2>
        <Link
          to="/vendor/stores/create"
          className="bg-primary-100 text-white px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Store</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores?.data?.data.map((store: any) => (
          <div key={store.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100x rounded-lg flex items-center justify-center">
                  <OptimizedImage src={store?.store_logo} alt={store?.name} containerClassName="w-10 h-10" />
                  {/* <Store className="h-5 w-5 text-blue-600" /> */}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{store.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    store.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {store.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{store.description}</p>

            <div className="flex items-center text-sm text-gray-500 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{store.address}</span>
            </div>

            <div className="flex space-x-2">
              <Link
                to={`/vendor/stores/${store.id}/products`}
                className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
              >
                <Package className="h-4 w-4" />
                <span>Products</span>
              </Link>
              {/* <Link
                to={`/vendor/stores/${store.id}/edit`}
                className="flex-1 bg-primary-100 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-100 transition-colors flex items-center justify-center space-x-1"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Link> */}
            </div>
          </div>
        ))}
      </div>

      {stores?.data?.data.length === 0 && (
        <div className="text-center py-12">
          <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No stores yet</h3>
          <p className="text-gray-500 mb-4">Create your first store to start selling</p>
          <Link
            to="/vendor/stores/create"
            className="bg-primary-100 text-white px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors"
          >
            Create Store
          </Link>
        </div>
      )}
    </div>
  );
};

export default StoresList;