import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import {firebase, auth} from "../config/firebase_config";
import * as firebaseui from "firebaseui";
import ApiClient from "../api/ApiClient";
import { register} from "../api/user";
import Footer from "../components/footer";
import { SelectPicker } from "rsuite";

const countryCodes = [
    {"value": "+996", "label": "+996"},
    {"value": "+7", "label": "+7"},
];

const Register = () => {
    // Inputs
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState('');
    const [showValidation, setShowValidation] = useState(true);
    const [showOTP, setShowOTP] = useState(false);
    const [final, setFinal] = useState('');
    const [showRegisterFields, setRegisterFields] = useState(false); 
    const [userName,setUserName] = useState();
    const [timer,setTimer] = useState(59);
    const [userPassword,setPassword] = useState();
    const [passwordCheck,checkPassword] = useState();
    const [uuid,setUuid] = useState();
    const [countrycode,setCountryCode] = useState();
    const signIn = () => {
        if (phoneNumber === "" || phoneNumber.length < 9) return;

        auth.signInWithPhoneNumber(`+${countrycode+phoneNumber}`, window.verify).then((result) => {
            setFinal(result);
            alert("Код потверждения отправлен");
            setShowValidation(false);
            setShowOTP(true);
            var t = 59;
            function i(){
                
                t-=1;
                setTimer(t);
            }
            function time(){
             if(t>0){
            var time = setInterval(i,1000);
             }else if(t<=0){
                clearInterval(time);
                alert("Время вышло!");
                setShowOTP(false);
                setShowValidation(true);
             }
            }
            time();
            setTimeout(time,59000);
        }).catch((err) => {
                alert(err);
                window.location.reload()
            });
    };

    const validateOtp = () => {
    
        if (otp === null || final === null)
            return;
        final.confirm(otp).then((result) => {
            alert("Код потверждения выслан");
            setRegisterFields(true);
            setShowOTP(false);
            setUuid(result.user.uuid);
            // result.user.uuid;
            
            console.log('success ', result);
        }).catch((err) => {
            alert("Код потверждения введен неверно!");
        })
    }
    const addUser = async () =>{
        if(userPassword === passwordCheck){
            const params = {
                'name': userName,
                'password': userPassword,
                'phone':countrycode + phoneNumber,
                'uuid': uuid,
            };
            console.log('params', params);
            const result = await register(params, function (data) {
                localStorage.setItem('token', data.api_token);
                window.location.href = '/profile';
            }, function (data) {
                console.log("Error");
            });
        }else{
            alert("Неправильный пароль");
        }
    }
    useEffect(() => {
        window.verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        window.verify.render();
    }, []);

    return(
        <div>
            <Navbar/>
            <div className="col-md-12 d-flex justify-content-center" style={{height:500}}>   
                    <div className="form-group col-md-6 border my-3 py-3 px-3" style={{ display: showValidation ? "block" : "none" , height:350}}>
                    <h4 className="text-center">Регистрация</h4>
                    <div className="row px-3 mt-4">    
                        <select className="form-control col-md-3" onChange={(e)=>{setCountryCode(e.target.value)}}>
                            <option selected disabled>код страны</option>
                            <option value="996">+996</option>
                            <option value="7">+7</option>
                        </select>        
                        <input type="number" className="form-control col-md-9" value={phoneNumber} onChange={(e) => { 
                        setPhoneNumber(e.target.value) }}
                            placeholder="Телефон" />
                    </div>        
                        <div className="mt-3" id="recaptcha-container"></div>
                        <button className="btn btn-outline-primary mt-3" onClick={signIn}>Зарегистрироваться</button>  
                    </div>
                    <div className="form-group col-md-6" style={{ display: showOTP ? "block" : "none" }}>
                        <input className="form-control" type="text" placeholder={"Код потверждения"}
                            onChange={(e) => { setOtp(e.target.value) }}></input>
                        <br /><br />
                        <div className="text-secondary">{":"+timer}</div>
                        <button className="form-control" onClick={validateOtp}>Подтвердить</button>
                    </div>
                    <div className="form-group col-md-6" style={{ display: showRegisterFields ? "block" : "none",height:350 }}>
                        <input className="form-control mt-3" placeholder="Имя" value={userName} 
                        onChange={(e) =>{setUserName(e.target.value)}} />
                        <input className="form-control mt-3" placeholder="пароль" value={userPassword}
                        onChange={(e) =>{setPassword(e.target.value)}}
                        />
                        
                        <input className="form-control mt-3" placeholder=" повторить пароль" value={passwordCheck}
                        onChange={(e) =>{checkPassword(e.target.value)}}
                        />
                        <button className="btn btn-outline-primary mt-3" onClick={addUser}>Сохранить изменения</button>
                    </div>

            </div>
            <Footer/>
        </div>
    );
}

export default Register;