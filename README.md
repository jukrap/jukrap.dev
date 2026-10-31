# jukrap.dev

React와 Next.js로 만든 개인 웹사이트입니다.

## 실행

Node.js 24와 npm을 사용합니다.

```sh
npm ci
npm run dev
npm run build
npm run start
```

## 검증

```sh
npm run check:public
npm run test:content
npx tsc --noEmit --incremental false
npx prettier --check .
```

공개 콘텐츠는 외부 편집 원본에서 검수한 데이터로 생성됩니다. `src/data/generated`와 생성 어댑터는 직접 수정하지 않습니다. 사이트는 비공개 편집 자료 없이 빌드할 수 있습니다.

저장소에는 사이트 코드·설정·승인된 공개 콘텐츠·배포 자산만 포함합니다. `public/documents`의 한영 포트폴리오·이력서·경력기술서 PDF 6종을 제공합니다. 개인 작업 기록과 회사별 지원 자료는 포함하지 않습니다.
