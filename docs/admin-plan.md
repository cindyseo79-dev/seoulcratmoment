# Seoul Craft Moment — 관리자 페이지 기획서 (MVP)

> 확정일: 2026-07-07
> 목적: 랜딩페이지로 들어온 **예약 문의를 확인하고 처리**할 수 있는 최소한의 관리자 도구.
> 현재는 RLS 정책상 예약 데이터를 읽을 방법이 없어(insert만 허용) 관리자 페이지가 필요하다.

---

## 1. 확정된 결정 사항

| 항목 | 결정 | 이유 |
|------|------|------|
| **MVP 범위** | 예약 관리만 (프로그램 CRUD는 다음 단계) | 가장 급한 기능부터 빠르게 완성 |
| **예약 상태 관리** | 포함 — 신규/확정/취소 상태 변경 | 처리 여부 표시 없이는 운영 불가 |
| **인증 방식** | Supabase Auth (이메일/비밀번호) | RLS와 결합해 서버 측에서 검증되는 유일하게 안전한 방식 |
| **진입 경로** | URL 해시 `#admin` 조건부 렌더링 | 라이브러리 추가 없음, 단일파일 빌드(vite-plugin-singlefile)와 충돌 없음 |

---

## 2. 화면 구성 (단일 화면)

```
┌────────────────────────────────────────────────┐
│  Seoul Craft Moment · 예약 관리        [로그아웃] │
├────────────────────────────────────────────────┤
│  [전체][🟡신규][🟢확정][⚪취소]   🔍 이름/이메일 검색 │  ← 필터 바
├────────────────────────────────────────────────┤
│  신청일 │ 이름 │ 프로그램 │ 인원 │ 희망일 │ 상태  │  ← 목록 테이블
│  07-06  김지은  Hanji     2   07-20  🟡신규 ▸    │
│  07-05  Sarah   Ceramic   4   07-18  🟢확정 ▸    │
├────────────────────────────────────────────────┤
│  ▸ 행 클릭 → 상세 패널 (메시지 전문 + 상태 버튼)   │
└────────────────────────────────────────────────┘
```

- 사이드바 없음. 프로그램 관리를 추가하는 다음 단계에서 사이드바 도입.
- 미로그인 상태로 `#admin` 진입 시 → 로그인 폼만 표시.

### 기능 명세

| 영역 | 내용 |
|------|------|
| **로그인** | 이메일/비밀번호 폼 (Supabase Auth `signInWithPassword`). 세션 유지, 로그아웃 버튼 |
| **목록** | `reservations` 최신순 테이블. 컬럼: 신청일 · 이름 · 프로그램 · 인원 · 희망일 · 상태 |
| **필터** | 상태 탭(전체/신규/확정/취소) + 이름·이메일 텍스트 검색 (클라이언트 필터링) |
| **상세** | 행 클릭 시 펼침 패널: 이메일, 메시지 전문, 신청 시각 + `mailto:` 답장 링크 |
| **상태 변경** | `확정` / `취소` 버튼 → DB update → 뱃지 즉시 갱신 |

---

## 3. 진입 경로 / 라우팅

- `window.location.hash === '#admin'` 이면 `<AdminPage />`, 아니면 기존 랜딩페이지 렌더링.
- `hashchange` 이벤트를 구독해 새로고침 없이 전환.
- 관리자 URL: `https://<도메인>/#admin` — 링크는 랜딩페이지에 노출하지 않는다 (보안은 어차피 Auth가 담당, 숨기는 건 부차적).

## 4. 인증 설계

- **Supabase Auth 이메일/비밀번호** 사용.
- 관리자 계정은 Supabase 대시보드 → Authentication → Users 에서 수동 생성 (회원가입 UI 없음).
- 앱에서는 `supabase.auth.getSession()` + `onAuthStateChange`로 세션 관리.
- 데이터 접근 권한은 전적으로 RLS가 담당 — 클라이언트 코드는 편의일 뿐, 로그인 없이는 어떤 방법으로도 예약을 읽을 수 없다.

## 5. DB 변경 사항 (구현 시 적용)

```sql
-- (1) 예약 상태 컬럼 추가
alter table public.reservations
  add column if not exists status text not null default 'new';
  -- 값: 'new' | 'confirmed' | 'cancelled'

-- (2) 로그인한 사용자(=관리자)에게 읽기/수정 허용
create policy "authenticated can read reservations"
  on public.reservations for select
  to authenticated
  using (true);

create policy "authenticated can update reservations"
  on public.reservations for update
  to authenticated
  using (true)
  with check (true);
```

> 참고: 이 프로젝트는 관리자 외 일반 로그인 사용자가 없으므로 `authenticated` = 관리자로 취급해도 안전하다. 나중에 일반 회원 기능이 생기면 별도 admin 판별(예: `app_metadata.role`)로 좁혀야 한다.

## 6. 구현 구조 (예상 파일)

```
src/
  admin/
    AdminPage.jsx        # #admin 진입점 — 세션 확인 후 Login 또는 Reservations 표시
    AdminLogin.jsx       # 이메일/비밀번호 로그인 폼
    ReservationList.jsx  # 필터 바 + 테이블 + 상세 패널 + 상태 변경
  App.jsx                # hash 기반 분기 추가 (#admin ↔ 랜딩)
supabase/
  schema.sql             # status 컬럼 + RLS 정책 추가
```

---

## 7. MVP 제외 (다음 단계 후보)

- 프로그램(워크숍) CRUD — 제목/가격/사진/노출순서/featured 관리
- 대시보드 (주간 예약 수, 인기 프로그램 통계)
- 예약 확정 시 자동 이메일 발송
- 예약 CSV 내보내기
- 다중 관리자 · 권한 등급
