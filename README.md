# 모의 가상화폐 거래소 프로젝트

### 구현 결과(구현 내용 중 일부 자세한 영상 업로드 예정)

#### 구현한 화면

![구현한 화면](https://user-images.githubusercontent.com/74299317/164910824-3782fda1-0b5b-43ff-a0e1-8342f6c65c91.png)

🏠

### 🔥프로젝트 소개

모의 가상화폐 거래소 입니다. 현재 프로젝트 진행 중이며, 실시간 가
격변동 차트를 웹소켓 통신을 통해 구현했습니다.
<br/>

---

### 💻Skill

<img src="https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/typescript-3178C6?style=flat-square&logo=typescript&logoColor=black">
<img src="https://img.shields.io/badge/swr-blue?style=flat-square&logo=swr&logoColor=white">
<img src="https://img.shields.io/badge/nextJs-000000?style=flat-square&logo=next.Js&logoColor=white">  
<img src="https://img.shields.io/badge/tailwindCss-06B6D4?style=flat-square&logo=tailwindCss&logoColor=white">
<img src="https://img.shields.io/badge/fontawesome-339AF0?style=flat-square&logo=fontawesome&logoColor=white">

---

### ⭐️구현 기능

> 구현한 것

- 실시간 가격 변동 차트(웹소켓)
- 코인 검색(한글 검색, 영어로 마켓코드 검색,초성 검색 구현)
- 코인 가격 변동 시 알림 애니메이션
- 실시간 호가 가격 변동 차트
- 실시간 가격 체결 차트

> 구현 예정

- 모의 거래

---

### 📁프로젝트 구조

```
업로드 예정
```

---

### 👨‍💻 프로젝트 Issues

> #### useRef

코인 값이 변할 때 가격의 border을 깜빡이는 애니메이션
을 주기 위해서 가격변동을 감지하기 위한 이전 가격값을 따로 저장
해 둘 필요가 있었습니다.이때 useRef hook을 가변값을 저장하는 용
도로 사용했습니다. useState를 사용할 수 도 있지만 코인차트에서
113개 정도의 코인정보를 실시간으로 받고 있기 때문에 리렌더링을
최소화하고 싶었습니다. ref 객체는 업데이트 되어도 리렌더링이 되
지 않는점. 그리고 useEffect는 리렌더링이 일어난 후에 실행 된다는
점을 활용하여 코인 값 변동 알림 애니메이션을 구현 할 수 있었습니
다..

<br/>
<br/>

---

### Getting Started

```

```

---
