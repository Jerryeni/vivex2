import React from 'react';
import { useBlogCategories, useBlogPosts, useBlogTags } from '../lib/api/blog';
// import { useBlogCategories, useBlogPosts, useBlogTags } from '../../lib/api/blog';

type SidebarProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showMobileFilters: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, setSelectedCategory, showMobileFilters }) => {
  const { data: categories, isLoading: loadingCategories } = useBlogCategories();
  const { data: tags, isLoading: loadingTags } = useBlogTags();
  const { data: latestBlogs, isLoading: loadingBlogs } = useBlogPosts(null); // Fetch latest blogs

  return (
    <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 lg:flex-shrink-0 mb-6 lg:mb-0`}>
      
      {/* Category Section */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="font-semibold mb-4">CATEGORY</h3>
        <ul className="space-y-3">
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : (
            categories?.map((category: any) => (
              <li key={category.id}>
                <button
                  className={`flex items-center gap-2 w-full text-left ${
                    selectedCategory === category.name ? 'text-[#F86F03]' : 'text-gray-600'
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {selectedCategory === category.name && (
                    <span className="w-2 h-2 bg-[#F86F03] rounded-full" />
                  )}
                  {category.name}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Latest Blog Section */}
      <div className="bg-white p-4 rounded-lg border shadow-sm mt-6">
        <h3 className="font-semibold mb-4">LATEST BLOG</h3>
        {loadingBlogs ? (
          <p>Loading latest blogs...</p>
        ) : latestBlogs?.slice(0, 3).map((blog: any) => (
          <div key={blog.id} className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded"></div>
            <div>
              <p className="text-sm font-medium">{blog.title}</p>
              <p className="text-xs text-gray-500">{new Date(blog.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery (Static) */}
      <div className="bg-white p-4 rounded-lg border shadow-sm mt-6">
        <h3 className="font-semibold mb-4">GALLERY</h3>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="w-16 h-16 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white p-4 shadow-sm mt-6">
        <h3 className="font-semibold mb-4">POPULAR TAGS</h3>
        <div className="flex flex-wrap gap-2">
          {loadingTags ? (
            <p>Loading tags...</p>
          ) : (
            tags?.map((tag: any) => (
              <span key={tag.id} className="px-3 py-1 text-sm border rounded">
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