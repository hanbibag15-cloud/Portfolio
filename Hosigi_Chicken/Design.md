# Hosigi Chicken — Design System & Subpage Guidelines

> 기준: GitHub `Hosigi_Chicken` 저장소의 현재 소스 (`brand.html`, `css/main.css`, `index.html`, `css/entry.css`, `franchise.html`). 작성일: 2026-11-02.  
> **설명 문서이며 구현 파일은 수정하지 않는다.** 값은 실제 소스에서 확인한 값과 설계 권장사항을 구분한다. 이 문서가 모든 화면에 동일한 고정값을 강제하는 것은 아니다.

## 1. Project Overview — 목적 및 디자인 방향

- **프로젝트 성격:** HTML/CSS/JavaScript로 제작한 **호식이두마리치킨 리뉴얼 포트폴리오**. 실제 기업 공식 사이트가 아닌 학습용 리디자인이다.
- **구성:** `index.html`은 BRAND / FRANCHISE 선택 진입 화면, `brand.html`은 완성된 브랜드 메인(헤더 → 히어로 슬라이더 → MENU → APP → STORE → EVENT → 푸터), `franchise.html`은 현재 임시 창업 안내 화면이다.
- **디자인 방향:** 치킨과 브랜드 이미지가 주인공인 강한 시각 콘텐츠, 큰 영문 섹션명, 빨간 포인트 컬러, 둥근 버튼과 카드, 이미지 중심의 프로모션 배치를 조합한다.
- **서브페이지 목적:** 사용자가 브랜드 정보/메뉴/이벤트/매장/창업 정보를 한눈에 이해하고 다음 단계로 이동하도록 한다. 디자인 규칙을 재사용하되, 서브페이지에는 실제 콘텐츠에 맞는 제목과 정보 구조를 설계한다.
- **링크 정책(신규 서브페이지 필수):** 사이트 내 이동은 `index.html`, `brand.html`, `franchise.html`, `#menu`, `#stores`, `#events` 등 **프로젝트 내부 경로와 실제 존재하는 앵커**를 사용한다. **기존 기업/브랜드 공식 홈페이지로 링크를 연결하지 않는다.** 아직 페이지가 없으면 목적지 HTML을 먼저 만들거나 '준비 중' 상태로 명확히 표시한다. 현재 소스에는 공식 홈페이지·외부 스토어·SNS 링크가 일부 남아 있으나 이는 **현황**이지 서브페이지에 복제할 규칙이 아니다.

## 2. Brand Identity — 브랜드 정체성과 시각적 특징

- **관찰 사실:** 브랜드 강조색은 `--brand-red` (`#E60012`), 기본 글자색은 `--brand-brown` (`#221714`)이다. 흰 배경 위의 선명한 붉은 제목과 어두운 버튼이 반복된다.
- **이미지 활용:** HERO는 큰 전체폭 이미지, MENU는 치킨 상품 이미지 캐러셀, APP는 휴대폰 목업, STORE는 매장 일러스트, EVENT는 프로모션 이미지 카드로 구성된다. 섹션마다 **한 가지 주 이미지 + 명확한 CTA**를 우선한다.
- **패턴:** 영문 대문자 `MENU`, `STORE`, `EVENT` 같은 섹션명; 한국어 서브카피; 밝은 배경과 어두운 대비; 타원형 테두리 버튼; 카드의 둥근 모서리.
- **분리된 진입 화면:** `index.html`은 `Brand_img.png` / `Startups_img.png`를 사용한 2분할 이미지, 검정 반투명 오버레이, 흰색 영문 대형 타이틀로 본문 브랜드 사이트와 다른 역할을 수행한다.

## 3. Design Principles — 설계 원칙

