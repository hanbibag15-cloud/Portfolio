# AI_CODING_GUIDE.md

# AI Coding Guide

## Burger King Login UI를 기준으로 한 웹 퍼블리싱 작업 가이드

이 문서는 `hanbibag15-cloud/Portfolio` 저장소의 **Burger King 로그인 UI 코드**를 기준으로 작성한다.

새로운 브랜드의 로그인 UI를 제작할 때 기존 버거킹 프로젝트의 HTML/CSS 구조와 작성 방식을 최대한 유지하고, 브랜드별로 달라지는 디자인과 콘텐츠만 변경하는 것을 기본 원칙으로 한다.

---

## 1. 작업의 기본 원칙

### 1-1. 기존 코드를 먼저 분석한다

새로운 화면을 만들기 전에 다음 파일을 먼저 확인한다.

```text
Burger King/login.html
css/default.css
Burger King/img/
```

기존 코드의 구조와 스타일을 파악한 후 새로운 화면에 적용한다.

기존 코드를 처음부터 다른 방식으로 작성하거나 새로운 기술로 교체하지 않는다.

---

### 1-2. 기존 학습 수준을 우선한다

현재 프로젝트는 HTML/CSS 기본기를 중심으로 제작한다.

따라서 다음과 같은 원칙을 유지한다.

- HTML 시맨틱 요소를 우선 사용한다.
- CSS Flexbox를 우선 사용한다.
- 필요한 경우 `position`을 사용한다.
- 복잡한 라이브러리나 프레임워크를 임의로 추가하지 않는다.
- 이미 사용하고 있는 CSS 작성 방식을 우선한다.
- 새로운 방법이 필요하다면 기존 방법으로 해결할 수 없는 이유를 먼저 설명한다.

---

### 1-3. AI가 기존 코드를 임의로 전면 수정하지 않는다

사용자가 작성한 코드가 있다면 다음 순서로 작업한다.

```text
현재 코드 확인
↓
구조와 스타일 분석
↓
문제가 있는 부분 확인
↓
왜 문제가 있는지 설명
↓
수정 위치와 방법 제시
↓
필요한 경우 수정 코드 제공
```

전체 코드를 새롭게 작성하는 것은 마지막 단계로 한다.

---

# 2. 현재 프로젝트의 HTML 구조

버거킹 로그인 UI는 다음과 같은 큰 구조를 사용한다.

```html
<div id="wrap">
    <header>
        <h1>페이지 제목</h1>
        <button>...</button>
    </header>

    <main>
        <h2>페이지 주요 안내</h2>

        <form>
            <fieldset>
                <legend>입력 영역 설명</legend>

                <!-- 입력 요소 -->

                <button type="submit">...</button>
            </fieldset>
        </form>

        <!-- 부가 링크 -->

        <!-- SNS 로그인 -->
    </main>
</div>
```

새로운 브랜드에서도 이 구조를 우선적으로 검토한다.

단, 화면의 콘텐츠 의미가 달라진다면 HTML 구조도 의미에 맞게 변경한다.

---

# 3. HTML 시맨틱 규칙

## 3-1. `header`

페이지의 상단 영역에 사용한다.

예:

```html
<header>
    <h1>로그인</h1>
    <button class="prev_btn">
        <span class="sr-only">이전버튼</span>
    </button>
</header>
```

새로운 브랜드에서 상단 구조가 다르다면 화면의 실제 의미에 맞게 변경한다.

---

## 3-2. `main`

페이지에서 사용자가 수행하는 핵심 콘텐츠를 포함한다.

로그인 화면에서는 로그인과 관련된 콘텐츠를 `main` 안에 배치한다.

```html
<main>
    ...
</main>
```

---

## 3-3. 제목 요소

제목의 크기가 아니라 **콘텐츠의 계층**을 기준으로 제목 태그를 선택한다.

기본적으로:

```text
h1
└── 페이지 대표 제목

h2
├── 주요 콘텐츠 영역
├── 로그인 안내
└── 기타 주요 영역

h3
└── h2 안의 세부 콘텐츠
```

새로운 화면을 만들 때 단순히 글자가 커 보인다는 이유로 `h1`, `h2`, `h3`를 선택하지 않는다.

---

# 4. Form 구조

로그인처럼 사용자의 입력을 받는 화면에서는 `form`을 사용한다.

