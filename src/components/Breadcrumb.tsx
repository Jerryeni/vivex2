import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items?: {
    label: string;
    href?: string;
  }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const location = useLocation();
  
  // Generate breadcrumb items if not provided
  const defaultItems = !items ? generateBreadcrumbItems(location.pathname) : items;

  return (
<nav className="flex  items-center space-x-2 text-sm  p-4 ">
      <Link to="/" className="text-gray-500 hover:text-gray-700">
        Home
      </Link>
      {defaultItems.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-gray-300" />
          {item.href ? (
            <Link to={item.href} className="text-gray-500 hover:text-gray-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

function generateBreadcrumbItems(pathname: string) {
  const paths = pathname.split('/').filter(Boolean);
  return paths.map((path, index) => {
    const label = path.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Last item shouldn't be a link
    if (index === paths.length - 1) {
      return { label };
    }
    
    const href = '/' + paths.slice(0, index + 1).join('/');
    return { label, href };
  });
}