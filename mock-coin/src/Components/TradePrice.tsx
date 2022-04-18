import React, { useEffect, useState, useRef, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';
interface Props {
  price: number;
  change: 'RISE' | 'FALL' | 'EVEN';
  index: number;
}

const Container = styled.div<{ change: number; previousPrice: number; price: number }>`
  border: 1px solid transparent;
  ${({ change }) =>
    change &&
    (change < 0
      ? css`
          animation: disappearRed 0.6s;
        `
      : css`
          animation: disappearBlue 0.6s;
        `)}
  padding: 2px 0;

  @keyframes disappearBlue {
    0% {
      border-color: ${({ theme }) => theme.blue};
    }
    100% {
      border-color: ${({ theme }) => theme.blue};
    }
  }
  @keyframes disappearRed {
    0% {
      border-color: ${({ theme }) => theme.red};
    }
    100% {
      border-color: ${({ theme }) => theme.red};
    }
  }
`;

function usePrevious(value: number) {
  const ref = useRef<number>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
function TradePrice({ price, change, index }: Props) {
  const previousPrice = usePrevious(price);
  console.log(previousPrice, price, Math.random().toFixed(1));

  return (
    <>
      <Container previousPrice={previousPrice || 0} price={price} change={(previousPrice || 0) - price}>
        {price}
      </Container>
    </>
  );
}
export default React.memo(TradePrice);
