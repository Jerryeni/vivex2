import { ThumbsUp } from 'lucide-react';
import { useMemo } from 'react';
import { useCommentsStore } from '../../lib/store/comments-store';
import { formatDate } from '../../lib/utils';
// import { useCommentsStore } from '@/lib/store/comments-store';
// import { formatDate } from '@/lib/utils';

interface CommentListProps {
  postId: number;
}

export function CommentList({ postId }: CommentListProps) {
  const comments = useCommentsStore((state) => state.comments);
  const likeComment = useCommentsStore((state) => state.likeComment);

  // UseMemo to filter comments and prevent unnecessary re-renders
  const filteredComments = useMemo(
    () =>
      comments
        .filter((comment) => comment.postId === postId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [comments, postId]
  );

  if (filteredComments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-6">Comments</h2>
      {filteredComments.map((comment) => (
        <div key={comment.id} className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">
                {comment.author?.charAt(0).toUpperCase() || "?"}
              </span>
            </div>
          </div>
          <div className="flex-grow">
            <div className="bg-gray-50 rounded-lg px-4 py-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{comment.author}</span>
                <span className="text-sm text-gray-500">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
            <button
              onClick={() => likeComment(comment.id)}
              className="flex items-center gap-1 mt-2 text-sm text-gray-500 hover:text-[#F86F03]"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{comment.likes} likes</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
