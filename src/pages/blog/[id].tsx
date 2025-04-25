import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Eye, Layers, FacebookIcon, Facebook, WheatIcon, Twitter, Linkedin, Link2 } from 'lucide-react';
import { useBlog } from '../../lib/hooks/use-blog';
import { formatDate } from '../../lib/utils';
import { CommentForm } from '../../components/comments/comment-form';
import { CommentList } from '../../components/comments/comment-list';
import HeroNav from '../../components/layout/HeroNav';
import { Breadcrumb } from '../../components/Breadcrumb';
import Sidebar from '../../components/Blogsidebar';

const categories = [
  'All',
  'Electronics Devices',
  'Computer & Laptop',
  'Computer Accessories',
  'SmartPhone',
  'Headphone',
  'Mobile Accessories',
  'Gaming Console',
  'Camera & Photo',
];


export function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlogPost } = useBlog();

  const post = getBlogPost(Number(id));

  if (!post) {
    navigate('/404');
    return null;
  }

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4">
      <HeroNav />
      <div className="pb-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }]} />
      </div>
      {/* <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#F86F03] mb-6 sm:mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link> */}

      <article className="bg-white rounded-lg shadow-sm overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 sm:h-64 md:h-96 object-cover"
        />
        <div className="lg:flex lg:gap-8">


          {/* main content */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6 sm:mb-8">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#F86F03]" />
                {post.category}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#F86F03]" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#F86F03]" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#F86F03]" />
                {post.views}
              </div>
            </div>


            <h1 className="text-2xl sm:text-2xl md:text-3xl font-medium mb-4">{post.title}</h1>
            
            <div className="flex justify-between py-3 items-center">
              <div className="flex justify-start  items-center">
                <img src="/404.png" alt="author" className="w-8 h-8  border rounded-full" />
                <span className="text-gray-600 text-sm ml-2">{post.author}</span>
              </div>
              <div className="flex justify-start gap-2 items-center">
                <Link to="/" >
                  <Facebook className="text-sm ml-2 w-8 h-8 border items p-1 bg-blue-500 text-white rounded-full" />
                </Link>
                <Link to="/" >
                  <WheatIcon className="text-sm ml-2 w-8 h-8 border items p-1 bg-green-500 text-white rounded-full" />
                </Link>
                <Link to="/" >
                  <Twitter className="text-sm ml-2 w-8 h-8 border items p-1 bg-blue-300 text-white rounded-full" />
                </Link>
                <Link to="/" >
                  <Linkedin className="text-sm ml-2 w-8 h-8 border items p-1 bg-blue-700 text-white rounded-full" />
                </Link>
                <Link to="/" >
                  <Link2 className="text-sm ml-2 w-8 h-8 border items p-1 bg-gray-500 text-white rounded-full" />
                </Link>
                {/* <Link to="/" >
                  <Pintere className="text-sm ml-2 w-8 h-8 border items p-1 bg-blue-500 text-white rounded-full" />
                </Link> */}

              </div>

            </div>


            <div
              className="prose max-w-none prose-sm sm:prose-base"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />


            {/* Comments Section */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t">
              <h2 className="text-lg sm:text-xl font-semibold mb-6">Comments</h2>
              <div className="space-y-8">
                <CommentForm postId={post.id} />
                <CommentList postId={post.id} />
              </div>
            </div>
          </div>

          {/* sidebar */}
          <div className="py-4 sm:py-8">
            <Sidebar selectedCategory={''} setSelectedCategory={function (category: string): void {
              throw new Error('Function not implemented.');
            }} showMobileFilters={false} categories={categories}
            />
          </div>

        </div>

      </article>
    </div>
  );
}