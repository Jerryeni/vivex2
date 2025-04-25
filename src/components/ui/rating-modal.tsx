import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { Button } from './button';

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
}

export function RatingModal({ open, onClose }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle rating submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Rating</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              5 Star Rating
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-yellow-400"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating ? 'fill-current' : 'fill-none'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Feedback
            </label>
            <textarea
              id="feedback"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write about your feedback about our product & services"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#F86F03] focus:ring-[#F86F03]"
            />
          </div>

          <Button type="submit" className="w-full">
            PUBLISH REVIEW
          </Button>
        </form>
      </div>
    </div>
  );
}