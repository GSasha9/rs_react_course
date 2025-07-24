import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="modal error-page">
      <h1 className="title-1">Error 404</h1>
      <p className="p-standart">Page not found</p>
      <Link to={`/`} className="button">
        Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