현재 버거킹 로그인 UI에서는 다음 요소를 사용하고 있다.

```html
<form action="">
    <fieldset>
        <legend class="sr-only">로그인 화면</legend>

        ...
        
        <button type="submit" class="login_btn">
            로그인
        </button>
    </fieldset>
</form>
```

새로운 브랜드에서도 사용자 입력이 필요한 경우 이 구조를 우선 검토한다.

---

## 4-1. `label`과 `input`

입력 요소에는 가능한 경우 `label`과 `input`을 연결한다.

현재 코드:

```html
<label for="email" class="email">
    이메일 로그인
</label>

<input
    type="email"
    id="email"
    name="email"
    placeholder="아이디(이메일)을 입력해 주세요"
>
```

새로운 화면에서도 입력의 의미가 명확하도록 `label`, `for`, `id`, `name`을 적절하게 사용한다.

---

## 4-2. 비밀번호 입력

비밀번호 입력은 현재 다음 구조를 사용한다.

```html
<div class="input_box rela">
    <input type="password" name="password">
    <button type="button" class="pw_btn">
        <span class="sr-only">비밀번호 보기</span>
    </button>
</div>
```

비밀번호 보기 버튼처럼 입력창 내부에 기능 버튼이 필요한 경우:

```text
input_box
└── input
└── button
```

구조를 우선 사용한다.

CSS에서는 부모 요소를 기준으로 버튼을 배치하기 위해 `position: relative`와 `position: absolute`를 사용할 수 있다.

---

# 5. `div` 사용 원칙

`div`는 의미를 나타내는 요소가 아니라 **레이아웃이나 요소 그룹을 묶기 위한 요소**로 사용한다.

예:

```html
<div class="input_box">
    <input ...>
</div>
```

```html
<div class="sns_list">
    ...
</div>
```

새로운 HTML을 작성할 때 다음을 먼저 생각한다.

> 이 영역 자체에 의미가 있는가?

의미가 있다면 `section`, `form`, `ul`, `nav` 등의 적절한 요소를 검토한다.

단순한 스타일링/배치를 위한 그룹이라면 `div`를 사용할 수 있다.

---

# 6. 반복 콘텐츠

같은 종류의 콘텐츠가 반복되는 경우 먼저 리스트인지 판단한다.

예:

```text
SNS 로그인
├── 카카오
├── 네이버
├── 애플
└── 삼성
```

이런 콘텐츠는 의미상 리스트인지 검토한다.

단, 현재 버거킹 코드에서는 SNS 영역을 다음과 같이 작성하고 있다.

```html
<div class="sns_list">
    <a href="#">
        <span class="sr-only">카카오로그인</span>
    </a>

    <a href="#">
        <span class="sr-only">네이버로그인</span>
    </a>

    <a href="#">
        <span class="sr-only">애플로그인</span>
    </a>

    <a href="#">
        <span class="sr-only">삼성카드로그인</span>
    </a>
</div>
```

새로운 브랜드 작업에서는 무조건 `<ul>`로 변경하지 않는다.

기존 코드 스타일을 유지하되, 콘텐츠 의미상 리스트가 더 적절한 경우 그 이유를 설명하고 변경을 제안한다.

---

# 7. 접근성 처리

현재 프로젝트에서는 `.sr-only`를 사용한다.

```html
<span class="sr-only">이전버튼</span>
```

화면에는 보이지 않지만 스크린리더가 읽을 수 있도록 하는 목적이다.

아이콘만 표시되는 버튼이나 링크에서는 의미를 전달할 수 있는 텍스트를 함께 제공한다.

예:

```html
<button class="pw_btn">
    <span class="sr-only">비밀번호 보기</span>
</button>
```

```html
<a href="#">
    <span class="sr-only">카카오로그인</span>
</a>
```

새로운 브랜드에서도 아이콘만 보고 의미를 판단해야 하는 요소에는 접근 가능한 텍스트가 있는지 확인한다.

---

# 8. CSS 파일 구조

현재 프로젝트는 CSS를 크게 두 단계로 사용한다.

```text
css/default.css
        ↓
공통 초기화 / 기본 설정

login.html <style>
        ↓
해당 화면의 개별 디자인
```

새로운 화면을 만들 때 이 방식을 우선 유지한다.

