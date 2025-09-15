import React from "react";
import styled from "styled-components";
import Spline from '@splinetool/react-spline';
import { useState } from "react";
import SignIn from "../Components/loginInfo/SignIn";
import SignUp from "../Components/loginInfo/SignUp";


const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
`;
const Left = styled.div`

 flex: 1;
  position: relative;
  width : 70%;
  @media screen and (max-width: 768px) {
    display: none;


`;

const Right = styled.div`
  position: relative;
  flex: 0.9;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex: 1;
  }
`;
const Text = styled.p`
  display: flex;
  gap: 12px;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;
const TextButton = styled.div`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const Auth = ({ openAuth, setOpenAuth }) => {
  const [login, setLogin] = useState(true);
  return (
    <Container>
      <Left>
      <Spline scene="https://prod.spline.design/WTWS7CDDuksIvGxV/scene.splinecode" />


 
  

      </Left>
      <Right>
          
          {login ? (
            <>
              <SignIn setOpenAuth={setOpenAuth} />
              <Text>
                {" "}
                Don't have an account ?{" "}
                <TextButton onClick={() => setLogin(false)}>Sign Up</TextButton>
              </Text>
            </>
          ) : (
            <>
              <SignUp setOpenAuth={setOpenAuth} />
              <Text>
                Already have an account ?{" "}
                <TextButton onClick={() => setLogin(true)}>Sign In</TextButton>
              </Text>
            </>
          )}
        </Right>
      
    </Container>
  );
};

export default Auth;
