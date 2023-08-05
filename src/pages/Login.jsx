import React, { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  
  const navigate = useNavigate(), dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);

  useEffect(() => {
    if(user || isSuccess) {
      navigate('/dashboard');
      dispatch(reset());
    } else if(isError) {
      toast.error(message);
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = event => {
    event.preventDefault();
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = event => {
    event.preventDefault();
    const userData = { email, password };
    dispatch(loginUser(userData));
  };

  if(isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
        <section className='heading'>
            <h3><FaSignInAlt /> Login</h3>
            <p>Enter Account Details</p>
        </section>

        <section className='form'>
          <div className='form-group'>
            <input type="text" className='form-control' 
                  id='email' name='email' value={email} 
                  placeholder='Enter Email' onChange={onChange}/>
          </div>
          <div className='form-group'>
            <input type="password" className='form-control' 
                  id='password' name='password' value={password} 
                  placeholder='Enter Password' onChange={onChange}/>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block' onClick={onSubmit}>Submit</button>
          </div>
        </section>
    </>
  );
};

export default Login;