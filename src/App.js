// import logo from './logo.svg';
import top from './img/top.png';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import React from 'react';
import Ad from './screens/ad';
import Main from './screens/main';
import Login from './screens/login';
import CreateAd from './screens/create';
import EditAd from './screens/edit';
import Profile from './screens/profile';
import Ads from './screens/ads';
import Category from './screens/category';
import About from './screens/about';
import Articles from './screens/articles';
import Article from './screens/article';
import Wallet from './screens/wallet';
import Contacts from './screens/contacts';
import Register from './screens/register';
import './dist/css/bootstrap.min.css';
import './blog.css';
import 'antd/dist/antd.css';
import "./App.css";
import 'react-gallery-carousel/dist/index.css';
import Settings from './screens/userSettings';
import 'antd/dist/antd.css';
import Wallets from './screens/wallets';
import ForgotPassword from './screens/forgot_password';
import SearchResult from './screens/search_result';
import 'moment/locale/ru';
import Favorites from './screens/favorites';
import Footer from './components/footer';
import UserAds from './screens/user_ads';
// import SubCategory from './screens/sub_category';
// import SubSubCategory from './screens/sub_sub_category';

const App = ({match}) => {
    return(
      // url('https://www.house.kg/build/images/banners/branding-left-imarat-20-may.e320d43f.png')
      // url('https://www.house.kg/build/images/banners/branding-left-imarat-20-may.e320d43f.png')
      <div className="container-fluid">
        <div className="row">
            <div className="col-lg-1 px-0 d-none d-lg-block text-white text-center" 
              style={{backgroundSize : "auto", backgroundPosition: "right top", 
                backgroundImage: "",
                backgroundRepeat: "no-repeat"}}>
            </div>
            <div className="col-lg-10 px-0" style={{ backgroundColor: '#fff',minHeight:"500px"}}>
            <div className="col-lg-12 bg-success px-0 text-white text-center">
                <img src={top} width="100%"/>
            </div>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/products/create" component={CreateAd}/>
                <Route path="/products/:id/edit" component={EditAd} />
                <Route path="/products/:id" component={Ad}/>
                <Route path="/products" component={Ads}/>
                <Route path="/products/create" component={CreateAd} />
                <Route path="/register" component={Register}/>
                <Route path="/profile"  component={Profile}/>
                <Route path="/favorites" component={Favorites}/>
                <Route path="/category/:id" component={Category}/>
                {/* <Route path="/sub_category/:id" component={SubCategory}/>
                <Route path="/sub_sub_category/:id" component={SubSubCategory}/> */}
              <Route path="/about_us" component={About} />
              <Route path="/contacts" component={Contacts} />
              <Route path="/login" component={Login} />
              <Route path="/settings" component={Settings} />
              <Route path="/forgot_password" component={ForgotPassword} />
              <Route path="/wallets" component={Wallets} />
              <Route path="/wallet" component={Wallet} />
              <Route path="/articles" component={Articles} />
              <Route path="/article" component={Article} />
              <Route path="/search_result/:search" component={SearchResult} />
              <Route path={"/userAds/:id"} component={UserAds}/>
              {/* <Route path="/search_result/:search/products/:id" component={Ad}/> */}
            </Switch>
          </BrowserRouter>
        </div>
        <div className="col-lg-1 px-0 d-none d-lg-block text-white text-center"
          style={{
            backgroundSize: "auto",
            backgroundImage: "",
            backgroundRepeat: "no-repeat"
          }}></div>
      <Footer/>
      </div>
    </div>
  );
}
export default App;
