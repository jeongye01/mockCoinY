import React, { useEffect, useState, useRef, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';

const Container = styled.div<{ change: number }>`
  border: 1px solid transparent;
  ${({ change }) =>
    change &&
    (change > 0
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
interface Props {
  price: number;
}
function usePrevious(value: number) {
  const ref = useRef<number>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
function usePreviousGap(value: number) {
  const ref = useRef<number>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
function TradePrice({ price }: Props) {
  const previousPrice = usePrevious(price);
  const previousGap = usePreviousGap(price - (previousPrice || price));
  // console.log(previousPrice, price, Math.random().toFixed(1));
  console.log(price, previousPrice);

  return (
    <>
      {!previousPrice ? (
        <div>{price.toLocaleString()}</div>
      ) : (
        <>
          <>
            {' '}
            {(previousGap || price - previousPrice) > 0 && price - previousPrice > 0 && (
              <Container change={price - previousPrice}>{price.toLocaleString()}</Container>
            )}
          </>
          <>
            {' '}
            {(previousGap || price - previousPrice) < 0 && price - previousPrice < 0 && (
              <Container change={price - previousPrice}>{price.toLocaleString()}</Container>
            )}
          </>
          <>
            {' '}
            {(previousGap || price - previousPrice) > 0 && price - previousPrice < 0 && (
              <Container change={price - previousPrice}>{price.toLocaleString()}</Container>
            )}
          </>
          <>
            {' '}
            {(previousGap || price - previousPrice) < 0 && price - previousPrice > 0 && (
              <Container change={price - previousPrice}>{price.toLocaleString()}</Container>
            )}
          </>
        </>
      )}
    </>
  );
}
export default React.memo(TradePrice);
