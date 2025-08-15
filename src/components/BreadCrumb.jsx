import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="text-sm">
      {items?.map((item, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === items.length - 1;
        const linkClass = isFirstItem ? 'text-black' : 'text-gray-500';
        const content = isLastItem ? (
          <span className={linkClass}>{item?.label}</span>
        ) : item.to ? (
          <Link to={item?.to} className={linkClass}>
            {item?.label}
          </Link>
        ) : (
          <span className={linkClass}>{item?.label}</span>
        );

        return (
          <span key={index}>
            {content}
            {index < items?.length - 1 && <span className="mx-1">/</span>}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;