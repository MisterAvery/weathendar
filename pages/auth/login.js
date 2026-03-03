import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import {loginUser, isEmailInUse} from '@/backend/Auth'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'

// auth/login

const Login = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter();


  async function handleLogin() {
    // If the username and password are correct, then set the user to the current user
    try {
      let newUser = await loginUser(email, password);
      setUser(newUser);
     
      router.push('/dashboard');
    } catch(err) {
        console.log('Error logging in', err);
        alert("There was an error logging you in. Please try again or create an account.");
    }
  }


  return (
    <>
    <Navbar></Navbar>
    <Section>
      <div>
        <Title>Login</Title>
        <br></br>
        <h3>Welcome back! We're ready if you are</h3>
        <br/>
        <br/>
        <InputWrapper>
          <InputTitle>Email</InputTitle>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </InputWrapper>
        <InputWrapper>
          <InputTitle>Password</InputTitle>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </InputWrapper>

        <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='/legal/terms-of-use' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='/legal/privacy-policy' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>

        <MainButton onClick={handleLogin}>Submit</MainButton>
      </div>
    </Section>
    </>
  )
}

const Section = styled.section`
  width: 45%;
  min-height: 75vh;
  margin: 8vh auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: #f0f5f4;
  padding: 1.5rem;
  border-radius: 4px;
  border: 1px solid black;
  box-shadow: -4px 4px 0 4px #555;
`;

const InputWrapper = styled.div`
  margin: 0.75rem 0;
  display: block;
`;

const Title = styled.h1`
  font-style: italic;
  letter-spacing: 1px;
  font-size: 2.5rem;
  color: white;
  z-index: 0;

  position: relative;
  
  &::after {
    content: '';
    width: 95%;
    height: 120%;
    background: #ffa56f;
    border-radius: 4px;
    position: absolute;
    top: -10%;
    left: -12%;
    z-index: -1;
    transform: skew(14deg);
  }
`;

const Header = styled.h1`
  font-size: 26px;
  color: #ffa56f;
`;

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  padding: 0.25em 0.6em;
  margin-top: 0.1em;
  border-radius: 4px;
`;

const InputTitle = styled.label` /* Changed  to label for semantics */
  display: block;
  font-size: 14px;
  color: black;
`;

const MainButton = styled.button`
  background-color: #ffa56f;
  padding: 0.25rem 0.5rem;
  color: white;
  margin-top: 1rem;
  padding: 0.5em 1em;
  border-radius: 4px;
  border: 1px solid black;

  &:hover {
    background-color: #ea8749;
  }
`;

const UserAgreementText = styled.p`
  font-size: 12px;
  color: #b5b5b5;
  margin-top: 20px;
  text-align: center;
`;

const UserAgreementSpan = styled(Link)`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-of-type)::after {
    content: ', '; /* Adds comma between links */
  }
`;


export default Login