---

# 9. `default.css`의 역할

`default.css`는 공통적으로 필요한 초기화와 기본 설정을 담당한다.

현재 포함되어 있는 주요 내용:

- `box-sizing`
- margin / padding 초기화
- body 기본 설정
- 한국어 줄바꿈 설정
- list 스타일 초기화
- 링크 초기화
- 이미지 기본 설정
- form 요소 초기화
- button cursor
- focus 상태
- `.sr-only`
- reduced motion 대응
- touch 관련 설정
- fieldset / legend 초기화

새로운 브랜드 화면을 만들기 위해 `default.css`를 필요 이상으로 수정하지 않는다.

브랜드별 디자인은 페이지 CSS에서 처리하는 것을 우선한다.

---

# 10. CSS 변수 사용

현재 버거킹 화면에서는 `:root`에 디자인 값을 변수로 정의한다.

예:

```css
:root {
    --font: "Sandoll GothicNeoRound", sans-serif;
    --font-pre: "Pretendard Variable", sans-serif;
    --font-BKR: "BKR", sans-serif;

    --primary: #512314;
    --focus: #D62302;
    --baseBorder: #D9CFC6;
    --inputBg: #FFFCF9;
    --errorColor: #C54734;
    --placeholder: #EBE6E2;
    --text: #766053;
    --bg: #F4EBDC;
    --boutton: #E9DDCD;
}
```

새로운 브랜드에서는 브랜드 디자인에 맞는 값을 변수로 관리하는 방식을 우선한다.

예:

```css
:root {
    --primary: 브랜드 메인 컬러;
    --bg: 배경 컬러;
    --text: 기본 텍스트 컬러;
    --placeholder: placeholder 컬러;
}
```

색상을 CSS 곳곳에 직접 반복해서 작성하지 않는다.

---

# 11. 폰트

현재 프로젝트에서는 폰트를 외부 CSS로 연결하고 있다.

```html
<link rel="stylesheet" href="../font/css/pretendardvariable.css">
<link rel="stylesheet" href="../font/css/bkbulmatpro.css">
<link rel="stylesheet" href="../font/css/sdgothicneo.css">
```

그리고 CSS 변수로 관리한다.

```css
--font: "Sandoll GothicNeoRound", sans-serif;
--font-pre: "Pretendard Variable", sans-serif;
--font-BKR: "BKR", sans-serif;
```

새로운 브랜드에서는 해당 브랜드에 필요한 폰트 파일이 실제 프로젝트에 존재하는지 먼저 확인한다.

파일이 없는 경우 임의의 경로를 만들지 않는다.

---

# 12. 폰트 크기

현재 프로젝트는 다음과 같이 `rem`을 사용한다.

```css
html {
    font-size: 62.5%;
}
```

예:

```css
body {
    font-size: 1.6rem;
}

h1 {
    font-size: 2.0rem;
}
```

새로운 화면에서도 기존 프로젝트의 단위 사용 방식을 우선 유지한다.

---

# 13. 전체 화면 구조

현재 로그인 화면의 기본 화면 크기 구조는 다음과 같다.

```css
#wrap {
    width: 100%;
    max-width: 1024px;
    min-width: 360px;
    min-height: 100dvh;
    margin: 0 auto;
}
```

새로운 브랜드에서도 모바일 화면을 기준으로 제작하되, Figma에서 확인되는 실제 디자인 크기와 프로젝트의 반응형 기준을 함께 확인한다.

---

# 14. Header 레이아웃

현재 헤더는 가운데 제목과 왼쪽 버튼을 함께 배치한다.

```css
header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
}
```

이전 버튼은 `absolute`로 배치한다.

```css
.prev_btn {
    position: absolute;
    left: 0;
    width: 48px;
    height: 48px;
}
```

새로운 브랜드의 헤더가 같은 구조라면 이 방식을 우선 사용한다.

헤더 구조가 다르면 Figma의 실제 배치를 기준으로 변경한다.

---

# 15. Main 여백

현재 로그인 화면은 다음과 같이 `main`의 내부 여백을 사용한다.

```css
main {
    padding: 48px 20px 90px;
}
```

새로운 화면에서는 무조건 동일한 값을 복사하지 않는다.

Figma에서 확인한 실제 콘텐츠 간격을 기준으로 조정한다.

