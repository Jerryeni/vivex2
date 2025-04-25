import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useState } from 'react';
import { useForgotPassword } from '../../lib/api/auth';
import toast from 'react-hot-toast';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const forgotPassword = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await forgotPassword.mutateAsync(email);
      toast.success('Password reset instructions have been sent to your email');
      setEmail('');
    } catch (error) {
      toast.error('Failed to send reset instructions');
    }
  };

  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Forget Password</h2>
          <p className="text-gray-600 mb-6">
            Enter the email address  associated with your account.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <Button type="submit" disabled={forgotPassword.isPending} className="w-full">
              {forgotPassword.isPending ? 'SENDING...' : 'SEND CODE →'}
            </Button>

            <div className="space-y-4 text-center">
              <p className="text-sm text-gray-600">
                Already have account?{' '}
                <Link to="/auth/sign-in" className="text-[#F86F03] hover:underline">
                  Sign In
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Don't have account?{' '}
                <Link to="/auth/sign-up" className="text-[#F86F03] hover:underline">
                  Sign Up
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                You may contact{' '}
                <Link to="/support" className="text-[#F86F03] hover:underline">
                  Customer Service
                </Link>{' '}
                for help restoring access to your account.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}