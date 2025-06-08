import { useState } from 'react';
import { useCommentsStore } from '../../lib/store/comments-store';
import { Button } from '../ui/button';
import { useAuthStore } from '../../lib/store/useAuthStore';
// import { useAuthStore } from '@/lib/store/auth-store';
// import { useCommentsStore } from '@/lib/store/comments-store';
// import { Button } from '@/components/ui/button';

interface CommentFormProps {
  postId: number;
}

export function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState('');
  const user = useAuthStore((state) => state.user);
  const addComment = useCommentsStore((state) => state.addComment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addComment(postId, user?.username || 'Anonymous', content.trim());
    setContent('');
  };

  return (
    <>
    <h2 className="text-lg sm:text-xl font-medium mb-6">Leave a comment</h2>

<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
      Write a comment
    </label>
    <textarea
      id="comment"
      rows={3}
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F86F03] focus:ring-[#F86F03] sm:text-sm"
      placeholder="Share your thoughts..."
    />
  </div>
  <Button type="submit" disabled={!content.trim()}>
    Post Comment
  </Button>
</form>
    </>
    
  );
}