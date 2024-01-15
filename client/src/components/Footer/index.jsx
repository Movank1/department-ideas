import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="w-100 mt-auto bg-primary p-4">
      <div role="group" aria-label="1 of 3" aria-roledescription="slide" tabIndex="-1" class="uk-active uk-transition-active">

      <ul class="uk-slideshow-items" aria-live="polite" role="presentation" id="uk-slideshow-17" >
          <li>
              <a href='https://github.com/Movank1'>Movank1</a>
          </li>
          <li>
            <a href='https://github.com/Develepor-Dan'>Develepor-Dan</a>
          </li>
          <li>
              <a href='https://github.com/Muisagara'>Muisagara</a>
          </li>
      </ul>

<a class="uk-slidenav-large uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous="true" uk-slideshow-item="previous"></a>
<a class="uk-slidenav-large uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next="true" uk-slideshow-item="next"></a>

</div>    </footer>
  );
};

export default Footer;