다만 `main`의 전체적인 여백을 이용해 화면을 구성하는 기존 방식은 유지한다.

---

# 16. Flexbox 사용

현재 프로젝트에서는 Flexbox를 자주 사용한다.

예:

```css
.title {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
```

```css
.login_option label {
    display: inline-flex;
}
```

```css
.sns_list {
    display: flex;
    column-gap: 20px;
    justify-content: center;
}
```

새로운 화면에서도 단순한 1차원 정렬은 Flexbox를 우선 검토한다.

---

# 17. Absolute 사용

`position: absolute`는 필요한 요소에 제한적으로 사용한다.

현재 로그인 화면에서는 비밀번호 보기 버튼처럼 입력창 내부에 위치해야 하는 요소에 사용한다.

```css
.input_box.rela {
    position: relative;
}

.pw_btn {
    position: absolute;
    right: 20px;
    bottom: 12px;
}
```

따라서 새로운 화면에서 아이콘을 무조건 absolute로 배치하지 않는다.

> 부모 기준으로 특정 위치에 고정되어야 하는 요소인지 먼저 판단한다.

---

# 18. 이미지 사용 방식

현재 아이콘은 SVG 파일을 `background-image`로 사용하는 방식이 많다.

예:

```css
.prev_btn {
    background: url(img/back_icon.svg)
    no-repeat scroll center / auto;
}
```

```css
.pw_btn {
    background: url(img/eye_icon.svg)
    no-repeat center / 26px;
}
```

새로운 브랜드에서도 기존 프로젝트와 동일한 방식으로 사용할 수 있다.

단, 실제 이미지 파일이 존재하는지 먼저 확인한다.

경로를 임의로 만들어서는 안 된다.

---

# 19. SNS 아이콘

현재 SNS 아이콘은 반복되는 링크를 CSS 선택자로 구분한다.

```css
.sns_list > a:first-child {
    background-image: url(img/kakao_logo_icon.svg);
}

.sns_list > a:nth-child(2) {
    background-image: url(img/naver_logo_icon.svg);
}

.sns_list > a:nth-child(3) {
    background-image: url(img/apple_logo_icon.svg);
}

.sns_list > a:last-child {
    background-image: url(img/samsung_logo_icon.svg);
}
```

새로운 브랜드에서 SNS 종류가 달라진다면:

```text
현재 브랜드의 SNS 종류 확인
↓
실제 이미지 파일 확인
↓
HTML 순서 확인
↓
CSS 선택자와 이미지 경로 변경
```

순서로 작업한다.

---

# 20. 링크와 버튼 구분

다음 기준을 사용한다.

### 페이지 이동

```html
<a href="#">아이디 찾기</a>
```

### 현재 화면에서 기능 실행

```html
<button type="button">비밀번호 보기</button>
```

### form 제출

```html
<button type="submit">로그인</button>
```

새로운 화면에서도 단순히 디자인이 비슷하다는 이유로 `a`와 `button`을 서로 바꾸지 않는다.

**사용자의 행동 의미**를 기준으로 선택한다.

---

# 21. 새로운 브랜드 작업 절차

새 브랜드 로그인 UI를 제작할 때 다음 순서를 따른다.

## STEP 1. 기존 버거킹 코드 확인

먼저:

```text
Burger King/login.html
css/default.css
Burger King/img/
```

을 확인한다.

---

## STEP 2. Figma 화면 분석

새로운 브랜드의 Figma를 보고 다음을 확인한다.

```text
페이지 제목
↓
상단 버튼
↓
주요 안내 문구
↓
입력 영역
↓
로그인/제출 버튼
↓
관련 링크
↓
SNS 로그인
↓
기타 안내 콘텐츠
```

화면에 실제로 존재하는 콘텐츠만 구조에 반영한다.

---

## STEP 3. HTML 구조 결정

디자인을 바로 CSS로 옮기지 않는다.

먼저 의미 구조를 만든다.

```text
header
main
 ├─ 제목/안내
 ├─ form
 ├─ 링크
 └─ SNS 또는 추가 안내
```

필요한 경우 `section`, `fieldset`, `ul` 등을 추가한다.

---

## STEP 4. 기존 CSS 방식 적용

기존 프로젝트에서 사용한 방식을 우선 사용한다.

