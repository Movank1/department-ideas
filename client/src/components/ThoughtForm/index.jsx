import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation
  (ADD_THOUGHT, {
    refetchQueries: [
      QUERY_THOUGHTS,
      'getThoughts',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username 
          thoughtAuthor: Auth.getProfile().authenticatedPerson.username
        },
      });

      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>

      {Auth.loggedIn() ? (
          <>
          <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}>
          <div className="col-12 col-lg-9">
            <textarea
              name="thoughtText"
              placeholder="Here's a new thought..."
              value={thoughtText}
              className="form-input w-100"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-12 col-lg-3">

            <button class="uk-button uk-button-default btn btn-primary btn-block py-3">Add Thought</button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form></>
    
      ) : (
        <h2 class="uk-position-center uk-overlay .uk-text-decoration-none ">
          Please <a class=" .uk-text-uppercase" href='/login'> login </a> to share your  idea
        </h2>
      )}
    </div>
  );
};

export default ThoughtForm;