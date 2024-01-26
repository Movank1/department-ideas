import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center justify-space-around">
        <div><img src="/icon.png" alt="Company Logo" /></div>
        <div>
          <Link className="text-light" to="/">
            <h1 className=""><span>Dept. Communication</span></h1>
          </Link>
        </div>
          <button class="uk-button uk-button-default" type="button" uk-toggle="target: #offcanvas-flip">MENU</button>
          <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
              <div class="uk-offcanvas-bar">
                  <button class="uk-offcanvas-close" type="button" uk-close="true"></button>
                  <ul class="uk-nav uk-nav-default">
                    <li class="uk-active"><a href="/me">My Profile</a></li>
                    <li class="uk-active"><a href="/">DashBoard</a></li>
                    <li><a href="/feed">Feed</a></li>
                    <li>
                    {Auth.loggedIn() ? (
                      <>
                      <a href='/' onClick={logout}> Logout</a>
                      </>
                    ) : (
                      <>
                      <a href='/login'> Login</a>  
                      </>
                    )}
                    </li>
                </ul>              
              </div>
        </div>        
    </header>
  );
};

export default Header;
