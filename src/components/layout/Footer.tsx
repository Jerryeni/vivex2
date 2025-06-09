import { Link } from 'react-router-dom';
import { slugify } from '../../lib/utils';
import { useCategories } from '../../lib/api/product';

export function Footer() {
  const {
    data: allCategories,
  } = useCategories();

  const categoriesToShow = allCategories?.slice(0, 6) || [];

  return (
    <footer className="bg-[#1E1E1E] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-8 mb-12">
          <div>
            <Link to="/" className=" mb-4 space-x-2">
              <img src='/logo2.png' alt="Vivian's Store" />
            </Link>
            <div className="mt-3 text-gray-400">
              <p className="mb-4">Customer Support:</p>
              <p className="text-lg font-bold mb-2">(+234) 805-155-0129</p>
              <p className="mb-4">Lagos, Nigeria 39495</p>
              <p>info@vivianstore.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">TOP CATEGORY</h3>
            <ul className="space-y-4 text-gray-400">
              {categoriesToShow.map((cat: any) => (
                <li key={cat.id}>
                  <Link to={`/category/${slugify(cat.name)}`}>{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">QUICK LINKS</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/products">Shop Product</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              {/* <li><Link to="/compare">Compare</Link></li> */}
              <li><Link to="/track-order">Track Order</Link></li>
              <li><Link to="/support">Customer Help</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">DOWNLOAD APP</h3>
            <div className="space-y-4">
              <a href="#" className="block bg-[#2A2A2A] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src="/1.png" alt="Google Play" className="w-8 h-8" />
                  <div>
                    <p className="text-xs">Get it now</p>
                    <p className="font-bold">Google Play</p>
                  </div>
                </div>
              </a>
              <a href="#" className="block bg-[#2A2A2A] p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src="/2.png" alt="App Store" className="w-8 h-8" />
                  <div>
                    <p className="text-xs">Get it now</p>
                    <p className="font-bold">App Store</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">POPULAR TAG</h3>
            <div className="flex flex-wrap gap-2">
              <Link to="/blog/game" className="bg-[#2A2A2A] px-3 py-1 rounded">Game</Link>
              <Link to="/blog/iphone" className="bg-[#2A2A2A] px-3 py-1 rounded">iPhone</Link>
              <Link to="/blog/tv" className="bg-[#2A2A2A] px-3 py-1 rounded">TV</Link>
              <Link to="/blog/asus" className="bg-[#2A2A2A] px-3 py-1 rounded">Asus Laptops</Link>
              <Link to="/blog/macbook" className="bg-[#2A2A2A] px-3 py-1 rounded">Macbook</Link>
              <Link to="/blog/ssd" className="bg-[#2A2A2A] px-3 py-1 rounded">SSD</Link>
              <Link to="/blog/graphics" className="bg-[#2A2A2A] px-3 py-1 rounded">Graphics Card</Link>
              <Link to="/blog/powerbank" className="bg-[#2A2A2A] px-3 py-1 rounded">Power Bank</Link>
              <Link to="/blog/smart-tv" className="bg-[#2A2A2A] px-3 py-1 rounded">Smart TV</Link>
              <Link to="/blog/speaker" className="bg-[#2A2A2A] px-3 py-1 rounded">Speaker</Link>
              <Link to="/blog/tablet" className="bg-[#2A2A2A] px-3 py-1 rounded">Tablet</Link>
              <Link to="/blog/microwave" className="bg-[#2A2A2A] px-3 py-1 rounded">Microwave</Link>
              <Link to="/blog/samsung" className="bg-[#2A2A2A] px-3 py-1 rounded">Samsung</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <Link to="/products" className="text-[#F86F03] hover:underline">
            Browse All Product →
          </Link>
        </div>
      </div>
    </footer>
  );
}
