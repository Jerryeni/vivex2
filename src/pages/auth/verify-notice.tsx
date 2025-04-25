import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useResendVerification } from '../../lib/api/auth';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

export function VerifyNotice() {
  const navigate = useNavigate();
  const resendVerification = useResendVerification();
  const [showEmailButton, setShowEmailButton] = useState(false);

  // Get user email from cookies
  const email = Cookies.get('authEmail') || '';

  // Function to generate email provider URL
  const getEmailProviderURL = (email: string) => {
    if (!email.includes('@')) return null;

    const domain = email.split('@')[1]?.toLowerCase();
    const emailProviders: Record<string, string> = {
      'gmail.com': 'https://mail.google.com/mail/u/0/#inbox',
      'yahoo.com': 'https://mail.yahoo.com/',
      'outlook.com': 'https://outlook.live.com/mail/inbox',
      'hotmail.com': 'https://outlook.live.com/mail/inbox',
      'icloud.com': 'https://www.icloud.com/mail',
      'aol.com': 'https://mail.aol.com/',
      'zoho.com': 'https://mail.zoho.com/',
      'yandex.com': 'https://mail.yandex.com/',
    };

    return emailProviders[domain] || 'https://www.google.com/search?q=login+to+my+email';
  };

  const emailProviderURL = getEmailProviderURL(email);

  // Delay showing the "Open Your Email" button
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmailButton(true);
    }, 1500); // 1.5-second delay

    return () => clearTimeout(timer);
  }, []);

  const handleResendVerification = async () => {
    if (!email) {
      toast.error('No email found for the user');
      return;
    }

    try {
      await resendVerification.mutateAsync(email);
      toast.success('Verification email has been resent');
    } catch (error: any) {
      console.error('Resend error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to resend verification email');
    }
  };

  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Verify Your Email Address</h2>
          <p className="text-gray-600 mb-6">
            {email ? (
              <>
                Please check your email <span className="text-primary-100 font-semibold">{email}</span> for a
                verification message. You need to verify your email before accessing your account.
              </>
            ) : (
              'No email found. Please try signing up again.'
            )}
          </p>

          <div className="space-y-4">
            <button
              onClick={handleResendVerification}
              disabled={resendVerification.isPending}
              className="w-full py-2 text-blue-500 underline text-left disabled:opacity-50"
            >
              {resendVerification.isPending ? 'Sending...' : 'Resend Verification Email'}
            </button>

            {/* Open Email Button - Delayed Appearance */}
            {/* {email && showEmailButton && (
              <a href={emailProviderURL} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full">📧 Open Your Email</Button>
              </a>
            )} */}

            <Button onClick={() => navigate('/sign-in')} className="w-full">
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}