import React, { useEffect, useState } from 'react'
import {MainLayout} from '../../components/layout/MainLayout'
import { Button, Container, Form } from 'react-bootstrap'
import { CustomInput } from '../../components/customInput/CustomInput'
import { toast } from 'react-toastify'
import {auth, db} from "../../config/firebase-config"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from './userAction'
import {  Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    user?.uid && navigate("/");
  }, [user.uid]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginUser(form));
  };

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Samsmith@email.com",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "xxxxxxxxxx",
      required: true,
    },
  ];

  

  return (
    <MainLayout>
      <Container className="mt-5">
        <Form
          onSubmit={handleOnSubmit}
          className="border p-5 shadow-lg rounded m-auto bg-light  mb-3"
          style={{ width: "400px" }}
        >
          <h3 className="text-primary fw-bolder mb-3">
            Welcome Back to Comunity
          </h3>

          <div className="mt-5">
            {inputs.map((item, i) => (
              <CustomInput key={i} {...item} onChange={handleOnChange} />
            ))}
            </div>

            <div className="d-grid">
            <Link to ="/password_reset" className='nav-link'>
          <p className='text-end'>Forget Password?</p>
          </Link>
            </div>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Login 
              </Button>
            </div>
          
          <div className="d-grid mt-4 ">
            <p>Not yet registered?</p>
          <Link to ="/signup" className='d-grid'>
          <Button>Register Now!</Button>
          </Link>
          </div>
         
        </Form>
        
      </Container>
    </MainLayout>
  );
};

export default SignIn;
