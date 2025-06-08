import React from 'react';
import { useBlogCategories, useBlogPosts, useBlogTags } from '../lib/api/blog';
import { Link } from 'react-router-dom';

type SidebarProps = {
  categories: any[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showMobileFilters: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  showMobileFilters,
}) => {
  const { data: categories, isLoading: loadingCategories } = useBlogCategories();
  const { data: tags, isLoading: loadingTags } = useBlogTags();
  const { data: latestBlogs, isLoading: loadingBlogs } = useBlogPosts();

  return (
    <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 lg:flex-shrink-0 mb-6 lg:mb-0`}>

      {/* CATEGORY */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="font-semibold mb-4">CATEGORY</h3>
        <ul className="space-y-3">
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : (
            <>
              <li>
                <button
                  className={`flex items-center gap-2 w-full text-left ${selectedCategory === 'All' ? 'text-[#F86F03]' : 'text-gray-600'
                    }`}
                  onClick={() => setSelectedCategory('All')}
                >
                  {selectedCategory === 'All' && (
                    <span className="w-2 h-2 bg-[#F86F03] rounded-full" />
                  )}
                  All
                </button>
              </li>

              {categories?.map((category: any) => (
                <li key={category.id}>
                  <button
                    className={`flex items-center gap-2 w-full text-left ${selectedCategory === category.name ? 'text-[#F86F03]' : 'text-gray-600'
                      }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {selectedCategory === category.name && (
                      <span className="w-2 h-2 bg-[#F86F03] rounded-full" />
                    )}
                    {category.name}
                  </button>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      {/* LATEST BLOG */}
      <div className="bg-white p-4 rounded-lg border shadow-sm mt-6">
        <h3 className="font-semibold mb-4">LATEST BLOG</h3>
        {loadingBlogs ? (
          <p>Loading latest blogs...</p>
        ) : (
          latestBlogs?.slice(0, 3).map((blog: any) => (
            <Link to={`/blog/${blog.slug}`} key={blog.id} className="flex items-center gap-3 mb-4">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="text-sm font-medium line-clamp-2">{blog.title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(blog.updated_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* GALLERY */}
      <div className="bg-white p-4 rounded-lg border shadow-sm mt-6">
        <h3 className="font-semibold mb-4">GALLERY</h3>
        {loadingBlogs ? (
          <p>Loading gallery...</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {latestBlogs?.slice(0, 6).map((blog: any, index: number) => (
              <div key={index} className="w-16 h-16 overflow-hidden rounded bg-gray-100">
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* POPULAR TAGS */}
      <div className="bg-white p-4 shadow-sm mt-6 rounded-lg border">
        <h3 className="font-semibold mb-4">POPULAR TAGS</h3>
        <div className="flex flex-wrap gap-2">
          {loadingTags ? (
            <p>Loading tags...</p>
          ) : (
            tags?.map((tag: any) => (
              <span
                key={tag.id}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-100 cursor-default"
              >
                {tag.name}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;