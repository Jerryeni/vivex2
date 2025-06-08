import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  User,
  Eye,
  Layers,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  MessageCircleCode,
} from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { CommentForm } from '../../components/comments/comment-form';
import { CommentList } from '../../components/comments/comment-list';
import HeroNav from '../../components/layout/HeroNav';
import { Breadcrumb } from '../../components/Breadcrumb';
import Sidebar from '../../components/Blogsidebar';
import { useBlogCategories, useBlogPostBySlug } from '../../lib/api/blog';

export function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: post } = useBlogPostBySlug(slug);
  const { data: categoriesData } = useBlogCategories();
  const categories = ['All', ...(categoriesData?.map((cat: { name: string }) => cat.name) || [])];

  useEffect(() => {
    if (slug && post === null) {
      navigate('/404');
    }
  }, [post, slug, navigate]);

  if (!post) return null;
console.log('Post:', post);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <HeroNav />
      <div className="pb-8">
        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title, href: `/blog/${post.slug}` }]} />
      </div>

      <article className="bg-white shadow-sm overflow-hidden">
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-48 sm:h-64 md:h-96 object-cover"
        />

        <div className="w-full lg:flex lg:gap-8">
          {/* main content */}
          <div className="w-4/5 p-4 sm:p-6 md:p-8x">
            <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6 sm:mb-8">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#F86F03]" />
                {post.categories[0].name}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#F86F03]" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#F86F03]" />
                {formatDate(post.updated_at)}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#F86F03]" />
                {post.view_count}
              </div>
              <div className="flex items-center gap-2">
                <MessageCircleCode className="h-4 w-4 text-[#F86F03]" />
                {post.comments.length}
              </div>
            </div>

            <h2 className="text-2xl md:text-2xl font-semibold mb-2">{post.title}</h2>

            <div className="flex justify-between py-3 items-center">
              <div className="flex items-center">
                <img src="/404.png" alt="author" className="w-8 h-8 border rounded-full" />
                <span className="text-gray-600 text-sm ml-2">{post.author}</span>
              </div>
              <div className="flex gap-2">
                <Link to="/">
                  <Facebook className="w-8 h-8 p-1 bg-blue-500 text-white rounded-full" />
                </Link>
                <Link to="/">
                  <Twitter className="w-8 h-8 p-1 bg-blue-400 text-white rounded-full" />
                </Link>
                <Link to="/">
                  <Linkedin className="w-8 h-8 p-1 bg-blue-700 text-white rounded-full" />
                </Link>
                <Link to="/">
                  <Link2 className="w-8 h-8 p-1 bg-gray-500 text-white rounded-full" />
                </Link>
              </div>
            </div>

            <div
              className="prose max-w-none prose-sm sm:prose-base"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Comments Section */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t">
              <div className="space-y-8">
                <CommentForm postId={post.id} />
                <CommentList postId={post.id} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/5 py-4 sm:py-8">
            <Sidebar
              selectedCategory=""
              setSelectedCategory={() => {}}
              showMobileFilters={false}
              categories={categories}
            />
          </div>
        </div>
      </article>
    </div>
  );
}