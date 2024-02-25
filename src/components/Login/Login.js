import React, {useContext, useState, useEffect, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../contextapi/auth-context';
import Input from '../UI/input/input';

function emailreducer(state , action){
 if(action.type==='UserEmail'){
  return {value : action.val, isValid:action.val.includes('@')}
 }if(action.type==='InputBlur'){
  return {value : state.value, isValid:state.value.includes('@')}
 }
 return state
}

function passReducer(state , action){
  if(action.type==='UserPass'){
   return {value : action.val, isValid:action.val.length>6}
  } if (action.type === 'InputBlurPass') {
    return { value: state.value, isValid: state.value.length > 6 };
  }
  return state;
 }

 function clgreducer(state,action){
  if(action.type === 'Input_Clg'){
    return {value:action.val ,isValid : action.val.trim().length>3}
  }if(action.type === 'clg_blur'){
    return {value:state.value ,isValid : state.value.trim().length>3}
  }

 else{
  return {val:'',isValid:false}
 }
  
 }


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState(false);
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [clgIsValid, setclgIsValid] = useState(false);
  // const [enteredclg,setenteredclg] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  
  const [UserenteredEmail,UserdispatchedEmail] = useReducer(emailreducer , {val:'', isValid:false})
  const [Userenteredpass,Userdispatchedpass] = useReducer(passReducer , {val:'', isValid:false})
  const [UserEnteredClg,dispatchedUserClg] = useReducer(clgreducer,{val:'',isValid:false})
  // useEffect(() => {
  //   if (enteredPassword.trim().length > 6) {
  //     setPasswordIsValid(true);
  //   } else {
  //     setPasswordIsValid(false);
  //   }
  // }, [enteredPassword]);

  // useEffect(() => {
  //   if (enteredclg.trim().length > 3) {
  //     setclgIsValid(true);
  //   } else {
  //     setclgIsValid(false);
  //   }
  // }, [enteredclg]);

  useEffect(()=>{
   const identifier = setTimeout(()=>{
    // console.log("inside indentifier")
    setFormIsValid(
      UserenteredEmail.isValid && Userenteredpass.isValid && UserEnteredClg.isValid
      );
   },500)

   return ()=>{
    // console.log("inside retirn")
    clearTimeout(identifier)
   }
  },[UserenteredEmail.isValid, Userenteredpass.isValid ,UserEnteredClg.isValid])


 const  authCtx = useContext(AuthContext)
  

  const emailChangeHandler = (event) => {
    UserdispatchedEmail({type:'UserEmail',val:event.target.value})
  };
 
  const passwordChangeHandler = (event) => {
    Userdispatchedpass({type:'UserPass', val:event.target.value});
 
  };
  const clgChangeHandler = (event) => {
    dispatchedUserClg({type:"Input_Clg" ,val:event.target.value});
 
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(UserenteredEmail.isValid);
    UserdispatchedEmail({type:'InputBlur'});
  };

  const validatePasswordHandler = () => {
    Userdispatchedpass({type:'InputBlurPass'});
  };
  const validateclgHandler = () => {
    dispatchedUserClg({type:'clg_blur'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(UserenteredEmail.val, Userenteredpass.val, UserEnteredClg.val);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id='email' label="E-mail" isValid={UserenteredEmail.isValid} value= {UserenteredEmail.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} ></Input>
        <Input id='password' label="password" isValid={Userenteredpass.isValid} value= {Userenteredpass.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} ></Input>
        <div
          className={`${classes.control} ${
            UserEnteredClg.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="CollegeName">CollegeName</label>
          <input
            type="text"
            id="collegename"
            value={UserEnteredClg.val}
            onChange={clgChangeHandler}
            onBlur={validateclgHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
