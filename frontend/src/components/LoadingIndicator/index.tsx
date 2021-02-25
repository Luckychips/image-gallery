import React from 'react';
import styled from '@emotion/styled';
import { Spinner } from '@emotion-icons/fa-solid';

const Wrapper = styled.div`
  text-align: center;
  margin-top: 35px;
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  svg {
    animation: spinner 1.5s linear infinite;
  }
`;

const LoadingIndicator = () => {
  return (
    <Wrapper>
      <Spinner size={30} color="#376fe0" />
    </Wrapper>
  );
};

export default LoadingIndicator;
