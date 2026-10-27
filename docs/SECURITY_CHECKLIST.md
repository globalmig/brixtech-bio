# 서비스 배포 전 보안 체크리스트

Cursor, Claude Code, Codex, Lovable, Bolt, v0 등으로 만든 웹·앱을 실제 사용자에게 배포하기 전 점검할 항목입니다.

> 코드가 정상 동작하는 것과 안전하게 동작하는 것은 별개입니다. 자동 스캔을 통과해도 권한 및 비즈니스 로직 취약점은 남아 있을 수 있습니다.

## 1. 배포 전 보안 체크리스트

### 1.1 비밀키 및 환경변수
- [ ] `.env`, `.env.local`, 서비스 계정 키 등이 Git에 커밋되지 않았다.
- [ ] API 키, DB 비밀번호, 토큰이 프론트엔드 번들 또는 브라우저 응답에 노출되지 않는다.
- [ ] `NEXT_PUBLIC_`, `VITE_` 등 클라이언트 공개용 환경변수에 비밀값을 넣지 않았다.
- [ ] Git 히스토리에 과거에 유출된 키가 없는지 확인했다.
- [ ] 유출된 키는 코드에서 삭제하는 데 그치지 않고 폐기 후 재발급했다.

> `.env` 파일에 넣었다고 무조건 안전한 것은 아닙니다. 클라이언트 빌드에 포함되면 누구나 볼 수 있습니다.

### 1.2 인증 및 권한
- [ ] 로그인이 필요한 API는 서버에서 인증을 확인한다.
- [ ] 다른 사용자의 데이터에 ID를 바꿔 접근할 수 없다(IDOR/BOLA 방지).
- [ ] 일반 사용자가 관리자 API 및 관리자 기능을 사용할 수 없다.
- [ ] Supabase 등 DB의 RLS 정책이 활성화되고 실제로 검증되었다.
- [ ] 로그아웃, 세션 만료, 비밀번호 재설정이 안전하게 작동한다.

### 1.3 데이터베이스 및 개인정보
- [ ] 데이터베이스가 불필요하게 외부에 공개되지 않았다.
- [ ] DB 접근에 최소 권한 계정을 사용한다.
- [ ] SQL Injection 방지를 위해 파라미터화된 쿼리를 사용한다.
- [ ] 개인정보, 비밀번호, 인증 토큰을 로그에 출력하지 않는다.
- [ ] 개인정보 수집 최소화, 보관 및 삭제 정책을 확인했다.

### 1.4 API 및 서버
- [ ] 모든 입력값을 서버에서 검증한다.
- [ ] API에 적절한 Rate Limit과 요청 크기 제한이 있다.
- [ ] CORS가 필요한 출처만 허용하도록 설정되었다.
- [ ] 오류 메시지에 스택 트레이스나 내부 설정값이 노출되지 않는다.
- [ ] 파일 업로드는 크기, 유형, 권한을 검증하고 안전하게 저장한다.
- [ ] 결제 금액과 결제 성공 여부는 서버에서 검증한다.

### 1.5 프론트엔드 및 배포
- [ ] 운영 서비스는 HTTPS를 사용한다.
- [ ] 디버그 모드, 테스트 계정, 개발용 백도어가 제거되었다.
- [ ] XSS 방지를 위한 출력 인코딩과 안전한 렌더링을 사용한다.
- [ ] 인증 쿠키에 `Secure`, `HttpOnly`, `SameSite` 등 적절한 속성을 적용했다.
- [ ] 소스맵과 배포 아티팩트에 비밀값이나 민감한 내부 정보가 없다.

### 1.6 의존성 및 CI/CD
- [ ] Dependabot 취약점 알림을 활성화했다.
- [ ] 의존성 취약점 및 주요 업데이트를 검토했다.
- [ ] GitHub Actions 권한을 최소화했다.
- [ ] 외부 Pull Request에서 배포용 비밀키를 사용할 수 없도록 했다.
- [ ] `main` 브랜치에 병합하기 전에 필수 테스트와 검토를 거친다.

### 1.7 배포 후 운영
- [ ] 비밀키와 주요 관리자 계정의 접근 권한을 정기적으로 검토한다.
- [ ] 오류, 비정상 로그인, 과도한 API 호출에 대한 모니터링이 있다.
- [ ] DB 백업을 수행하고 복구 가능 여부를 확인했다.
- [ ] 보안 사고 시 키 폐기, 서비스 차단, 사용자 통지 절차를 준비했다.

## 2. GitHub 보안 기능 추천

Private Repository에서도 Dependabot을 사용할 수 있지만 모든 GitHub 보안 기능이 무료인 것은 아닙니다. 플랜과 라이선스 정책은 변경될 수 있으므로 실제 저장소 설정 화면에서 확인하세요.

| 기능 | 용도 | Private 저장소 이용 조건 |
|---|---|---|
| **Dependabot Alerts** | 알려진 의존성 취약점 경고 | 일반적으로 무료 |
| **Dependabot Security Updates** | 취약 패키지 수정 PR 생성 | 일반적으로 무료 |
| **Dependabot Version Updates** | 정기 패키지 업데이트 PR 생성 | 일반적으로 무료 |
| **Secret Scanning + Push Protection** | 비밀키 탐지 및 지원되는 비밀값의 푸시 차단 | Private의 전체 기능은 일반적으로 별도 라이선스 필요. 일부 무료 보호 기능의 적용 범위는 별도 확인 |
| **Code Scanning / CodeQL** | 코드 정적 보안 분석 | GitHub 내장 Private 코드 스캐닝은 일반적으로 별도 라이선스 필요 |
| **Branch Protection / Rulesets** | 직접 푸시 제한, 필수 검사·리뷰 적용 | Private 저장소에서 적용 가능한 정책은 플랜에 따라 다름 |