1. **정보 위계:** 먼저 큰 섹션명, 다음 한국어 설명, 그다음 이미지/상세 내용, 마지막 행동 버튼 순으로 이해하게 한다. HERO나 선택 화면은 이미지를 먼저 보여주는 예외다.
2. **재사용:** 컬러는 아래 토큰을 우선 사용하고, 버튼·제목·카드의 기존 클래스를 참고한다. 모든 요소에 임의의 색이나 숫자를 새로 지정하지 않는다.
3. **일관된 대비:** 본문은 밝은 바탕 + Brown 텍스트, 강한 CTA는 Red, 어두운 영역은 White 텍스트를 기본 조합으로 삼는다.
4. **콘텐츠 목적에 따른 배치:** 안내/홍보 섹션은 Flex 기반 텍스트·이미지 분할, 카드 목록은 Grid, 헤더는 Flex·절대 중앙 정렬을 사용한다.
5. **상태와 접근성:** hover에만 의존하지 않고 `:focus-visible`, `aria-label`, `aria-expanded`, `prefers-reduced-motion`을 유지한다.
6. **반응형 우선:** PC 고정 크기는 모바일에서 축소·재배치·높이 자동화한다. 좁은 화면에서 글씨를 무조건 줄이기보다 줄바꿈·터치 영역을 먼저 확인한다.
7. **기존 디자인 보호:** 새 서브페이지 제작 시 `brand.html` 및 `css/main.css`의 현행 섹션 스타일을 무분별하게 수정하지 않는다.

## 4. Color System — 실제 CSS 변수 및 사용처

### Primitives (`css/main.css :root`)

| CSS 변수 | 실제 HEX | 주 사용 목적 |
|---|---|---|
| `--brand-brown` | `#221714` | 기본 텍스트, 어두운 버튼·푸터 |
| `--brand-red` | `#E60012` | 섹션 제목, CTA 테두리·호버, 강조 |
| `--brand-orange` | `#E0690C` | 등록된 오렌지 원본; 필요 시 브랜드 보조 포인트 |
| `--neutral-cream` | `#FFF8F1` | 크림색 기본 배경 토큰 |
| `--neutral-white` | `#FFFFFF` | 헤더·본문 표면, 반전 텍스트 |
| `--neutral-border-gray` | `#E5E5E5` | 기본 경계선 |
| `--neutral-light-gray` | `#F7F7F7` | APP 같은 연회색 배경 |
| `--support-light-red` | `#FFE9EA` | 연한 빨간 표면 |
| `--support-light-orange` | `#FFF3E4` | 연한 오렌지 표면 |

### Semantic aliases

| 목적 | CSS 변수 → 원본 |
|---|---|
| 기본 배경 | `--background-default` → `--neutral-cream` |
| 은은한 배경 | `--background-subtle` → `--neutral-light-gray` |
| 기본 표면 | `--surface-default` → `--neutral-white` |
| 오렌지 소프트 표면 | `--surface-accent-soft` → `--support-light-orange` |
| 레드 소프트 표면 | `--surface-brand-soft` → `--support-light-red` |
| 기본 글자 | `--text-primary` → `--brand-brown` |
| 반전 글자 | `--text-inverse` → `--neutral-white` |
| 브랜드 글자 | `--text-brand` → `--brand-red` |
| 기본 선 | `--border-default` → `--neutral-border-gray` |
| 대표 CTA | `--action-primary` → `--brand-red` |
| 보조 CTA | `--action-secondary` → `--brand-brown` |
| 기본 액센트 | `--accent-default` → `--brand-orange` |
| 부드러운 액센트 | `--accent-soft` → `--support-light-orange` |

**실제 코드의 추가 직접 색상:** STORE 노란 배경 `#FFE45C` (현재 CSS에 토큰 없이 직접 기록됨), 이벤트 날짜 `#767676`, 체크 아이콘의 `white`, 이미지 오버레이의 `rgba(...)`, 진입 화면의 `#331C18` 폴백 등이 있다. **이것들은 등록된 Figma primitive로 오인하지 않는다.** `#FFE45C`는 STORE 전용으로 관찰되며 모든 서브페이지의 기본 배경색으로 확대하지 않는다.

**권장:** 새 서브페이지에서는 이미 정의된 semantic 변수부터 사용한다. 다만 변수명이 존재한다는 사실과, 실제 페이지가 그 변수를 사용한다는 사실은 구별한다(예: `body`는 현재 `--surface-default` 사용).

