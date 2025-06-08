import React from 'react';

const categories = [
  'Electronics Devices', 'Computer & Laptop', 'Computer Accessories',
  'SmartPhone', 'Headphone', 'Mobile Accessories',
];

const brands = [
  'Apple', 'Samsung', 'Google', 'HP', 'Xiaomi', 'Symphony', 'Intel',
];

const Sidebar = () => {
  return (
    <div className="space-y-6 text-sm">

      {/* Category Filter */}
      <div>
        <h4 className="font-semibold mb-2">Category</h4>
        <ul className="space-y-2">
          {categories.map((cat, index) => (
            <li key={index}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="category" className="form-radio" />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="font-semibold mb-2">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full border rounded px-2 py-1"
          />
          <span>–</span>
          <input
            type="number"
            placeholder="Max"
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <ul className="mt-2 space-y-1">
          <li><label><input type="radio" name="price" className="mr-2" />Under $20</label></li>
          <li><label><input type="radio" name="price" className="mr-2" />$25 to $100</label></li>
          <li><label><input type="radio" name="price" className="mr-2" />$100 to $300</label></li>
          <li><label><input type="radio" name="price" className="mr-2" />$300 to $500</label></li>
        </ul>
      </div>

      {/* Popular Brands Filter */}
      <div>
        <h4 className="font-semibold mb-2">Popular Brands</h4>
        <ul className="space-y-2">
          {brands.map((brand, index) => (
            <li key={index}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="form-checkbox" />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
