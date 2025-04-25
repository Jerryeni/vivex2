import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Comment {
  id: string;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
}

interface CommentsState {
  comments: Comment[];
  addComment: (postId: number, author: string, content: string) => void;
  likeComment: (commentId: string) => void;
}

export const useCommentsStore = create<CommentsState>()(
  persist(
    (set) => ({
      comments: [],
      addComment: (postId, author, content) => {
        const newComment: Comment = {
          id: crypto.randomUUID(),
          postId,
          author,
          content,
          createdAt: new Date().toISOString(),
          likes: 0,
        };
        set((state) => ({
          comments: [...state.comments, newComment],
        }));
      },
      likeComment: (commentId) => {
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, likes: comment.likes + 1 }
              : comment
          ),
        }));
      },
    }),
    {
      name: 'comments-storage',
    }
  )
);