## 5. Typography — 서체, 위계, 행간

- **서체:** `--font: "Pretendard Variable", sans-serif`; 브랜드 페이지는 `../Font/css/pretendardvariable.css` 로드. 진입 페이지도 동일 폰트 파일 사용.
- **자간:** 주요 헤더·설명에서 `letter-spacing: -.023em`, 크게 강조하는 일부 제목에서 `-.03em`. 모든 요소에 일괄 적용하지 않는다.
- **대표 실제 수치(PC):**

| 적용 요소 | 폰트 크기 | 굵기 | 행간 / 비고 |
|---|---|---|---|
| 진입 화면 BRAND / FRANCHISE | `clamp(42px,4.7vw,90px)` | 700 | 1.1 |
| 진입 화면 안내 버튼 | 22px | 600 | 180×50px 버튼 |
| 헤더 GNB | 20px | 500 | 1, 자간 -.023em |
| 헤더 유틸 | 16px | 500 | 19px 텍스트 줄높이 |
| MENU 제목 | 68px | 700 | 1.05 |
| MENU 서브카피 | 18px | 500 | margin-top 10px |
| APP 제목 | `clamp(40px,3.4vw,65px)` | 700 | 1.08 |
| APP 소제목 | `clamp(17px,1.2vw,23px)` | 500 | 1.21 |
| STORE 제목 | 70px | 800 | 1.1 |
| STORE 설명 | 23px | 600 | 1.5 |
| EVENT 제목 | 68px | 700 | 1.1 |
| EVENT 설명 | 20px | 600 | 별도 줄높이 명시 없음 |
| EVENT 카드 제목 | 18px | 600 | 카드 제목 |
| EVENT 카드 날짜 | 14px | 상속 | 정보 텍스트 |
| 푸터 링크·정보 | 16px | 상속 | 링크 1.5 / 정보 1.6 |

- **모바일 대표:** MENU / EVENT / STORE 제목과 APP 제목은 별도 미디어쿼리에서 축소된다. APP 최종 제목 `clamp(24px,5.8vw,33px)`, APP 설명 12px, EVENT 제목 `clamp(34px,8vw,44px)`, EVENT 카드 제목 12px, STORE 제목(420px 이하) `clamp(28px,8vw,34px)`.
- **적용 상황:** 신규 서브페이지의 큰 영문 섹션 타이틀에는 현재 MENU/EVENT 68px 또는 STORE 70px 위계를 참고하고, 부가정보에는 기존 카드/푸터의 작은 위계를 참고한다. 동일한 값이라도 모바일 줄바꿈이 발생하면 해당 브레이크포인트의 규칙을 별도로 검토한다.

## 6. Layout & Spacing — 컨테이너, 배치, 간격

| 영역 | 실제 레이아웃 기준 |
|---|---|
| 첫 선택 화면 | `grid-template-columns: 1fr 1fr`, `min-height:100dvh`; 767px 이하 1열×2행 |
| 헤더 | `position:fixed; top:0`, 높이 90px, `.header-inner` 최대 1720px, 좌우 20px 패딩 |
| 본문 시작 오프셋 | `body padding-top:90px`(헤더 공간 확보), 1024px 이하 70px |
| HERO | PC Swiper 높이 720px; 1024px 이하 `100dvh` |
| MENU | `max-width:1920px`, 높이 874px, 패딩 120px 20px, 상품 영역 최대 1280px |
| APP | 전체폭, PC `min-height:853px`, 패딩 110px 20px, 내부 최대 1720px, Flex |
| STORE | 전체폭 `max-width:none`, PC 높이 443px, 내부 최대 1240px, 이미지·텍스트 Flex, 노란 그래디언트 배경 |
| EVENT | 전체폭, 상 110px·좌우 20px·하 130px, 내부 최대 1240px, 2열 Grid·간격 31px |
| Footer | 최대 1920px·PC 높이 300px, 패딩 `72px 70px 40px`, 로고·정보 Flex 간격 56px |
| 퀵메뉴 | PC 고정 위치 `right:24px; bottom:48px`, 세로 Flex 간격 12px |

