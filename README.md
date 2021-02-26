### 설명

yarn 또는 npm 실행 시 연관 라이브러리 및 설정들은 정리가 되어 있어야 함

- 동작

  - 루트에서 yarn start 또는 npm run start로 웹 실행
  - http://localhost:3000 주소로 접근

- 백엔드
  - 웹서버 코드를 작성하고 임의의 웹사이트(https://www.flickr.com/)를 크롤링
  - 크롤링된 html 중에서 원하는 이미지 목록 추출 후 json 반환
  - http://localhost:5000/images로 접근
- 프론트엔드
  - 리액트를 사용하여 개발을 잔행함
  - craco를 사용하여 webpack, eject를 관리할 수 있게 함
  - emotion-js를 사용해서 css-in-js를 할 수 있게 함
  - eslint, prettier 적용
