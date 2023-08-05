import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGoal } from '../features/goals/goalSlice';

const GoalForm = () => {

  const [goalText, setGoalText] = useState('');
  const navigate = useNavigate(), dispatch = useDispatch();

  const onSubmitForm = event => {
    event.preventDefault();
    dispatch(createGoal({ goalText }));
    resetGoalText();
  }

  const resetGoalText = () => setGoalText('');

  return (
    <section className="form">
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input type="text" name="text" value={text} placeholder="Enter a Goal"
            onChange={event => setGoalText(event.target.value)}/>
        </div>
        <div className="form-group">
          <button className="btn btn block" type="submit">Add Goal</button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;