- **정렬 방식:** 섹션 폭은 `margin:0 auto` + `max-width` 조합; 소개 영역은 `display:flex`; 상품/이벤트 목록은 Flex 또는 Grid. 카드 너비는 `minmax(0,1fr)`로 긴 텍스트 넘침을 줄인다.
- **실제 간격 예시:** 메뉴 카테고리 `gap:32px`, APP 내부 `gap:clamp(48px,6.77vw,130px)`, STORE CTA `margin-top:20px`, EVENT 카드 `gap:31px`, EVENT 헤더 아래 `margin-bottom:54px`.
- **실무 주의:** 이 값은 해당 영역의 현재 크기다. **전역 간격 토큰 체계가 선언된 것은 아니며**, 새 페이지에서 기계적으로 모든 110/120px 여백을 복사하면 안 된다. 콘텐츠량과 모바일 흐름에 맞게 검토한다.

## 7. Components — 반복 UI와 사용 기준

### Header / GNB
- `.site-header`, `.header-inner`, `.header-logo`, `.header-nav`, `.header-utils`, `.header-menu-toggle`를 중심으로 한 구조.
- PC GNB는 중앙 정렬, 로고 왼쪽, 유틸(창업안내·상품권) 오른쪽. 메인 메뉴 링크는 hover/focus에서 Red.
- 하위 메뉴는 PC hover 및 `:focus-within`; 1024px 이하에는 햄버거·펼침 메뉴를 사용하고 `aria-expanded` 상태를 JS로 관리한다.
- 신규 서브페이지에서 헤더를 재사용하려면 로고·내부 링크 경로를 새 HTML 위치 기준으로 바꾸고, **빈 앵커는 실제 페이지가 생기기 전까지 유효한 링크처럼 두지 않는다.**

### Section heading
- `h2` 큰 영문 섹션명 + `p` 한국어 설명 구성. MENU/EVENT는 Red 제목 + Brown 설명, STORE도 같은 대비.
- 섹션별 특수 위치 조정(`.event-heading {top:18px}` 등)을 공통 전역 클래스에 무조건 복사하지 않는다.

### Buttons, tabs, links
- MENU 카테고리 `.menu-category`: 최소 148×46px, `border-radius:999px`, `--background-subtle` 사용; 활성 상태 `.is-active`.
- STORE `.store-promo-link`: PC 219×49px, Red 테두리/텍스트, 완전한 pill 형태. hover/focus 시 Red 배경·White 텍스트.
- EVENT `.event-more`: PC 176×50px, `border:1px solid var(--brand-red)`, `border-radius:25px`; hover/focus 시 Red 배경·White 텍스트.
- STORE와 EVENT의 버튼 화살표는 텍스트와 분리된 span이며, hover/focus 시 `translateX(6px)` 이동. 글자와 겹치지 않도록 버튼 폭/화살표 절대 위치를 함께 검토한다.
- APP 스토어 버튼 `.app-store-link`: Brown 배경·White 글씨, PC 높이 88px/둥근 40px 모서리, hover/focus Red 배경.
- 진입 선택 화면 `.entry-button`: 180×50px·2px White 테두리·22px 글자, hover는 White 배경/Brown 글자.
- **링크는 신규 페이지 내에서만 연결한다.** 기존 `brand.html`에 남아 있는 공식 홈페이지·앱스토어·SNS 등 외부 목적지는 신규 서브페이지의 공통 링크 대상으로 사용하지 않는다.

### Cards / slider
- EVENT `.event-grid`: PC 두 열, 카드 사이 31px; `.event-card` 모서리 20px, 얕은 그림자, 이미지 비율 `600/309`; 이미지에 `object-fit:cover`. 종료 카드는 `.event-card-ended` 오버레이.
- MENU 제품 `.menu-feature-product`: 중앙 활성, 이전/다음 양옆, 숨김 상태를 JS 클래스(`.is-active`, `.is-prev`, `.is-next` 등)로 표현. 화살표·터치·PC 마우스 드래그 지원.
- HERO는 Swiper 라이브러리 슬라이더/화살표/페이지네이션을 사용. 새 서브페이지가 슬라이더를 필요로 하지 않으면 Swiper를 자동으로 넣지 않는다.

