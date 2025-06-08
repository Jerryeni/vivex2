import { useCategory, useSubcategoriesByCategory, useSubcategoryProducts } from "../../../lib/api/product";

const ProductGrid = ({ categorySlug }: { categorySlug: string }) => {
  const { data: category } = useCategory(categorySlug); 
  const { data: subcategories = [] } = useSubcategoriesByCategory(category?.id);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">Showing results for <strong>{category?.name}</strong></span>
        <select className="border rounded px-2 py-1 text-sm">
          <option>Most Popular</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {subcategories.map((subcategory: any) => {
          const { data: products = [] } = useSubcategoryProducts(subcategory.id);
          return products.map((product: any)  => (
            <div key={product.id} className="border rounded p-2">
              <img src={product?.images?.[0]?.image_url} alt={product.name} className="w-full h-32 object-cover" />
              <h4 className="text-sm font-semibold mt-2">{product.name}</h4>
              <div className="text-sm text-gray-500">{product.brand}</div>
              <div className="text-orange-600 font-bold text-sm mt-1">${product.price}</div>
            </div>
          ));
        })}
      </div>
    </div>
  );
};

export default ProductGrid;