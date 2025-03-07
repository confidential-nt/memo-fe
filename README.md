# EasyLog Frontend

## 소개

구름 KDT 풀스택 개발자 1기 과정 우수 프로젝트 수상작입니다. 이 프로젝트는 기존 메모 및 일정 관리 어플리케이션의 장점은 가져가되 단점은 개선하고, 기존 앱에는 없는 편의 기능을 제공하는 웹 서비스 입니다.

## 기능

어플리케이션은 크게 Today, Calendar, Memo 페이지로 구성되어있습니다.


https://github.com/user-attachments/assets/93e39e8c-be80-4046-acc2-4c8a3ce88962


### 기본 메모

- 사용자가 원하는 메모를 작성할 수 있도록 합니다. 일반적인 텍스트 뿐 아니라, 헤딩 등 마크다운 요소들을 지원하며, 표 또한 자유롭게 삽입할 수 있습니다.
- 메모는 파일-디렉토리 구조로 저장할 수 있도록 하여, 메모를 주제마다 분류하기 쉽도록 했습니다.
- 기본적으로 로그인하지 않아도 사용가능합니다.
- 따로 저장 버튼을 누르거나 하지 않아도, 자동으로 저장이 됩니다.


### 카카오톡 채널 연동 메모

- 나에게 보내기 기능을 통해 메모를 하는 사람들도 있습니다. 이 기능을 사용할 때 처럼, **채널을 통해 메모를 기록하고, 해당 메모를 어플리케이션에 저장하여 메모를 한 곳에서 관리할 수 있도록 합니다.**
- 로그인해야 사용 가능합니다. (유저를 모으기 위한 의도입니다.)


### 캘린더 - Today

- 캘린더 페이지에서 일정을 생성, 입력, 삭제 할 수 있습니다. 그리고 ‘오늘’에 해당하는 일정과 기간이 ‘오늘’에 걸쳐진 일정을 Today 페이지에서 볼 수 있습니다.
- 기본적으로 로그인하지 않아도 사용가능합니다.


### Quick Input

- Quick Input에 일정을 입력하면, 해당 내용을 해석하여 자동으로 캘린더에 표시해줍니다. **‘17일 oo하기’ 뿐 아니라, ‘오늘부터 이틀 후 까지 oo하기’와 같이, 좀 더 복잡한 요구사항에도 적절히 반응하도록 합니다.**
- 로그인해야 사용 가능합니다. 로그인하지 않았을 때 input과 button은 disabled 됩니다.

## 설치 및 실행 방법

1. 저장소를 복제합니다:

   ```bash
   git clone https://github.com/confidential-nt/memo-fe.git

   ```

2. 프로젝트 폴더로 이동합니다:
   ```bash
   cd memo-fe
   ```
3. 필요한 의존성을 설치합니다:
   ```bash
   cd krampoline
   npm install
   ```
4. 개발 서버를 시작합니다:
   ```bash
   npm run dev
   ```

## 빌드 방법

1. 프로젝트를 빌드 합니다:
   ```bash
   npm run build
   ```

## 구성원

| Name   | GitHub Link                                           |
| ------ | ----------------------------------------------------- |
| 박소미 | [confidential-nt](https://github.com/confidential-nt) |
| 김서아 | [records-sa](https://github.com/records-sa)           |
| 양지원 | [did-jiwon](https://github.com/did-jiwon)             |

## 트러블 슈팅

### [박소미](https://github.com/confidential-nt)

#### Props Drilling 해결
- [Props Drilling 해결기(부제:기존 프로젝트 리팩토링)](https://velog.io/@youyoy689/FE-%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85-0%EB%85%84%EC%B0%A8-%EB%B0%B1%EC%88%98-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%A7%80%EB%A7%9D%EC%83%9D%EC%9D%98-%EA%B3%A0%EA%B5%B0%EB%B6%84%ED%88%AC-Props-Drilling-%ED%95%B4%EA%B2%B0%EA%B8%B0%EB%B6%80%EC%A0%9C%EA%B8%B0%EC%A1%B4-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81)

#### 테스트 코드를 사용하여 남의 코드를 리팩토링하기
- [남이 쓴 코드를 리팩토링 해보자 - Task 컴포넌트편 (부제: vite 환경에서 vitest를 사용하여 테스트 코드 짜기)](https://velog.io/@youyoy689/FE-%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85-%EB%82%A8%EC%9D%B4-%EC%93%B4-%EC%BD%94%EB%93%9C%EB%A5%BC-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-%ED%95%B4%EB%B3%B4%EC%9E%90-Task-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%ED%8E%B8-%EB%B6%80%EC%A0%9C-vite-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-vitest%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C-%EC%A7%9C%EA%B8%B0)


