import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomePage = () => {

  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <>
      <section className='heading'>
              <h3>Welcome to GoalTracker App</h3>
              <p>Get Started with your account</p>
      </section>
      <section>
        <div className='form-group'>
            <Link to='/register'><button type='submit' className='btn btn-block'>Register</button></Link>
            <Link to='/login'><button type='submit' className='btn btn-block'>Login</button></Link>
        </div>
      </section>
    </>
  )
}

export default HomePage;