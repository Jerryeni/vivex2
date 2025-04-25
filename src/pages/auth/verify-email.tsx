import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useVerifyEmail } from '../../lib/api/auth';
import toast from 'react-hot-toast';

export function VerifyEmail() {
  const navigate = useNavigate();
  const { uidb64, token } = useParams();
  const verifyEmail = useVerifyEmail();

  useEffect(() => {
    if (!uidb64 || !token) {
      toast.error('Invalid verification token');
      navigate('/');
      return;
    }

    // Run only once when component mounts
    let isMounted = true;

    const verify = async () => {
      try {
        await verifyEmail.mutateAsync({ uidb64, token });
        if (isMounted) {
          toast.success('Email verified successfully');
          navigate('/');
        }
      } catch (error) {
        if (isMounted) {
          toast.error('Failed to verify email');
        }
      }
    };

    verify();

    return () => {
      isMounted = false; // Prevent further state updates if component unmounts
    };
  }, []); // Empty dependency array ensures it runs only once

  if (!token) {
    return (
      <div className="min-h-[calc(100vh-300px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Verification Link</h2>
          <p className="text-gray-600 mb-6">
            The verification link is invalid or has expired.
          </p>
          <Button onClick={() => navigate('/auth/sign-in')}>
            Return to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md text-center">
        {verifyEmail.isPending && (
          <>
            <h2 className="text-2xl font-bold mb-4">Verifying Your Email</h2>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </>
        )}
        {verifyEmail.isSuccess && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-green-600">Email Verified!</h2>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You will be redirected to sign in...
            </p>
            <Button onClick={() => navigate('/auth/sign-in')}>
              Sign In Now
            </Button>
          </>
        )}
        {verifyEmail.isError && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h2>
            <p className="text-gray-600 mb-6">
              We couldn't verify your email. The link may have expired.
            </p>
            <Button onClick={() => navigate('/auth/sign-in')}>
              Return to Sign In
            </Button>
          </>
        )}
      </div>
    </div>
  );
}