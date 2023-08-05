import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGoals } from '../features/goals/goalSlice';

const Dashboard = () => {
  const navigate = useNavigate(), dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
      if (!user) {
          navigate('/login');
      }
      dispatch(getGoals());
  }, [user, navigate]);
  
  return (
    <>
      <section className='heading'>
          <h3>Welcome to Goal Tracker app, user {user?.name}</h3>
          <h4>Set new goals, and track existing goals.</h4>
      </section>
    </>
  )
}

export default Dashboard;