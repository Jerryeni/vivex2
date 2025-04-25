import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export function VerifyCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      // API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    },
    onSuccess: () => {
      navigate('/auth/sign-in', {
        state: { message: 'Email verified successfully! Please sign in.' }
      });
    }
  });

  const { mutate: resendCode, isPending: isResending } = useMutation({
    mutationFn: async () => {
      // API call to resend code
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Verify Your Email Address</h2>
          <p className="text-gray-600 mb-8">
            Nam ultricies lectus a risus blandit elementum. Quisque arcu arcu, tristique a eu in diam.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Verification Code
                </label>
                <button
                  type="button"
                  onClick={() => resendCode()}
                  className="text-sm text-[#F86F03] hover:underline disabled:opacity-50"
                  disabled={isResending}
                >
                  {isResending ? 'Sending...' : 'Resend Code'}
                </button>
              </div>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="text-center text-lg tracking-widest"
                maxLength={6}
                placeholder="Enter verification code"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Verifying...' : 'VERIFY ME →'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}