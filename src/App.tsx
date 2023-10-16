import 'react-toastify/dist/ReactToastify.css';
import './app.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { axiosInterceptors } from './apis/axiosConfig';
import AppRoutes from './routes';

export const App = () => {

  const paddingTop = '60px';

  // SET JWT TOKEN
  axiosInterceptors();

  return (
    <BrowserRouter basename={""}>
      <div className="app-container" style={{ paddingTop }}>
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
        <div className="container-fluid view-container" id="app-view-container">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
