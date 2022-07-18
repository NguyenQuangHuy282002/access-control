import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from './LoginForm';
Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleSubmit = async (val) => {
    try {
      const action = login(val);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return <LoginForm handleSubmit={handleSubmit} />;
}

export default Login;
