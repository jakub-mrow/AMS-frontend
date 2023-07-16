import React, { useState } from 'react'
import RegisterForm from '../components/register/RegisterForm';
import LoginPanel from '../components/login/LoginPanel';

const Register = () => {
    
    return (
        <div className="flex w-full h-screen">
            <div className="hidden lg:flex flex-col h-full w-1/2 items-center justify-center bg-primary">
                <LoginPanel/>
            </div>
            <div className="w-full flex flex-col items-center justify-center lg:w-1/2 p-50">
                <RegisterForm/>
            </div>
        </div>
    )
}

export default Register;