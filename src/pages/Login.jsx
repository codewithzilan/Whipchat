import React, { useState } from 'react'
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoginImage from '../assets/login.png'
import GoogleLogo from '../assets/googlelogo.png'
import { Link } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';



const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#11175D',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ae2d78',
    },
  },
  width:"60%",
  marginTop:"34px"
});

const MuiButton = styled(Button)({
  width:"60%",
  backgroundColor:"#ae2d78",
  color:"#FFFFFF",
  fontSize:"14px",
  fontFamily:"Nunito",
  fontWeight:"400",
  borderRadius:"86px",
  padding:"16px 0px",
  marginTop:"34px",
});


const Login = () => {
  const auth = getAuth();
  
  let [showpass,setShowPass]=useState(false)
  let [loader,setLoader]=useState(false)

  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")

  let [emailerror,setEmailError]=useState("")
  let [passworderror,setPasswordError]=useState("")
  
  
  let handleEmail= (e)=>{
      setEmail(e.target.value);
      setEmailError("");
  }
  let handlePassword= (e)=>{
      setPassword(e.target.value);
      setPasswordError("");
  }
  
  let handleLogin= ()=>{
    if(!email){
        setEmailError("*Email is required");
    }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setEmailError("*Your email is incorrect")
    }
    
    
    if(!password){
        setPasswordError("*Password is required")
    }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)){
        setPasswordError("**Ensure that your password have [a-z],[A-Z],special charecters[@$!%*?&],numbers[0-9] & must be 8-16 digits")
    }

    if(email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
        password && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)){
            setLoader(true)
          signInWithEmailAndPassword(auth, email, password)
             .then((userCredential) => {
              setEmail("")
              setName("")
              setPassword("")
              toast.success('Login Successful');
              setLoader(false)
              // setTimeout(()=>{
              //   navigate('/login')
              // },3000)
    
            })
            .catch((error) => {
             const errorCode = error.code;
             console.log(errorCode);
             
       
            });
          
          
          
        }
  }

  return (
    <Grid container>
        <Grid size={6}>
            <div className='reg-content-box'>
               <div className='reg-content'>
                   <h2>Login to your account!</h2>
                   <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    />
                   <div className='logo-box'>
                    <img src={GoogleLogo} alt="" />
                    <p>Login with Google</p>
                   </div>
                   <CssTextField onChange={handleEmail} id="outlined-basic" label="Email Address" variant="outlined" placeholder='someone@gmail.com' />
                   {
                    emailerror && <p className='error-message'>{emailerror}</p>
                   }


                  <div className='pass-icon-box'>
                        <CssTextField onChange={handlePassword} id="outlined-basic" label="Password" variant="outlined" type={showpass?'text':'password'} />
                      <div onClick={()=> setShowPass(!showpass)} className='icon-box-log'>
                        {
                          showpass
                          ?
                          <FaRegEye />
                          :
                          <RiEyeCloseLine />
                        }
                      </div>
                       {
                         passworderror && <p className='error-message'>{passworderror}</p>
                       }
                    </div>

                    {
                    loader
                    ?
                    <div className='loader-spin'>
                    <Bars
                    height="40"
                    width="40"
                    color="#C70039"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass="bars-wrapper"
                    visible={true}
                    />
                    </div>
                    :
                    <MuiButton onClick={handleLogin} variant="contained">Login to continue</MuiButton>
                    }

                   <p>Don't have an account ? <Link to='/' style={{textDecoration:'none'}}><span>Sign Up</span></Link></p>
               </div>
            </div>
           
         
        </Grid>
        <Grid size={6}>
            <img className='reg-img' src={LoginImage} alt="" />
        </Grid>
      </Grid>
  )
}

export default Login