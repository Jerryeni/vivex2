import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages = 6, currentPage = 1, onPageChange }) => {
  const [page, setPage] = useState<number>(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Left Arrow */}
      <button
        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium border transition-colors ${
              page === pageNumber
                ? "bg-orange-500 text-white border-orange-500"
                : "border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber.toString().padStart(2, "0")}
          </button>
        );
      })}

      {/* Right Arrow */}
      <button
        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;

