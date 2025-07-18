import React, { useState } from 'react'
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import RegistrationImage from '../assets/registration.png'
import { Link, useNavigate } from 'react-router-dom';
import { RiEyeCloseLine } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
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


const Registration = () => {
  const auth = getAuth();

  let navigate = useNavigate()

  let [showpass, setShowPass] = useState(false)
  let [loader, setLoader] = useState(false)

  let [email, setEmail] = useState("")
  let [name, setName] = useState("")
  let [password, setPassword] = useState("")

  let [emailerror, setEmailError] = useState("")
  let [nameerror, setNameError] = useState("")
  let [passworderror, setPasswordError] = useState("")

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }
  let handleName = (e) => {
    setName(e.target.value);
    setNameError("");
  }
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  }

  let handleSignUp = () => {
    if (!email) {
      setEmailError("*Email is required");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("*Your email is incorrect")
    }

    if (!name) {
      setNameError("*Name is required")
    }

    if (!password) {
      setPasswordError("*Password is required")
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)) {
      setPasswordError("*Ensure that your password have [a-z],[A-Z],special charecters[@$!%*?&],numbers[0-9] & must be 8-16 digits")
    }

    if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && name &&
      password && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)) {
        setLoader(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          if (user.user.emailVerified) {
           console.log('');
          } else {
            toast.error("Check Your Gmail & Verify Email")
          }

          sendEmailVerification(auth.currentUser)
            .then(() => {
              setEmail("")
              setName("")
              setPassword("")
              toast.success('New Account is Created');
              setLoader(false)
              setTimeout(() => {
                navigate('/login')
              }, 3000)
            });
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
            <h2>Get started with easily register</h2>
            <p>Free register and you can enjoy it</p>
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

            <CssTextField value={email} onChange={handleEmail} id="outlined-basic" label="Email Address" variant="outlined" placeholder='someone@gmail.com' />
            {
              emailerror && <p className='error-message'>{emailerror}</p>
            }

            <CssTextField value={name} onChange={handleName} id="outlined-basic" label="Full Name" variant="outlined" />
            {
              nameerror && <p className='error-message'>{nameerror}</p>
            }

            <div className='pass-icon-box'>
              <CssTextField value={password} onChange={handlePassword} id="outlined-basic" label="Password" variant="outlined" type={showpass ? 'text' : 'password'} />
              <div onClick={() => setShowPass(!showpass)} className='icon-box'>
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
                <MuiButton onClick={handleSignUp} variant="contained">Sign up</MuiButton>
            }
            <p><Link to='/login' style={{ textDecoration: 'none' }}>Already  have an account ?</Link> <Link to='/login' style={{ textDecoration: 'none' }}><span>Sign In</span></Link></p>
          </div>
        </div>

      </Grid>
      <Grid size={6}>
        <img className='reg-img' src={RegistrationImage} alt="" />
      </Grid>
    </Grid>
  )
}

export default Registration