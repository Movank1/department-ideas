import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

// Profile
const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // Check if the user is logged in and viewing their own profile
  if (Auth.loggedIn() && Auth.getProfile().authenticatedPerson.username === userParam) {
    return <Navigate to="/me" />;
  }

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is not logged in, prompt them to log in
  if (!user?.username) {
    return         <h2 class="uk-position-center uk-overlay .uk-text-decoration-none ">
    Please <a class=" .uk-text-uppercase" href='/login'> login </a> to view profile
  </h2>;
  }

  return (
    <div>
      {/* Conditional rendering based on authentication status */}
      {Auth.loggedIn() ? (
        <div className='display-flex'>
          <div className='display-flex pl-4'>
            <h2 className='text-center'> Future settings fourm</h2>

          </div>

          {/* Feed */}
          <div className=" display-flex flex-row justify-center mb-3">
            <h2 className=" col-md-10 bg-dark text-light p-3 mt-2 mb-5">
              Viewing {userParam ? `${user.username}'s` : 'your'} profile.
            </h2>

            <div className="col-12 col-md-10 mb-5">
              <ThoughtList
                thoughts={user.thoughts}
                title={`${user.username}'s thoughts...`}
                showTitle={false}
                showUsername={false}
              />
            </div>

            {!userParam && (
              <div
                className="col-12 col-md-10 mb-3 p-3"
                style={{ border: '1px dotted #1a1a1a' }}
              >
                <ThoughtForm />
              </div>
            )}
          </div>
          
        </div>
      ) : (
        // If not logged in, prompt user to log in
        <h2>Please log in to see this</h2>
      )}
    </div>
  );
};

export default Profile;