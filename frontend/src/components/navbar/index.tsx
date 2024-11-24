import { Link } from 'react-router-dom';
import './index.scss';

const Navbar: React.FC = () => {
  return (
    <nav id="navbar">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="brand">
              <Link to="/">
                <img src="/logo.png"></img>
              </Link>
            </div>
          </div>
          <div className="col-8 d-flex align-items-center justify-content-end">
            <Link to="/rides">Minhas Viagens</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
