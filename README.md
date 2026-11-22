# STRIDER GitHub Pages

목표 주소: **https://milkomedia.github.io/strider/**

UMI의 실험 영상 중심 구성과 robomimic의 코드 접근 방식을 참고한 STRIDER 논문 소개 사이트입니다. HTML/CSS/JavaScript만 사용하며 Node.js 설치, npm, 빌드가 필요하지 않습니다. 기존 시뮬레이션 리포지토리와 별개인 **`Milkomedia/strider`** 리포지토리에 이 폴더의 내용을 올리면 됩니다.

이 패키지에는 웹사이트만 들어 있습니다. MuJoCo 시뮬레이션과 플롯 UI는 별도의 코드 리포지토리에서 내려받아 PC에서 실행하는 구성입니다. 웹페이지의 제어기 탭은 각 제어기의 설명을 바꾸며 시뮬레이션을 실행하지는 않습니다.

## 현재 들어 있는 내용

- 논문 제공본의 제목, 핵심 방법 설명, 실제 기체·비행 사진
- RA-L `Accepted` 표시
- 네 가지 제어기 설명: Conventional / Reference method [15] / Morphing-Only / Proposed
- 현재 리포지토리의 MuJoCo 및 플롯 UI 스크린샷과 확대 보기
- YouTube 임베드 또는 직접 MP4 재생, 실험별 시간 이동
- 향후 논문 URL, DOI, 저자·소속, BibTeX를 입력할 수 있는 설정 파일
- 모바일 레이아웃, 키보드 탭 조작, 줄어든 모션 설정 대응

저자·소속·DOI·논문 URL·BibTeX·영상 URL은 아직 입력하지 않았습니다. 빈 값이면 미확정 링크나 가짜 인용을 만들지 않고 `forthcoming`으로 표시하거나 숨깁니다. **현재 제공본의 제목을 사용했으므로 게재 승인본의 최종 제목이 달라지면 변경하십시오.** 전체 PDF는 포함하지 않았습니다.

현재 코드 링크는 다음 개발 리포지토리를 가리킵니다.

https://github.com/Milkomedia/STRIDER_MPC_MuJoCo

정제된 네 제어기 시뮬레이션은 아직 공개 예정이므로 페이지에 개발 버전 안내를 표시합니다. 정식 공개 후 `release.status`를 `available`로 바꾸면 이 안내가 바뀝니다. 이미지에 있는 수치와 그래프는 기존 개발 화면이며 최종 승인본의 정량 비교 결과라고 표시하지 않았습니다.

## 1. 가장 간단한 업로드 방법: GitHub 웹 화면

1. ZIP을 압축 해제합니다. `strider` 폴더 안에 `index.html`과 `assets` 폴더가 있습니다.
2. GitHub의 **Milkomedia 계정**으로 로그인하고 **New repository**를 선택합니다.
3. Repository name을 소문자 **`strider`**로 입력하고 **Public**으로 만듭니다. 기존 `strider` 리포지토리가 있다면 새로 만들지 말고 그 안의 기존 자료와 Pages 설정부터 확인하십시오.
4. 새 리포지토리의 **uploading an existing file** 또는 **Add file → Upload files**를 누릅니다.
5. 압축을 푼 `strider` 폴더 **안의 파일과 `assets` 폴더**를 올립니다. ZIP 자체 또는 바깥쪽 `strider` 폴더를 통째로 한 단계 아래에 올리지 마십시오. 리포지토리 첫 화면에 `index.html`이 바로 보여야 합니다.
6. Commit changes를 눌러 기본 브랜치에 저장합니다. 아래 설명은 브랜치가 `main`인 경우입니다.
7. **Settings → Pages → Build and deployment**에서 다음과 같이 설정합니다.

| 항목 | 설정 |
| --- | --- |
| Source | Deploy from a branch |
| Branch | main |
| Folder | / (root) |

8. **Save**를 누르고 Pages 배포가 완료될 때까지 기다립니다. Actions 탭에서 배포 진행 상태를 볼 수 있습니다.
9. Settings → Pages에 표시되는 실제 사이트 주소로 접속합니다. 계정이 `Milkomedia`, 리포지토리가 `strider`라면 기본 주소는 **https://milkomedia.github.io/strider/** 입니다. 기존 계정 사이트에 custom domain 설정이 있으면 GitHub가 다른 주소로 연결할 수 있으니 설정을 확인하십시오.

