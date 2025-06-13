import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '../../lib/api/blog';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const Blog: React.FC = () => {
  const { data: posts, isLoading, error } = useBlogPosts(); // Fetch latest blogs

  console.log('Blog posts:', posts);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500">Failed to load blogs.</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-8 text-center">Vivian's Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts?.slice(0, 3).map((post: any) => (
          <article key={post.id} className="bg-white rounded-lg overflow-hidden border shadow-sm">
            <img 
              src={post.featured_image || 'https://via.placeholder.com/300'} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span>{post.author}</span>
                <span>{new Date(post.updated_at).toLocaleDateString()}</span>
                <span>{post.comments_count} Comments</span>
              </div>
              <h3 className="font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.content}</p>
              <Link 
                to={`/blog/${post.slug}`}
                className="text-orange-500 text-sm hover:underline"
              >
                READ MORE →
              </Link>
            </div>
          </article>
        ))}
      </div>
      <Link to="/blog" className="text-orange-500 text-sm hover:underline block mt-4 text-center"> View All Blogs → </Link>
    </section>
  );
};