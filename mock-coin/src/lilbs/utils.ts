import * as hangul from 'hangul-js';
import { CoinState, ICoins } from '../coinListSlice';
//한글 초성

//초성만 입력했는지 검사
export const isOnlychoseong = (keyword: string) => {
  const grouped = hangul.d(keyword, true);
  let result: boolean = true;
  for (let i = 0; i < grouped.length; i++) {
    if (grouped[i].length > 1) {
      result = false;
      break;
    }
  }

  return result;
};
//초성 추출
export const choseongExtraction = (keyword: string) => {
  const grouped = hangul.d(keyword, true);
  let result: string = '';
  for (let i = 0; i < grouped.length; i++) {
    result += grouped[i][0];
    //예를들어 비트코인 입력 중에 "비틐" 으로 입력이 들어오면 result는 ㅂㅌㅋ . (마지막글자 처리)
    if (i === grouped.length - 1 && grouped[i].length === 3) {
      result += grouped[i][2];
    }
  }
  //console.log(result);

  return result;
};

export const searchFilter = (coinList: CoinState[], searchTerm: string): CoinState[] => {
  if (!searchTerm.trim()) return coinList;
  const result = coinList?.filter((coin) => {
    //초성만 입력
    if (isOnlychoseong(searchTerm) || searchTerm.length === 1) {
      return (
        choseongExtraction(coin.korean_name).includes(choseongExtraction(searchTerm)) ||
        coin.market.split('-')[1].includes(searchTerm.toUpperCase())
      );
    } else {
      return (
        //음절 입력
        (coin.korean_name.includes(searchTerm.slice(0, -1)) &&
          choseongExtraction(coin.korean_name).includes(choseongExtraction(searchTerm))) ||
        coin.market.split('-')[1].includes(searchTerm.toUpperCase())
      );
    }
  });

  return result;
};
