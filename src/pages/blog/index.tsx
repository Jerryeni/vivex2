// pages/Blog.tsx
import { useState, useEffect, useMemo, SetStateAction } from 'react';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { debounce, formatDate } from '../../lib/utils';
import { Input } from '../../components/ui/input';
import HeroNav from '../../components/layout/HeroNav';
import { Breadcrumb } from '../../components/Breadcrumb';
import Sidebar from '../../components/Blogsidebar';
import {
  useBlogCategories,
  useBlogTags,
  useBlogPosts,
  useBlogPostBySlug
} from '../../lib/api/blog';

const ITEMS_PER_PAGE = 5;

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'Most Popular');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { slug } = useParams();

  const { data: categoriesData } = useBlogCategories();
  const { data: tagsData } = useBlogTags();

  const categories = ['All', ...(categoriesData?.map((cat: { name: string }) => cat.name) || [])];
  const tags = ['All', ...(tagsData?.map((tag: { name: string }) => tag.name) || [])];

  const { data: blogPostsData } = useBlogPosts({
    search: searchQuery,
    ordering: sortBy === 'Most Popular' ? '-views' : sortBy === 'Latest' ? '-date' : 'date',
    page: currentPage,
  });

  const blogPosts = Array.isArray(blogPostsData) ? blogPostsData : [];
  const { data: singlePost } = useBlogPostBySlug(slug);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (selectedTag !== 'All') params.set('tag', selectedTag);
    if (sortBy !== 'Most Popular') params.set('sort', sortBy);
    if (searchQuery) params.set('q', searchQuery);
    if (currentPage > 1) params.set('page', currentPage.toString());
    setSearchParams(params);
  }, [selectedCategory, selectedTag, sortBy, searchQuery, currentPage, setSearchParams]);

  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (selectedTag !== 'All') {
      filtered = filtered.filter((post) => post.tags?.includes(selectedTag));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'Latest':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'Oldest':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      default:
        filtered.sort((a, b) => b.views - a.views);
    }

    return filtered;
  }, [blogPosts, selectedCategory, selectedTag, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = debounce((value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleSortChange = (value: SetStateAction<string>) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4">
      <HeroNav />
      <div className="pb-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
      </div>

      {slug && singlePost ? (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">{singlePost.title}</h1>
          <p className="text-gray-600 mb-4">{formatDate(singlePost.date)}</p>
          <img src={singlePost.image} alt={singlePost.title} className="w-full h-auto rounded mb-4" />
          <p className="text-gray-700">{singlePost.content}</p>
        </div>
      ) : (
        <div className="lg:flex lg:gap-8">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={(cat: string) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            showMobileFilters={showMobileFilters}
          />

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:w-96">
                <Input
                  type="search"
                  placeholder="Search..."
                  defaultValue={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-4 rounded font-light"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="Most Popular">Most Popular</option>
                <option value="Latest">Latest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>

            {paginatedPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No blog posts found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-48 sm:h-56 object-cover rounded"
                    />
                    <div className="py-2">
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-[#F86F03] border border-[#F86F03]/30 p-2 hover:underline inline-flex items-center gap-2"
                      >
                        READ MORE →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded border ${
                      currentPage === i + 1
                        ? 'bg-[#F86F03] text-white border-transparent'
                        : 'bg-white border-gray-300 text-gray-700'
                    }`}
                  >
                    {i + 1}dsdsddsds
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}