### Footer / quick menu
- `.site-footer`: Brown 배경·White 링크/정보, 로고 왼쪽과 안내 링크·회사 정보 오른쪽, 흰색 세로 구분선, 링크 hover/focus Red, PC 카피라이트 표시.
- `.quick-menu`: SNS 빨강 92px 원, TOP Brown 62px 원, PC 오른쪽 아래 고정, 1024px 이하 숨김.
- 푸터 회사명/사업자 정보는 **현재 디자인에 적힌 문구**이며, 새 페이지에서 공식 사실로 인증 없이 확장하지 않는다.

## 8. Interaction — 상태와 애니메이션

| 요소 | 확인된 인터랙션 |
|---|---|
| GNB | hover / focus-visible 시 Red, 서브메뉴는 hover / focus-within |
| 모바일 헤더 | 햄버거 클릭 → 메뉴 열기/닫기, 아이콘 회전·중앙선 숨김 |
| HERO | Swiper 자동 재생(현재 JS 지연 3000ms), 전환 속도 600ms, 화살표·페이지네이션 |
| MENU 상품 | 화살표로 이전/다음, 모바일 swipe, PC 드래그(가로 이동 45px 이상) |
| MENU / APP / STORE / EVENT 등장 | 스크롤에 따라 opacity 0→1, `translateY(36px)→0`, `750ms cubic-bezier(.22,1,.36,1)`, 요소별 120ms 정도 지연 |
| STORE / EVENT CTA | 버튼 배경 Red 전환, 화살표 오른쪽 6px 이동 |
| EVENT 이미지 | hover 시 `scale(1.06)`, 450ms, 종료 오버레이 유지 |
| 진입 선택 카드 | 이미지 `scale(1.06)` 650ms; 검정 오버레이 기본 55% → hover 20%; 제목 White 유지, 버튼 hover White 배경/Brown 글자 |
| 푸터 링크 | White → hover/focus Red |
| TOP 버튼 | 클릭 시 `scrollTo({top:0,behavior:'smooth'})` (사용자 reduced-motion 설정 시 auto) |

- 키보드 탐색에는 `:focus-visible`을 적용한다. 클릭 가능한 카드 전체를 링크로 사용할 때 `aria-label` 등 목적을 제공한다.
- `prefers-reduced-motion:reduce`에서 등장/이미지 확대 등의 애니메이션을 비활성화한다. 새 모션에서도 이 패턴을 따른다.
- 커서 hover와 터치 환경은 구분한다. 터치 장치에 꼭 필요한 정보를 hover 전용 화면에 넣지 않는다.

## 9. Responsive Rules — 반응형 기준

| 구간(현재 CSS) | 실제 변화 |
|---|---|
| 1200px 이하 | 헤더 로고 여백과 GNB 간격 축소; STORE 768~1200px 중간 레이아웃 |
| 1100px 이하 | APP 레이아웃·혜택/스토어 버튼 축소 |
| **1024px 이하** | 헤더 90→70px, 햄버거 메뉴, 헤더 유틸 숨김, 모바일 히어로, 퀵메뉴 숨김 |
| **767px 이하** | APP 모바일 콘텐츠 재배치·모바일 QR 숨김, STORE 작은 좌우 Flex, EVENT 2열 축소 카드, 푸터 컴팩트 가로형 |
| **420px 이하** | STORE 노란 배경 높이 125px, 모바일 EVENT 헤더 제목·버튼 한 줄, 푸터 글자·로고 추가 축소 |
| 380px 이하 | APP에 추가 QR/텍스트 축소 규칙이 존재(단 최종 모바일 QR은 `display:none`으로 숨겨짐) |

