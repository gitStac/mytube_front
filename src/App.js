import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Topbar from './components/navbar/Topbar'
import Home from './components/home/home/Home';
import Search from './components/search/Search';
import VideoCombine from './components/onevideo/VideoCombine';
import Help from './components/help/Help';
import Account from './components/account/Account';
import Channels from './components/account/Channels';
import Subscription from './components/account/Subscription';
import SignIn from './components/sign/SignIn';
import SignUp from './components/sign/SignUp';
import axios from 'axios';
import Upload from './components/upload/Upload';
import SelectChannel from './components/upload/SelectChannel';
import { useSelector } from 'react-redux';
axios.defaults.withCredentials = true;

// _redirects in public and netlify.toml files only create for netlify

function App() {
  const storeInfo = useSelector((state) => state.info)
  return (
    <div className={storeInfo.theme}>
      <Topbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search/:searchData' element={<Search />} />
        <Route path='/video/:id' element={<VideoCombine />} />
        <Route path='/help' element={<Help />} />
        <Route path='/account' element={storeInfo.isLogin ? <Account /> : <SignIn />} />
        <Route path='/channel' element={storeInfo.isLogin ? <Channels /> : <SignIn />} />
        <Route path='/subscription' element={storeInfo.isLogin ? <Subscription /> : <SignIn />} />
        <Route path='/signin' element={!storeInfo.isLogin ? <SignIn /> : <Home />} />
        <Route path='/signup' element={!storeInfo.isLogin ? <SignUp /> : <Home />} />
        <Route path='/videosec' element={storeInfo.isLogin ? <SelectChannel /> : <SignIn />} />
        <Route path='/upload' element={storeInfo.isLogin ? <Upload /> : <SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
