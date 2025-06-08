import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../axios';

// Interfaces
interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: BlogCategory;
  created_at: string;
}

interface Comment {
  id: number;
  post_slug: string;
  content: string;
  created_at: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}


interface BlogPostsParams {
  search?: string;
  ordering?: string;
  page?: number;
}

// Fetch Blog Categories
export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data } = await api.get('/blog/categories/');
      return data.results;
    },
  });
};


export const useBlogPosts = (params: BlogPostsParams = {}) => {
  return useQuery({
    queryKey: ['blog-posts', params],
    queryFn: async () => {
      const { data } = await api.get('/blog/posts/', {
        params,
      });
      console.log(data);
      return data.results; // full response: { count, next, previous, results }
    },
  });
};


// Fetch Single Blog Post by Slug
export const useBlogPostBySlug = (slug?: string | undefined) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Slug is required');
      const { data } = await api.get(`/blog/posts/${slug}/`);
      console.log(data.data);
      return data.data;
    },
    enabled: !!slug,
  });
};

// Fetch Comments for a Blog Post
export const useBlogPostComments = (postSlug: string) => {
  return useQuery({
    queryKey: ['blog-post-comments', postSlug],
    queryFn: async () => {
      const { data } = await api.get(`/blog/posts/${postSlug}/comments/`);
      return data.results;
    },
  });
};

// Fetch Blog Tags
export const useBlogTags = () => {
  return useQuery({
    queryKey: ['blog-tags'],
    queryFn: async () => {
      const { data } = await api.get('/blog/tags/');
      return data.results;
    },
  });
};

// Mutations
const useCreateMutation = (queryKey: string, endpoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post(endpoint, payload);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  });
};

export const useCreateBlogCategory = () => useCreateMutation('blog-categories', '/blog/categories/');
export const useCreateBlogPost = () => useCreateMutation('blog-posts', '/blog/posts/');
export const useCreateComment = (postSlug: string) => useCreateMutation('blog-post-comments', `/blog/posts/${postSlug}/comments/`);
export const useCreateTag = () => useCreateMutation('blog-tags', '/blog/tags/');

const useUpdateMutation = (queryKey: string, endpoint: (slug: string) => string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ slug, payload }: { slug: string; payload: any }) => {
      const { data } = await api.put(endpoint(slug), payload);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  });
};

export const useUpdateBlogCategory = () => useUpdateMutation('blog-categories', (slug) => `/blog/categories/${slug}/`);
export const useUpdateBlogPost = () => useUpdateMutation('blog-posts', (slug) => `/blog/posts/${slug}/`);
export const useUpdateComment = (postSlug: string) => useUpdateMutation('blog-post-comments', (id) => `/blog/posts/${postSlug}/comments/${id}/`);
export const useUpdateTag = () => useUpdateMutation('blog-tags', (slug) => `/blog/tags/${slug}/`);

const useDeleteMutation = (queryKey: string, endpoint: (slug: string) => string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (slug: string) => {
      await api.delete(endpoint(slug));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  });
};

export const useDeleteBlogCategory = () => useDeleteMutation('blog-categories', (slug) => `/blog/categories/${slug}/`);
export const useDeleteBlogPost = () => useDeleteMutation('blog-posts', (slug) => `/blog/posts/${slug}/`);
export const useDeleteComment = (postSlug: string) => useDeleteMutation('blog-post-comments', (id) => `/blog/posts/${postSlug}/comments/${id}/`);
export const useDeleteTag = () => useDeleteMutation('blog-tags', (slug) => `/blog/tags/${slug}/`);