- `entry.css`의 별도 767px 경계: 진입 화면 PC 2분할 → 모바일 상하 2분할. 브랜드 본문용 `main.css`와 혼동하지 않는다.
- MENU, APP 등의 규칙은 여러 media query가 순서대로 덮어쓰는 구조다. **최종 적용값을 확인하려면 뒤쪽 선언과 선택자 우선순위를 함께 확인**해야 한다.
- 문서 작성용 수치와 실제 렌더 결과는 다를 수 있다. 모바일에서는 360/390/420px 근처의 줄바꿈과 버튼 가림을 테스트한다. 기기 제조사 감지가 아니라 **viewport 너비 기반** 설계다.

## 10. Do & Don't — 서브페이지 제작 체크리스트

### Do — 반드시 지킬 것
- `--text-primary`, `--surface-default`, `--action-primary` 같은 기존 semantic 변수와 Pretendard Variable을 먼저 사용한다.
- 기존 메인의 대형 영문 제목 + 한국어 설명 위계, CTA 대비, 둥근 버튼·카드 형태를 필요한 곳에 재사용한다.
- 실제 이동 대상이 있는 `<a>` 링크를 사용한다. 페이지 내 이동은 존재하는 ID로, 페이지 간 이동은 **이 저장소의 상대 경로**로 연결한다.
- hover / focus / active(`.is-active`, `.menu-open` 등) 및 reduced-motion을 함께 고려한다.
- 1024px, 767px, 420px 경계에서 내용을 검토하고, 이미지에는 적절한 `alt`와 `object-fit`을 적용한다.
- 메뉴/슬라이드/섹션 구현은 현재 HTML·CSS·JS 방식 및 필요할 경우 이미 사용 중인 Swiper를 우선한다.
- 섹션의 큰 이미지·텍스트·버튼을 사용자 행동(탐색/주문 정보 확인/매장 탐색/창업 정보 확인)에 맞게 배열한다.

### Don't — 하지 말 것
- **기존 `brand.html` 디자인이나 `css/main.css`를 서브페이지 작업 명목으로 변경하지 않는다.**
- 정의되지 않은 브랜드 컬러/폰트/spacing 토큰을 임의로 만들거나, 이 문서에 없는 값을 '기존 디자인 값'이라고 주장하지 않는다.
- 신규 서브페이지 링크를 **기존 기업 공식 브랜드 사이트(`9922.co.kr` 등)**로 연결하지 않는다. 외부 링크가 기존 프로젝트에 있다는 것과 앞으로 그렇게 설계해야 한다는 것은 다르다.
- `href="#없는-id"` 또는 임시 `#`를 기능이 있는 버튼처럼 만들지 않는다.
- hover만으로 기능을 설명하거나 키보드 초점 상태를 제거하지 않는다.
- 모바일에 PC 고정 크기를 그대로 강요하여 수평 스크롤·글자 겹침을 일으키지 않는다.
- 다른 페이지의 글자/여백 값을 목적 없이 복제하거나, 하나의 화면에 모든 애니메이션을 과도하게 적용하지 않는다.

---

### 실제 근거 파일 / 다음 작업 적용

- `index.html` + `css/entry.css`: 진입 선택 화면 및 BRAND/FRANCHISE 분기
- `brand.html` + `css/main.css`: 완성된 메인 디자인과 대부분의 토큰·컴포넌트·반응형 규칙
- `franchise.html`: 임시 안내 페이지이며 **완성된 공통 서브페이지 템플릿은 아님**
- `../css/default.css`, `../Font/css/pretendardvariable.css`, `../npm/swiper/`: 기존 브랜드 페이지가 참조하는 공용 리셋/폰트/슬라이더 경로

**구현 전 확인 순서:** 서브페이지의 콘텐츠 목적 → 기존 컴포넌트 재사용 가능 여부 → 실제 내부 이동 경로 → 데스크톱/모바일 레이아웃 → hover/focus/active 및 접근성 테스트.

> 이 문서는 소스 분석에 기반한 현황과 재사용 가이드이며, 실제 브라우저의 모든 뷰포트·상태를 테스트했다고 주장하지 않는다.