`milkomedia.github.io`라는 별도 리포지토리를 먼저 만들 필요는 없습니다. `strider` 프로젝트 리포지토리만으로 `/strider/` 사이트를 만들 수 있습니다. **Custom domain 칸에 `milkomedia.github.io`를 입력하지 마십시오.** 이 주소는 GitHub가 자동으로 제공합니다.

macOS Finder에서 숨김 파일이 보이지 않으면 Command+Shift+.로 표시할 수 있습니다. `.nojekyll`과 `.gitignore`도 포함하는 것을 권합니다. `.nojekyll`을 빠뜨렸다면 GitHub의 Add file → Create new file에서 `.nojekyll`이라는 빈 파일을 만들 수 있습니다. 이 사이트에는 underscore 폴더 등 Jekyll 처리가 필요한 구조는 없지만, `.nojekyll`은 정적 파일을 그대로 제공하도록 명시합니다.

## 2. 터미널에서 올리는 방법

위의 웹 업로드와 아래 중 **한 가지**를 선택하십시오. 아래는 GitHub에 **아무 파일도 없는 새 `Milkomedia/strider` 리포지토리**를 만든 경우입니다. 이미 README 등을 만든 원격 리포지토리에 이 명령을 그대로 적용하지 마십시오.

macOS에서 압축을 푼 폴더가 Downloads에 있는 경우:

```bash
cd ~/Downloads/strider
git init
git branch -M main
git add .
git commit -m "Add STRIDER research project website"
git remote add origin https://github.com/Milkomedia/strider.git
git push -u origin main
```

인증은 사용 중인 GitHub Desktop, credential manager, GitHub CLI 또는 토큰 기반 인증 설정을 사용합니다. GitHub 계정 비밀번호를 HTTPS Git 비밀번호로 사용하는 방식은 지원되지 않습니다. 토큰이나 인증 정보를 사이트 파일에 기록하지 마십시오.

그 다음 **Settings → Pages → Deploy from a branch → main → / (root) → Save**를 설정합니다. 위 명령은 웹페이지용 리포지토리에만 실행하며 기존 `STRIDER_MPC_MuJoCo` 소스 리포지토리에 실행하지 않습니다.

이후 수정은 다음과 같습니다.

```bash
git add .
git commit -m "Update STRIDER publication and video links"
git push
```

기존 원격 리포지토리에 파일이 있다면 먼저 `git clone https://github.com/Milkomedia/strider.git`으로 받아서 그 폴더 안에 사이트 파일을 복사하고 커밋하십시오. 기존 파일은 확인 후 유지하거나 수정하며 force push는 필요하지 않습니다.

## 3. 업로드 전에 내 컴퓨터에서 보기

`index.html`을 더블 클릭해 레이아웃을 볼 수 있습니다. YouTube는 HTTP Referer가 없는 `file://` 환경에서 error 153 등이 발생할 수 있으므로 영상은 로컬 HTTP 서버 또는 GitHub Pages에서 확인하십시오.

```bash
cd ~/Downloads/strider
python3 -m http.server 8000
```

브라우저에서 **http://localhost:8000/** 에 접속합니다. 종료는 터미널에서 Ctrl+C입니다. Python이 이미 설치되어 있다면 별도 패키지가 필요 없습니다.

## 4. 자주 바꿀 정보는 `assets/site-config.js`에서 관리

| 설정 | 입력할 내용 |
| --- | --- |
| `headline`, `subtitle` | 논문 최종 제목의 앞부분과 부제 |
| `authors`, `affiliations` | 최종 저자 순서·소속 |
| `publication.status` | 현재 `Accepted`; 출판 후 원하는 표시로 변경 |
| `publication.venue` | 학술지 이름, 필요하면 확인된 연도 |
| `publication.paperUrl` | 공개 가능한 논문 링크 또는 `./assets/paper.pdf` |
| `publication.doiUrl` | `https://doi.org/...` 형태 |
| `publication.citationText` | 정식 서지 문장 |
| `publication.bibtex` | 확정된 BibTeX 문자열 |
| `links.codeUrl` | 정제된 시뮬레이션 리포지토리 URL, 끝의 `.git` 생략 |
| `links.documentationUrl` | 실제 설치 안내 URL; 없으면 빈 문자열 유지 |
| `links.labUrl`, `links.contactUrl` | 연구실 링크 및 `mailto:...` 또는 연락처 페이지 |
| `release.status` | 공개 전 `in-preparation`, 공개 후 `available` |
| `video.youtubeId` | YouTube 영상 ID 또는 공유 URL |
| `video.chapters` | 각 실험의 실제 시작 시점, 단위는 초 |
| `gallery.scene`, `gallery.plots` | 새 시뮬레이션·UI 스크린샷과 설명 |
| `controllers`, `referenceNote` | 네 제어기의 이름·설명·참고문헌 번호 |

