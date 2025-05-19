import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { DashboardSidebar } from '../../../components/user/dashboard/sidebar';
import { formatCurrency } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import useWishlistStore from '../../../lib/store/useWishlistStore';
import useCartStore from '../../../lib/store/useCartStore';
import toast from 'react-hot-toast';

export function Wishlist() {
  const { wishlist, fetchWishlist, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleRemove = (itemId: number) => {
    removeFromWishlist(itemId);
  };

  const handleAddToCart = (itemId: number, productId: number, variationId: number) => {
    addToCart(productId, variationId, 1);
    toast.success("Product added to cart.");
  };

  console.log(wishlist[0]?.product.images[0].image_url);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Link to="/" className="hover:underline">Home</Link>
                  <span>/</span>
                  <span className="text-gray-900 font-medium">Wishlist</span>
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">Your Wishlist</h1>

                {wishlist.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left border-b font-medium">
                          <th className="pb-3">Product</th>
                          <th className="pb-3">Price</th>
                          <th className="pb-3">Stock</th>
                          <th className="pb-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishlist.map((item) => (
                          <tr key={item.id} className="border-b last:border-0">
                            <td className="py-4">
                              <div className="flex items-center gap-4">
                                <img
                                  src={item.product?.images[0].image_url || `https://via.placeholder.com/64?text=${item.product.name[0]}`}
                                  alt={item.product.name}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                  <h3 className="font-semibold line-clamp-1">{item.product.name}</h3>
                                  <p className="text-gray-500 text-xs">
                                    Size: {item.product_variation.size} | Color: {item.product_variation.color}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="py-4">
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {formatCurrency(item.product.discount_price || item.product.price)}
                                </span>
                                {item.product.discount_price && (
                                  <span className="text-gray-400 text-xs line-through">
                                    {formatCurrency(item.product.price)}
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="py-4">
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                In Stock
                              </span>
                            </td>

                            <td className="py-4">
                              <div className="flex justify-center gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleAddToCart(
                                    item.id,
                                    item.product.id,
                                    item.product_variation.id
                                  )}
                                >
                                  Add to Cart
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handleRemove(item.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Your wishlist is currently empty.</p>
                    <Button className="mt-4">
                      <Link to="/products">Browse Products</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}