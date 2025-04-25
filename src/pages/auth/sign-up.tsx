import { useState } from 'react';
import { Link} from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { toast } from 'react-hot-toast';
import { useRegister } from '../../lib/api/auth';

export function SignUp() {
  // const navigate = useNavigate();
  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isBusiness, setIsBusiness] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const register = useRegister();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Password validation
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   toast.error(
    //     'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    //   );
    //   return;
    // }

    try {
      await register.mutateAsync({
        email,
        password,
        is_vendor: isBusiness,
      });
      // Navigation is handled in the useRegister hook
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };


  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <div className="flex border-b mb-6">
            <Link
              to="/sign-in"
              className="text-lg font-semibold pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            >
              Sign In
            </Link>
            <button className="text-lg font-semibold pb-4 border-b-2 border-[#F86F03] text-[#F86F03] ml-8">
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1"
              />
            </div> */}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">8+ characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pr-10"
                  minLength={8}
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
                id="isBusiness"
                name="isBusiness"
                type="checkbox"
                checked={isBusiness}
                onChange={(e) => setIsBusiness(e.target.checked)}
                className="h-4 w-4 text-[#F86F03] focus:ring-[#F86F03] border-gray-300 rounded"
              />
              <label htmlFor="isBusiness" className="ml-2 block text-sm text-gray-900">
                Register as a business account
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={register.isPending}>
              {register.isPending ? 'Signing Up...' : 'Sign Up →'}
            </Button>

            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                className="w-full p-3 border rounded-md flex items-center justify-center gap-3 hover:bg-gray-50"
              >
                <img src="/google.svg" alt="Google" className="w-5 h-5" />
                <span>Sign up with Google</span>
              </button>
              <button
                type="button"
                className="w-full p-3 border rounded-md flex items-center justify-center gap-3 hover:bg-gray-50"
              >
                <img src="/apple.svg" alt="Apple" className="w-5 h-5" />
                <span>Sign up with Apple</span>
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}