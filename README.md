# **🌕 Auto_Overnight**

- 학교 외박신청 자동화 App
- Based in React Native with Expo
- 학교 외박 신청 로직을 단순화 하고 달력 형식으로 간편하게 신청

## **🛒 Store**

- [PlayStore](https://play.google.com/store/apps/details?id=com.ww8007.AutoOvernight)
- [AppStore] : 준비중...

## **➕ Version**

- 1.0.1
- ┣ 1. 설문조사 링크 변경
- ┗ 2. 토큰 인증 시간 변경

- 1.0.2
- ┣ 1. 특수문자 로그인 오류 수정
- ┗ 2. 기기화면 높이에 따른 스크롤 추가

- 1.0.3
- ┣ 1. Android 메뉴 겹침 오류 수정
- ┗ 2. 메뉴 디자인 수정

- 1.0.4
- ┣ 1. 날씨 / 미세먼지 페이지 추가
- ┣ 2. 셔틀 시간표 / 최단 시간 계산 추가
- ┣ 3. 1 / 2 생활관 전화 연결 추가
- ┗ 4. 폰트 / 디자인 변경

- 1.0.5
- ┣ 1. 서랍창 디자인 변경
- ┣ 2. 최종 신청일 기준 캘린더 알람 설정
- ┗ 3. 영문 → 한글

- 1.0.6
- ┣ 1. 날씨 페이지 오류 해결
- ┗ 2. login State 데이터 구조 변경

## **🔧 Tech Stack**

| 분류     | 기술                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend | ![react-native](https://img.shields.io/badge/React--Native-61DAFB?style=flat&logo=React&logoColor=black) ![Typescript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=black) ![expo](https://img.shields.io/badge/Expo-000?style=flat&logo=Expo&logoColor=white) ![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat&logo=Redux&logoColor=white) ![Redux-Saga](https://img.shields.io/badge/Redux--Saga-999999?style=flat&logo=Redux-Saga&logoColor=white) |
| Backend  | ![Serverless](https://img.shields.io/badge/Serverless-FD5750?style=flat&logo=Serverless&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=Postman&logoColor=white) ![AWS](https://img.shields.io/badge/AWS--Lambda-FF9900?style=flat&logo=Amazon-AWS&logoColor=white)                                                                                                                                                                                               |
| Etc      | ![AWS](https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white) ![AWS](https://img.shields.io/badge/VSCode-007ACC?style=flat&logo=Visual-Studio-Code&logoColor=white)                                                                                                                                                                                                                                                                                                           |

## **⚙️ System Architecture**

![](https://images.velog.io/images/ww8007/post/2059a245-6fca-4888-b88f-4aa1161d927c/image.png)

## Installation

> Clone Repository

    git clone https://github.com/AUTO-Overnight/Auto_Overnight.git

> npm

    npm i && npm start

> yarn

    yarn && yarn start

## **📖 Feat**

1. 속도개선 (기존 한달 30초 → 2초 이내)
2. 중복 필터링(신청한 날 신청불가)
3. 자동 로그인 기능
4. 달력 형식으로 신청하고 싶은 날 신청가능
5. 날짜 시작일 지정해서 1일, 1주, 2주, 4주 신청가능
6. 외박 승인 및 신청 내역 여부 달력에 표시
7. 상벌점 내역 확인 및 통합 점수 계산
8. 화이트/다크 모드 추가 및 디자인 개선

   <img src="https://user-images.githubusercontent.com/54137044/132565805-1c4c7deb-8d0d-4dba-8b0d-95eb6fe9f265.png" height="400"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&&nbsp;&nbsp;&nbsp;&nbsp; <img src="https://user-images.githubusercontent.com/54137044/132566198-7fe561b0-c0ce-4af2-a0fb-303dd9eb635a.png" height="400"/>

### **✔ Commit message**

커밋 메세지를 작성할 때는 다음과 같은 규칙으로 일관성 있게 작성합니다.

### 1. Commit Message Structure

기본적으로 커밋 메세지는 아래와 같이 제목 / 본문 / 꼬리말로 구성합니다.

```xml
type : subject

body

```

### 2. Commit Type

- Feat : 새로운 기능 추가
- Fix : 버그 수정, 기능 수정
- Docs : 문서 수정
- Refactor : 코드 리팩토링 (변수명 수정 등)
- Test : 테스트 코드, 리팩토링 테스트 코드 추가
- Design : 코드 스타일 변경, 코드 자체 변경이 없는 경우, 주석 추가
- Remove : 파일 또는 코드, 리소스 제거

## **⭐️ Members**

| 이름   | 개발분야  | 담당             | 소개페이지                                             |
| ------ | --------- | ---------------- | ------------------------------------------------------ |
| 장동현 | Front-end | App development  | [개인 레포로 이동](https://github.com/ww8007)          |
| 이서윤 | Back-end  | Data Engineering | [개인 레포로 이동](https://github.com/somewheregreeny) |
