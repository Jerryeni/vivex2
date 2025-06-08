import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { api } from '../axios';
import Cookies from 'js-cookie';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  is_vendor: boolean;
}

interface AuthResponse {
  data?: any;
}
interface RegResponse {
  status: boolean;
  message: string;
  data: {
    email: string;
  };
};
interface ResetPasswordData {
  token: string;
  password: string;
}

interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: File | string;
  username?: string;
}

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<AuthResponse>('/accounts/user/login/', credentials);
      return data;
    },
    onSuccess: (data) => {
      try {
        const user = data.data[0];
        console.log('User:', user);
        const { access_token, refresh_token, is_vendor, username } = user;
        console.log('Access Token:', access_token);
        console.log('Access Token:', user.access_token);
        Cookies.set('userId', user.id, { expires: 1 }); // Expires in 1 day
    
        if (!access_token || !refresh_token) throw new Error('Missing tokens');
    
        setAuth(user, access_token, refresh_token);
        console.log('User:', user); 
        console.log('Access Token:', access_token);
        console.log('Refresh Token:', refresh_token);
        const route = is_vendor ? '/admin' : '/user';
        navigate(route);
      } catch (err) {
        toast.error('Something went wrong processing login.');
        console.error(err);
      }
    },
    onError: () => {
      toast.error('Invalid email or password');
    },
  });
};

export const useRegister = () => {
  // const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData: RegisterData) => {
      const { data } = await api.post<RegResponse>('/accounts/user/', userData);
      console.log(data);
  
      const userEmail = data?.data?.email;
  
      if (userEmail) {
        Cookies.set('authEmail', userEmail, { expires: 1 }); // Expires in 1 day
      }
  
      return data; // Ensure the response data is returned
    },
    onSuccess: () => {
      navigate('/verify-email-notice'); // Redirect user to verification notice
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state: { logout: any; }) => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await api.post('/accounts/user/logout/');
    },
    onSuccess: () => {
      logout();
      navigate('/sign-in');
    },
  });
};

export const useForgotPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (email: string) => {
      await api.post('/accounts/user/forgot-password/', { email });
    },
    onSuccess: () => {
      navigate('/reset-password'); 
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ otp_codes, new_password }: { otp_codes: string; new_password: string }) => {
      return await api.post('/accounts/user/reset-password/', { otp_codes, new_password });
    },
    onSuccess: () => {
      navigate('/sign-in'); 
    },
  });
};

export const useVerifyEmail = () => {
  const navigate = useNavigate();
  // const { user, getUserRoute } = useAuthStore();

  return useMutation({
    mutationFn: async ({ uidb64, token }: { uidb64: string; token: string }) => {
      await api.get(`/accounts/user/verify-email/${uidb64}/${token}`);
    },
    onSuccess: () => {
      navigate('/sign-in');

      // After verification, redirect to appropriate dashboard based on role
      // if (user) {
      //   navigate(getUserRoute());
      // } else {
      //   navigate('/sign-in');
      // }
    },
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return await api.post('/accounts/user/resend-verification-link/', { email });
    },
  });
};

// export const useUpdateUser = () => {
//   const setAuth = useAuthStore((state: { setAuth: any; }) => state.setAuth);

//   return useMutation({
//     mutationFn: async (data: UpdateUserData) => {
//       const { data: response } = await api.put<AuthResponse>(`/accounts/user/{id}/`, data);
//       return response;
//     },
//     onSuccess: ({ data }) => {
//       setAuth(data);
//     },
//   });
// };
export const useUpdateUser = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const user = useAuthStore((state) => state.user);
  const access_token = useAuthStore((state) => state.access_token);
  const refresh_token = useAuthStore((state) => state.refresh_token);

  return useMutation({
    mutationFn: async (updatedData: UpdateUserData) => {
      if (!user?.id) throw new Error('User ID not found');
      let payload: any = updatedData;

      const { data: response } = await api.put(`/accounts/user/${user.id}/`, payload);
      return response;
    },
    onSuccess: ({ data }) => {
      toast.success('Profile updated successfully!');
      setAuth(data, access_token, refresh_token); // ✅ Pass all 3 arguments
    },
    onError: () => {
      toast.error('Failed to update user profile.');
    },
  });
};

export const useUserDetails = () => {
  return useQuery({
    queryKey: ['user-details'],
    queryFn: async () => {
      const { data } = await api.get<User>('/accounts/user/me/');
      return data;
    },
  });
};