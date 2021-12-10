import img from '../img/logo.png';
import top from '../img/top.png';
import React from "react";
import {Link, useHistory } from "react-router-dom";
import { Button } from '@mui/material';

const Navbar = () => {
    
    const history = useHistory();

    const navigateTo = (page) => {
      history.push(page);
    };
    const token = localStorage.getItem('token');
    const logOut = ()=>{
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return (
      <div>
        <div class="container-fluid">
          <div>            
          <header class="blog-header py-3">
            <div class="row flex-nowrap justify-content-between align-items-center">
              <div class="col-4 col-md-3 text-center">
                <a class="blog-header-logo text-success" href="/"><img src={img} width="100%"/></a>
              </div>
              <div class="col-6 d-md-flex justify-content-end align-items-center">
                {token == null ?
                <> 
                <Button onClick={() => navigateTo('/register')} variant="outlined" size="small" disableElevation className="mr-2">Регистрация</Button>
                <Button onClick={() => navigateTo('/login')} variant="outlined" size="small" disableElevation className="mr-2">Войти</Button> 
                </>
                : 
                <>
                <a class="nav-link dropdown-toggle mr-3" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                  Личный кабинет
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a onClick={() => navigateTo('/profile')} class="dropdown-item">Личный кабинет</a>
                  <a onClick={() => navigateTo('/settings')} class="dropdown-item">Настройки</a>
                  <div class="dropdown-divider"></div>
                  <a onClick={logOut} class="dropdown-item">Выйти</a>
                </div>
                <Button onClick={() => navigateTo('/products/create')} variant="contained" size="small" disableElevation>Добавить рекламу +</Button>
                </>  
                }
                
              </div>
            </div>
          </header>
          <div class="nav-scroller mb-2 rounded px-2 py-1"  style={{backgroundColor:'#000fa6'}}>
            <nav class="nav d-flex justify-content-between">
              <a class="p-2 text-white" href="/about-us">О нас</a>
              <a class="p-2 text-white" href="products">Объявления</a>
              <a class="p-2 text-white" href="/articles">Статьи</a>
              <a class="p-2 text-white" href="/contacts">Контакты</a>
              <a class="p-2 text-white" href="/ad-manage">Рекламодателям</a>
            </nav>
          </div>
        </div>
          <hr/>  
        </div>

      </div>
    );
}
export default Navbar;