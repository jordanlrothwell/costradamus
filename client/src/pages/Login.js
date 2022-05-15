import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

// pages
import LoginForm from '../components/LoginForm/LoginForm';

export default function Login() {
  return (
    <LoginForm/>
  )
}