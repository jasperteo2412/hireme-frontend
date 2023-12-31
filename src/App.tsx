import 'react-toastify/dist/ReactToastify.css';
import './app.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { axiosInterceptors } from './apis/axiosConfig';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AppRoutes from './routes';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';

export const App = () => {

  const paddingTop = '90px';

  // SET JWT TOKEN
  axiosInterceptors();
  

  const loggedIn = sessionStorage.getItem("TOKEN") !== null? true : false  ;

  return (
    <BrowserRouter basename={""}>
      <Navbar showItems={loggedIn} />
      <div className="app-container" style={{ paddingTop, paddingBottom: "80px" }}>
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
        <div className="container-fluid view-container" id="app-view-container" style={{minHeight: "100vh"}}>
          <AppRoutes />
        </div>
      </div>
      <Footer showItems={loggedIn} />
    </BrowserRouter>
  );
};

export default App;