```text
CSS 변수
rem
Flexbox
position
background-image
gap
padding
margin
```

새로운 CSS 기술을 사용해야 한다면 그 이유를 먼저 설명한다.

---

## STEP 5. 브랜드 스타일 변경

구조를 유지하면서 브랜드별 요소를 변경한다.

```text
폰트
컬러
배경
버튼
입력창
아이콘
로고
간격
텍스트
```

---

## STEP 6. 실제 파일 경로 확인

이미지나 폰트를 연결할 때 반드시 프로젝트 폴더를 먼저 확인한다.

예:

```text
img/icon.svg
font/css/font.css
```

실제로 존재하지 않는 파일 경로를 임의로 작성하지 않는다.

---

## STEP 7. 반응형 확인

최소한 다음을 확인한다.

```text
360px
390px
모바일 화면
넓어진 화면
```

특히 다음 문제를 확인한다.

- 가로 스크롤 발생 여부
- 텍스트 줄바꿈
- 버튼 너비
- 입력창 너비
- 아이콘 위치
- 좌우 여백
- SNS 아이콘 간격

---

# 22. AI가 코드를 수정할 때 지켜야 할 규칙

### 하지 말 것

```text
기존 코드를 전부 삭제하고 새로운 구조 작성
```

```text
사용하지 않은 라이브러리 추가
```

```text
임의의 이미지 경로 생성
```

```text
Figma에 없는 콘텐츠 추가
```

```text
의미와 관계없이 div로 전부 작성
```

```text
디자인을 맞추기 위해 HTML 의미 구조를 무시
```

---

### 먼저 할 것

```text
현재 파일 구조 확인
↓
현재 HTML 확인
↓
현재 CSS 확인
↓
이미지/폰트 경로 확인
↓
새 Figma 화면과 비교
↓
공통점과 차이점 구분
↓
최소한의 수정
```

---

# 23. 코드 리뷰 방식

AI가 사용자의 코드를 검토할 때 다음 순서로 설명한다.

## ① 잘 작성한 부분

예:

```text
form과 input의 관계가 적절함
label과 input을 연결함
버튼의 역할을 type으로 구분함
기존 CSS 변수 구조를 유지함
```

## ② 다시 생각해야 하는 부분

예:

```text
이 div는 의미가 있는 영역인지 확인 필요
이 제목의 heading level이 적절한지 확인 필요
이 링크가 실제로 페이지 이동인지 기능 실행인지 확인 필요
```

## ③ 수정 이유

단순히

> "이게 더 좋습니다."

라고 하지 않는다.

반드시:

> "왜 이 요소가 이 태그여야 하는지"

를 설명한다.

## ④ 직접 수정할 수 있는 경우

완성 코드를 바로 주지 않고:

```text
수정 위치:
login.html의 ○○ 부분

힌트:
현재 ○○ 요소와 ○○ 요소의 관계를 확인해 보세요.
```

처럼 먼저 안내한다.

---

# 24. 새로운 브랜드에서 유지할 것과 변경할 것

## 유지

```text
HTML 기본 구조
시맨틱 HTML 사용 방식
form 구조
label / input 관계
button 사용 방식
sr-only 방식
default.css
CSS 변수 방식
rem 사용
Flexbox
기본 반응형 구조
파일 구조
```

## 변경

```text
브랜드명
페이지 문구
폰트
컬러
배경
버튼 디자인
입력창 디자인
아이콘
SNS 종류
이미지
브랜드별 여백
브랜드별 UI 요소
```

---

# 25. 가장 중요한 원칙

새로운 브랜드 로그인 UI는

> **버거킹 코드를 복사하는 작업이 아니라, 버거킹에서 학습한 퍼블리싱 구조를 새로운 브랜드의 디자인에 적용하는 작업**

으로 생각한다.

따라서 AI는 다음을 기준으로 판단한다.

```text
기존 코드의 구조를 이해한다.
        ↓
새로운 Figma의 콘텐츠를 분석한다.
        ↓
공통 구조와 브랜드별 차이를 구분한다.
        ↓
기존에 배운 HTML/CSS 방법을 우선 사용한다.
        ↓
필요한 부분만 변경한다.
        ↓
왜 변경했는지 설명한다.
```

최종적으로 사용자가 직접 코드를 이해하고 수정할 수 있는 것을 목표로 한다.
