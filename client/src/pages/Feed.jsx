import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';
import Auth from '../utils/auth';

const Feed = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-15 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a', height: '100px' }}
        >
          <ThoughtForm />
        </div>




        <div className="col-12 col-md-8 mb-3">






          {Auth.loggedIn() ? (
            <>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <ThoughtList
                  thoughts={thoughts}
                  title="Project Idea"
                />
              )}
            </>
          ) : (
            <>
            </>
            
            
          )}     

        </div>

        
      </div>
      
    </main>
  );
};

export default Feed;
