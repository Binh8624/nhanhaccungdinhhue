import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: {
    label: string;
    path?: string;
  }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-xs font-sans">
      <ol className="flex items-center flex-wrap gap-1.5 text-[#F2E8D5]/70">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-[#C9A45C] hover:text-[#E5C07B] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-[#C9A45C]/50 shrink-0" />
              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  className="text-[#F2E8D5]/80 hover:text-[#C9A45C] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#E5C07B] font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
