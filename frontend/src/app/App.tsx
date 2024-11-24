import './App.scss';
import AppRoutes from '../routes';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => (
  <>
    <ToastContainer position="bottom-right" hideProgressBar={true} />
    <AppRoutes />
  </>
);

export default App;
