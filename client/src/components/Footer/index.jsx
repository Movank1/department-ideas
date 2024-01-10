import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="bg-primary w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-0">
        {/* {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )} */}
        <h4>
        "Success is the sum of small efforts, repeated day-in and day-out." - Robert Collier        </h4>
      </div>
      <div>
      </div>
    </footer>
  );
};

export default Footer;
