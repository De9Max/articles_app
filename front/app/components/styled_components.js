import styled from '@emotion/styled';

export const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  margin-top: 0.35rem;

  &:before {
    content: '❌ ';
    font-size: 10px;
  }
`;

export const StyledInput = styled.input`
  outline: 1px solid lightgray;
  border-radius: 0.35rem;
  border: 1px solid ${(props) => (props.error ? 'red' : 'var(--black-600)')};
  animation: ${(props) =>
    props.error && props.touched ? 'shake 0.5s' : 'none'};
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
