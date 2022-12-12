import './App.scss';
import Header from './components/Header/Header';
import User from './components/User/User';
import { Link, Outlet } from "react-router-dom";
import { Provider } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar'
const App = () => {
  return (

    <>
      <div className="app-container">
        <div className="header-container">
          <Header />
        </div>
        <div className='main-container'>
          <div className='sidenav-container'>

          </div>
          <div className='app-content'>
            <PerfectScrollbar>
              <Outlet />
            </PerfectScrollbar>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