JavaScript 문자열과 쉼표를 유지하십시오. 설명 주석은 영어입니다. 최종 제목이 변경되면 검색엔진 및 JavaScript 비활성화 환경을 위해 `index.html`의 기본 제목·설명도 함께 변경하는 편이 좋습니다.

저자 형식의 예시는 다음과 같습니다. 이는 작성 형식 예시이며 실제 저자 정보가 아닙니다.

```javascript
authors: [
  { name: "Author Name", url: "https://example.edu/", affiliation: "1" }
],
affiliations: ["1. Department, University"],
```

여러 줄 BibTeX는 백틱 문자열을 사용할 수 있습니다. 정식 정보가 없는 동안 `bibtex: ""`를 유지하십시오. 입력한 경우에만 BibTeX 상자와 복사 버튼이 표시됩니다.

사이트의 네 제어기는 대화와 기존 코드의 gradient-ascent 구현을 바탕으로 Conventional, [15] 기반 gradient method, Morphing-Only, Proposed로 구성했습니다. 최종 공개 코드의 표시 이름이 다르면 `controllers`에서 수정하십시오. 참고문헌 번호도 승인본과 맞추십시오.

## 5. 대용량 보충영상 연결: YouTube 권장

기존 리뷰용 영상 파일을 그대로 YouTube에 올려 사용할 수 있습니다. 홈페이지에 영상 파일을 함께 넣을 필요가 없고, 방문자는 홈페이지 안에서 재생할 수 있습니다.

1. YouTube에 영상을 업로드합니다.
2. 공개 범위를 **일부 공개(Unlisted)** 또는 **공개(Public)**로 설정합니다. **비공개(Private)** 영상은 일반 방문자가 볼 수 없습니다. 일부 공개도 링크를 가진 누구나 볼 수 있으므로 홈페이지에 임베드하면 방문자가 시청할 수 있습니다.
3. YouTube Studio의 영상 상세 설정에서 **Allow embedding**을 허용합니다.
4. `assets/site-config.js`의 `video`에서 `provider: "youtube"`를 유지하고 `youtubeId`에 실제 공유 URL 또는 11자 영상 ID를 넣습니다.
5. 변경한 파일을 커밋합니다.

설정 형식:

```javascript
video: {
  provider: "youtube",
  youtubeId: "",
  src: "",
  mimeType: "video/mp4",
  poster: "./assets/images/flight.webp",
  chapters: [
    { label: "Thrust redistribution", start: null },
    { label: "Payload transportation", start: null },
    { label: "Controller comparison", start: null }
  ]
},
```

빈 `youtubeId`에 본인의 URL을 넣으면 재생 버튼이 자동으로 표시됩니다. `start: null`은 해당 버튼을 숨깁니다. 실제 시작 시점이 2분 15초인 구간이라면 `start: 135`처럼 초를 입력합니다. 시작 시간은 본인 영상에 맞게 정하십시오. 하나의 영상만 올려도 여러 실험으로 이동할 수 있습니다. 각 버튼은 지정 시점부터 영상을 시작하며 구간 끝에서 자동으로 멈추지는 않습니다.

YouTube 플레이어는 방문자가 재생 버튼 또는 챕터 버튼을 눌렀을 때 로드합니다. `youtube-nocookie.com` 임베드와 `strict-origin-when-cross-origin` referrer policy를 사용합니다. 사이트에 별도 analytics나 외부 폰트는 없습니다.

임베드 재생이 제한되더라도 바로 아래 **Watch on YouTube** 링크로 이동할 수 있습니다. 영상에 연령 제한이 있거나 임베드가 비허용이면 YouTube 설정을 확인하십시오.

## 6. YouTube 없이 MP4를 직접 재생하려면

공개적으로 접근 가능한 MP4를 웹 서버에 두거나, 충분히 작은 파일을 이 리포지토리의 `assets/media/`에 올릴 수 있습니다. 로그인이나 다운로드 확인 페이지로 이동하는 공유 링크 대신 실제 영상 파일을 반환하는 URL이 필요합니다.

파일을 `assets/media/experiments.mp4`에 넣었다면:

```javascript
provider: "mp4",
youtubeId: "",
src: "./assets/media/experiments.mp4",
mimeType: "video/mp4",
```

브라우저 호환성을 위해 H.264 영상 + AAC 음성 MP4를 권장합니다. 호스팅 서버가 byte-range 요청을 지원해야 큰 파일의 시간 이동이 원활합니다. 직접 MP4 모드도 같은 챕터 설정을 사용합니다.

