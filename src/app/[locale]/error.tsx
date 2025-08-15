'use client';

import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className="modal error-page">
      <h1 className="title-1">Error 404</h1>
      <p className="p-standard">Page not found</p>
      <Link href={'/'} className="button">
        Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
