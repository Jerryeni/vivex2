import { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { toast } from 'react-hot-toast';
import { useLogin, useRegister } from '../../lib/api/auth';

type ModalAuthProps = {
  onClose: () => void;
};

export function ModalAuth({ onClose }: ModalAuthProps) {
  const [activeTab, setActiveTab] = useState<'sign-in' | 'sign-up'>('sign-in');

  // Shared states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign-up specific
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isBusiness, setIsBusiness] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  const login = useLogin();
  const register = useRegister();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await register.mutateAsync({
        email,
        password,
        is_vendor: isBusiness,
      });
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X className="w-5 h-5" />
        </button>

        {/* Tab Header */}
        <div className="flex border-b mb-6">
          <button
            className={`text-lg font-semibold pb-2 border-b-2 ${
              activeTab === 'sign-in' ? 'border-[#F86F03] text-[#F86F03]' : 'border-transparent text-gray-500'
            }`}
            onClick={() => setActiveTab('sign-in')}
          >
            Sign In
          </button>
          <button
            className={`text-lg font-semibold pb-2 ml-8 border-b-2 ${
              activeTab === 'sign-up' ? 'border-[#F86F03] text-[#F86F03]' : 'border-transparent text-gray-500'
            }`}
            onClick={() => setActiveTab('sign-up')}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={activeTab === 'sign-in' ? handleSignIn : handleSignUp} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          {activeTab === 'sign-up' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative mt-1">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isBusiness}
                  onChange={(e) => setIsBusiness(e.target.checked)}
                  className="h-4 w-4 text-[#F86F03] border-gray-300 rounded focus:ring-[#F86F03]"
                />
                <label className="ml-2 text-sm text-gray-900">Register as a business account</label>
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={activeTab === 'sign-in' ? login.isPending : register.isPending}>
            {activeTab === 'sign-in'
              ? login.isPending
                ? 'Signing In...'
                : 'Sign In →'
              : register.isPending
              ? 'Signing Up...'
              : 'Sign Up →'}
          </Button>
        </form>
      </div>
    </div>
  );
}