2026-11-20 확인한 GitHub 제한:

- 브라우저에서 개별 파일 업로드: **25 MiB 이하**
- 일반 Git push: **100 MiB 초과 파일 차단**, 50 MiB 초과 시 경고
- 배포된 Pages 사이트: **1 GB 이하**
- Pages 트래픽: **월 100 GB soft limit**

긴 리뷰용 원본은 이러한 크기·전송 제약 때문에 YouTube에 올리는 방식을 권장합니다. 위 제한은 서로 다른 제한이며 `100 MiB`와 `1 GB`를 혼동하지 마십시오.

이미 FFmpeg가 설치되어 있다면 웹용 MP4 변환 예시:

```bash
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart experiments.mp4
```

화질·길이에 따라 크기는 달라지므로 변환 후 용량을 확인하십시오. YouTube를 쓰면 사이트 업로드용 변환 작업은 필요하지 않습니다.

## 7. 첫 화면을 짧은 무음 영상으로 바꾸기

기본은 실제 실험 사진입니다. 향후 짧은 teaser를 `assets/media/teaser.mp4`로 준비한 뒤:

```javascript
hero: {
  image: "./assets/images/flight.webp",
  videoSrc: "./assets/media/teaser.mp4"
},
```

무음·반복 재생과 일시정지 버튼이 적용됩니다. 기기의 모션 감소 설정이 켜져 있으면 자동으로 시작하지 않습니다. 큰 전체 보충영상을 이 자리에 넣기보다는 별도의 짧은 파일을 사용하십시오. 기본 사진을 유지해도 페이지는 완성된 형태로 표시됩니다.

## 8. 파일별 역할

| 파일 | 역할 |
| --- | --- |
| `index.html` | 페이지 구조와 기본 본문 |
| `assets/site-config.js` | 논문·링크·영상·제어기 설명 설정 |
| `assets/styles.css` | 디자인과 모바일 레이아웃 |
| `assets/app.js` | 설정 반영, 영상·챕터, 탭, 확대, 인용 복사 |
| `assets/images/` | 실제 기체 사진과 기존 시뮬레이션 스크린샷 |
| `assets/media/` | 필요 시 직접 호스팅할 영상 |
| `assets/favicon.svg` | 브라우저 탭 아이콘 |
| `.nojekyll` | 정적 사이트 표시 |
| `ASSETS.md` | 이미지 출처와 공개 전 교체할 항목 |

모든 로컬 자산은 상대 경로를 사용합니다. 따라서 `/strider/` 하위 주소에서도 작동합니다. Windows/macOS에서는 파일명 대소문자 차이를 놓치기 쉬우나 GitHub Pages에서는 `Flight.webp`와 `flight.webp`가 다릅니다.

## 9. 게시 후 확인

- `https://milkomedia.github.io/strider/`에 접속하고 새로고침합니다.
- 네 제어기 설명 탭, MuJoCo/Plot UI 전환, 스크린샷 확대가 작동하는지 확인합니다.
- 실제 영상을 설정한 후 재생, 전체화면, 시간 이동, 외부 영상 링크를 확인합니다.
- Paper·DOI·저자 링크는 확정 정보가 생긴 후 입력합니다.
- 공개 시뮬레이션 주소, `release.status`, 설치 안내를 최신 상태로 맞춥니다.
- 개발 스크린샷을 최종 공개 버전으로 바꾸면 그 캡션도 변경합니다.

404가 나오면 리포지토리 루트의 `index.html`, Pages 브랜치와 폴더, Actions 배포 결과를 확인하십시오. 업로드 후 화면이 이전 상태라면 브라우저 강력 새로고침을 하십시오. 저장소 이름을 변경하면 기본 사이트 주소도 바뀌므로 논문에 인용한 뒤에는 `strider` 이름과 주소를 유지하는 것이 좋습니다.

## 공식 참고 문서

- [GitHub Pages 개요와 주소 구조](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Pages 배포 소스 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub 파일 크기 제한](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
- [GitHub Pages 사용 제한](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [YouTube 임베드](https://support.google.com/youtube/answer/171780?hl=en)
- [YouTube 공개 범위](https://support.google.com/youtube/answer/157177?hl=en)

레이아웃 참고: [UMI](https://umi-gripper.github.io/), [robomimic](https://robomimic.github.io/). 이 패키지의 HTML/CSS/JavaScript는 새로 작성했으며 두 사이트의 로고·코드·영상은 포함하지 않았습니다.