### 설정 방법
1. GitHub 저장소의 **Settings → Advanced Security** 또는 **Security & analysis**로 이동합니다(화면은 계정에 따라 다를 수 있음).
2. **Dependency graph**, **Dependabot alerts**, **Dependabot security updates**를 활성화합니다.
3. **Dependabot version updates**는 `.github/dependabot.yml`로 설정합니다.
4. 사용 가능한 경우 **Secret scanning**, **Push protection**, **Code scanning**을 활성화합니다.
5. `main` 브랜치의 PR 검토 및 필수 검사 정책을 설정합니다.

공식 문서: https://docs.github.com/en/code-security/getting-started/quickstart-for-securing-your-repository

## 3. Private 저장소에서 쓸 수 있는 추가 도구

| 도구 | 검사 대상 | 추천도 | 링크 |
|---|---|---|---|
| **Gitleaks** | 코드 및 Git 히스토리의 비밀키 | 필수 | https://github.com/gitleaks/gitleaks |
| **Semgrep** | 코드의 취약한 패턴 | 추천 | https://github.com/semgrep/semgrep |
| **Trivy** | 패키지, 컨테이너, 설정 취약점 | 추천 | https://github.com/aquasecurity/trivy |
| **OWASP ZAP** | 실행 중인 웹 서비스의 동적 보안 점검 | 추천 | https://www.zaproxy.org/ |
| **OpenSSF Scorecard** | 저장소 및 공급망 보안 관행 | 선택 | https://github.com/ossf/scorecard |

오픈소스 엔진 자체는 무료로 사용할 수 있지만 GitHub Actions 실행 시간, 클라우드 서비스, 상용 관리 기능에는 비용이 발생할 수 있습니다. 운영 서비스에 대한 능동적 스캔은 사전 승인과 안전한 범위 설정 후 수행하세요.

## 4. Dependabot 설정 예시

Next.js, React, Node.js 프로젝트라면 `.github/dependabot.yml`을 만듭니다.

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    groups:
      minor-and-patch:
        update-types:
          - "minor"
          - "patch"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

npm 의존성과 GitHub Actions 버전 업데이트 PR을 주기적으로 생성합니다. **보안 업데이트 PR**을 받으려면 Dependabot Security Updates 설정도 활성화하세요. 업데이트 PR은 테스트 후 병합하는 것을 권장합니다.

## 5. AI 코딩 에이전트용 보안 점검 프롬프트

아래 내용을 Cursor, Claude Code 등 코드 접근이 가능한 AI 코딩 에이전트에게 전달하세요.

```text
현재 프로젝트를 실제 사용자에게 배포하기 전에 보안 감사를 수행해 줘.

검사 범위
1. 환경변수, API 키, 토큰, DB 접속정보가 클라이언트 번들 또는 Git 히스토리에 노출되는지
2. 인증 우회, 권한 상승, 다른 사용자 데이터 접근(IDOR/BOLA) 가능성
3. Supabase/Firebase 사용 시 RLS 및 보안 규칙의 적절성
4. SQL Injection, XSS, CSRF, SSRF 가능성
5. API Rate Limit, 입력값 검증, CORS 설정
6. 의존성 패키지의 알려진 취약점
7. GitHub Actions 및 배포 환경의 권한 문제
8. 개인정보 및 인증정보의 로그 노출
9. 결제, 파일 업로드, 관리자 API의 서버 측 검증

작업 규칙
- 실제 코드를 확인하고, 추측만으로 취약점을 단정하지 마.
- 발견한 문제마다 파일 경로, 관련 코드 위치, 악용 가능 조건을 설명해.
- 위험도를 Critical / High / Medium / Low로 분류해.
- 실제로 검증한 사항과 추가 확인이 필요한 사항을 구분해.
- 발견하지 못한 항목을 안전하다고 단정하지 마.
- 외부 서버로 비밀값이나 실제 사용자 데이터를 전송하지 마.
- 실제 공격, 운영 데이터 수정, 파괴적인 테스트는 수행하지 마.
- 코드를 임의로 수정하지 말고 먼저 수정 방안을 제안해.

마지막으로 다음 형식의 표를 작성해 줘.
| 위험도 | 발견 위치 | 문제 | 수정 방법 | 검증 상태 |

Critical 또는 High 문제가 남아 있다면 배포를 보류해야 할 이유를 명확하게 설명해 줘.
```

AI가 "보안 문제 없음"이라고 답했다고 해서 안전하다는 의미는 아닙니다. 특히 사용자 간 데이터 접근, 결제 검증, RLS는 별도로 테스트해야 합니다.

## 6. 추천 최소 보안 구성

- [ ] GitHub Dependabot Alerts + Security/Version Updates
- [ ] Gitleaks로 비밀키 탐지
- [ ] Semgrep로 정적 보안 분석
- [ ] GitHub Actions로 PR마다 검사 실행
- [ ] 배포 전 인증·권한 테스트 수행

**핵심 메시지:** GitHub 자동 보안 검사와 실제 사용자 권한 테스트를 함께 수행하세요.

예를 들어 Dependabot이나 Semgrep을 모두 통과하더라도 `GET /api/orders/123`을 `GET /api/orders/124`로 바꿔 다른 사람의 주문을 볼 수 있다면 안전한 서비스가 아닙니다.
