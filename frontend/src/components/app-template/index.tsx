import { Outlet } from 'react-router-dom';
import { Footer } from '../footer';
import { Navbar } from '../navbar';
import './index.scss';

const AppTemplate: React.FC = () => {
  return (
    <>
      <div className="relative">
        <Navbar />
      </div>
      <div className="template-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export { AppTemplate };
