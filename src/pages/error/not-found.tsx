import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
// import { Button } from '@/components/ui/button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <img
          src="/404.png"
          alt="404 Error"
          className="mx-auto w-64 h-64 mb-8"
        />
        <h1 className="text-3xl font-bold mb-4">404, Page not found</h1>
        <p className="text-gray-600 mb-8 text-sm max-w-md mx-auto">
          Something went wrong. It's look that your requested could not be found.
          It's look like the link is broken or the page is removed.
        </p>
        <div className="flex justify-center gap-4">
          
          <Button
            onClick={() => navigate('/')}
            className="px-8"
          >
            GO BACK
            
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="px-8 text-orange-500"
          >
            GO TO HOME
          </Button>
        </div>
      </div>
    </div>
  );
}