import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '../../utils/mutations';


const CommentList = ({ thoughtId, comments = [] }) => {

  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  const [deleteComment, { error, data }] = useMutation(DELETE_COMMENT);

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments
      </h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>

                  

                  <button onClick={() => {

                      deleteComment({
                        variables: {
                          thoughtId,
                          commentId: comment._id
                        }
                      }).then(() => {
                        console.log('reload page or refetch comments');
                        window.location.reload();
                      }).catch((err) => {
                        console.log(err);
                      });

                  }}>delete</button>



                  
                </h5>
                <p className="card-body">{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
