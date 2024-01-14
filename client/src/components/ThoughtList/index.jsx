import { Link } from 'react-router-dom';
 import { DELETE_THOUGHT } from '../../utils/mutations';
 import { useMutation } from '@apollo/client';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {

  if (!thoughts.length) {
    return <h3>No Idea Yet</h3>;
  }

  const [deleteThought, { error, data }] = useMutation(DELETE_THOUGHT);

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    Posted on {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this thought on {thought.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>





                <button  onClick={() => {

                 deleteThought({
                 variables: {
                 thoughtId: thought._id
                 
                            }
                 }).then(() => {
                 console.log('reload page or refetch thoughts');
                 window.location.reload();
                 }).catch((err) => {
                  console.log(err);
                 });

                  }} 

                 class="btn btn-primary btn-block py-1" type="submit" >delete</button>



            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Join the discussion on this thought.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;