import { Link } from 'react-router-dom'; // Import Link for routing
import './Error404.css';

const Error404 = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>404</h1>
        <p>Oops! Page not found.</p>
        <p>It seems like you are lost.</p>
        <Link to="/" className="home-link">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
