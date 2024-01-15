import { Link } from 'react-router-dom';
import { DELETE_THOUGHT } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

// Delete button
const DeleteThoughtButton = ({ thoughtId, deleteThought }) => {
  const handleDelete = async () => {
    try {
      await deleteThought({
        variables: {
          thoughtId: thoughtId
        }
      });
      console.log('Reload page or refetch thoughts');
      // You might want to use Apollo Client's cache to update the UI without a full reload
      // For simplicity, this example uses a full page reload
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
};

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
          // start of each thought section
          <article key={thought._id} className="mb-3">
            {/* Comment Section */}
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>

            <header className="card-header bg-primary text-light p-2 m-0">
              <div className="uk-grid-medium uk-flex-middle uk-grid" uk-grid="">
                <h4 className="uk-comment-title uk-margin-remove">
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
                <div className="uk-width-expand">
                  <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                    <li>
                    <Link
                        className="btn btn-primary btn-block btn-squared"
                        to={`/thoughts/${thought._id}`}
                      >
                        Join the discussion on this thought.
                      </Link>
                    </li>
                    <li>
                    <DeleteThoughtButton thoughtId={thought._id} deleteThought={deleteThought} />
                    </li>
                  </ul>
                </div>
              </div>
            </header>
          </article>
        ))}
    </div>
  );
};

export default ThoughtList;
