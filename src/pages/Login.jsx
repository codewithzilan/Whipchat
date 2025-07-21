import React, { useState } from 'react'
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoginImage from '../assets/login.png'
import GoogleLogo from '../assets/googlelogo.png'
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
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
  width: "60%",
  marginTop: "34px"
});

const MuiButton = styled(Button)({
  width: "60%",
  backgroundColor: "#ae2d78",
  color: "#FFFFFF",
  fontSize: "14px",
  fontFamily: "Nunito",
  fontWeight: "400",
  borderRadius: "86px",
  padding: "16px 0px",
  marginTop: "34px",
});


const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  let navigate = useNavigate()

  let [showpass, setShowPass] = useState(false)
  let [loader, setLoader] = useState(false)

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [forgetemail, setForgetEmail] = useState("")

  let [emailerror, setEmailError] = useState("")
  let [passworderror, setPasswordError] = useState("")
  let [forgetemailerror, setForgetEmailError] = useState("")

  let [forgetnewui, setForgetNewUi] = useState(true)




  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  }

  let handleLogin = () => {
    if (!email) {
      setEmailError("*Email is required");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("*Your email is incorrect")
    }

    if (!password) {
      setPasswordError("*Password is required")
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)) {
      setPasswordError("**Ensure that your password have [a-z],[A-Z],special charecters[@$!%*?&],numbers[0-9] & must be 8-16 digits")
    }

    if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      password && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)) {
      setLoader(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setEmail("")
          setPassword("")
          toast.success('Login Successful');
          setLoader(false)
          setTimeout(() => {
            navigate('/homepage')
          }, 3000)
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/invalid-credential")) {
            toast.error("Email or Passsword doesn't match");
            setLoader(false)
          } else if (errorCode.includes("auth/too-many-requests")) {
            toast.error('Too Many Attempts.Try Again Later')
            setLoader(false)
          }
        });
    }
  }

  let handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success('Login Successful');
        setTimeout(() => {
          navigate('/pages/home')
        }, 3000)
      })

      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  }



  let handleForgetPassword = () => {
    setForgetNewUi(false)
  }

  let handleForgetEmail = (e) => {
    setForgetEmail(e.target.value);
    setForgetEmailError("");
  }

  let handleBack = () => {
    setForgetNewUi(true)
  }

  let handleSend = () => {
    if (!forgetemail) {
      setForgetEmailError("*Give a Email");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(forgetemail)) {
      setForgetEmailError("*Your email is incorrect")
    }
    sendPasswordResetEmail(auth, forgetemail)
      .then(() => {
        toast.error('Check Your Gmail For Update Password')
        setTimeout(() => {
          setForgetNewUi(true)
        }, 5000)

      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode.includes("auth/too-many-requests")) {
          toast.error('Try Again Later');
        }

      });
  }


  return (
    <>

      {
        forgetnewui
          ?
          <Grid container>
            <Grid size={6}>
              <div className='reg-content-box'>
                <div className='reg-content'>
                  <h2>Login to your account!</h2>
                  <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                  />

                  <div onClick={handleGoogle} className='logo-box'>
                    <img src={GoogleLogo} alt="" />
                    <p>Login with Google</p>
                  </div>
                  <CssTextField onChange={handleEmail} id="outlined-basic" label="Email Address" variant="outlined" placeholder='someone@gmail.com' />
                  {
                    emailerror && <p className='error-message'>{emailerror}</p>
                  }

                  <div className='pass-icon-box'>
                    <CssTextField onChange={handlePassword} id="outlined-basic" label="Password" variant="outlined" type={showpass ? 'text' : 'password'} />
                    <div onClick={() => setShowPass(!showpass)} className='icon-box-log'>
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

                  <div style={{ display: 'inline-block' }}>
                    <p><Link to='/' style={{ textDecoration: 'none' }}>Don't have an account ?</Link> <Link to='/' style={{ textDecoration: 'none' }}><span>Sign Up</span></Link></p>
                  </div>
                  <h4 onClick={handleForgetPassword} className='forget-password'>Forget Password</h4>

                </div>
              </div>

            </Grid>
            <Grid size={6}>
              <img className='reg-img' src={LoginImage} alt="" />
            </Grid>
          </Grid>
          :
          <div className='new-page-forgot-pass'>
            <div className='forget-box'>

              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />

              <CssTextField onChange={handleForgetEmail} id="outlined-basic" label="Email Address" variant="outlined" placeholder='someone@gmail.com' />
              {
                forgetemailerror && <p className='error-message' >{forgetemailerror}</p>
              }

              <div className='forget-button'>
                <MuiButton onClick={handleBack} variant="contained">Back to Login</MuiButton>
                <MuiButton onClick={handleSend} variant="contained">Send</MuiButton>
              </div>

            </div>
          </div>

      }
    </>
  )
}

export default Login