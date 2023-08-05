import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, reset } from '../features/auth/authSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPwd: ''
  });

  const { name, email, password, confirmPwd } = formData;

  const navigate = useNavigate(), dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);

  useEffect(() => {
    if(isError) {
      toast.error(message);
    } else if(isSuccess) {
      navigate('/');
      dispatch(reset());
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
    if(confirmPwd !== password) {
      toast.error('Passwords don\'t match');
    } else {
      const userData = { name, email, password };
      dispatch(registerUser(userData));
    }
  };

  if(isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
        <section className='heading'>
            <h3><FaUser /> Register</h3>
            <p>Create an Account</p>
        </section>

        <section className='form'>
          <div className='form-group'>
            <input type="text" className='form-control' 
                  id='name' name='name' value={name} 
                  placeholder='Enter Name' onChange={onChange}/>
          </div>
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
            <input type="password" className='form-control' 
                  id='confirmPwd' name='confirmPwd' value={confirmPwd} 
                  placeholder='Confirm Password' onChange={onChange}/>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block' onClick={onSubmit}>Submit</button>
          </div>
        </section>
    </>
  )
}

export default Register;