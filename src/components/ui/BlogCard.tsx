import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

type BlogPost = {
    // post: [];
    id: number;
    title: string;
    slug: string;
    content: string;
    updated_at: string;
    category?: string;
    author?: number | string;
};

const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    return (
        <div className="bg-white rounded-2xl shadow p-6 transition hover:shadow-md">
            <div className="mb-2 flex justify-between items-center text-sm text-gray-500">
                {post.category && (
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                        {post.category}
                    </span>
                )}
                <span className="italic">
                    {formatDistanceToNow(new Date(post.updated_at), { addSuffix: true })}
                </span>
            </div>

            <Link to={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold text-[#F86F03] hover:underline">
                    {post.title}
                </h2>
            </Link>

            <p className="text-gray-700 mt-3 text-sm leading-relaxed">
                {truncate(post.content, 200)}
            </p>

            <div className="mt-4 text-right">
                <Link
                    to={`/blog/${post.slug}`}
                    className="text-[#F86F03] text-sm font-medium hover:underline"
                >
                    Read More →
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;