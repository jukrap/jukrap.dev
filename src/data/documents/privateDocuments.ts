import type { CareerBriefCopy, ResumeDocumentCopy } from '@/types/documents';
import { recruitingDocumentSkillGroups } from './documentSkills';
import { recruitingDocumentManifest } from './manifest';
import {
	formatKoreanPeriod,
	getProject,
	getWorkStory,
	projectEvidence,
	workStoryEvidence,
} from './sourceSelectors';
import {
	tisCareerEvidence,
	triphosCareerEvidence,
	universityEducationEvidence,
} from './profileEvidence';

const featuredStories =
	recruitingDocumentManifest.selection.featuredWorkStoryIds.map(getWorkStory);

const supportingStories =
	recruitingDocumentManifest.selection.supportingWorkStoryIds.map(getWorkStory);

const supportingDecisionByStory: Record<string, string> = {
	'mobile-operations-platform':
		'기존 앱의 지도 화면과 오프라인 저장·재전송 기능을 보완했습니다.',
	'legacy-mobile-compatibility':
		'최신 빌드 도구를 적용한 뒤에도 오래된 Android에서 실행되는지 따로 점검했습니다.',
	'react-admin-state-migration':
		'기존 주식 업무 흐름을 React로 새로 구현하고 서버 상태와 화면 편집 상태를 따로 관리했습니다.',
	'hybrid-security-boundary':
		'외부 인증 정보는 서버 프록시에만 두고 WebView에는 필요한 응답만 전달했습니다.',
	'field-terminal-android':
		'개발용 빌드와 운영 서명 빌드가 섞이지 않도록 설치 경로를 나눴습니다.',
	'legacy-panel-baseline':
		'화면을 떼어내기 전에 함께 쓰는 팝업, 선택자, API 요청 순서를 먼저 기록했습니다.',
	'multi-role-hybrid-platform':
		'회원 검색·수정·통합과 문의·첨부 기능을 개발했습니다.',
	'operations-admin-web':
		'암호화된 정보의 검색과 답변·첨부·알림 기능을 개선했습니다.',
	'legacy-support-web':
		'입력·통신 오류 안내를 고치고 대량 조회가 느려지는 원인을 조사했습니다.',
	'structured-editor-ui':
		'데이터 필드와 차트 설정을 바꾸면 미리보기에 반영되도록 했습니다.',
	'hybrid-life-info-platform': '외부 API 호출과 캐시, 위치 처리를 개선했습니다.',
};

const careerPlatformByStory: Record<string, string> = {
	'multi-role-hybrid-platform': '웹·Android',
	'delivery-output-flow': '웹·모바일',
	'structured-editor-ui': '웹',
	'ai-kickoff-documentation-tool': '사내 도구',
	'hybrid-life-info-platform': '하이브리드',
	'settlement-operations-platform': '웹·API',
	'mobile-operations-platform': '웹·Android',
};

const careerGoalByStory: Partial<Record<string, string>> = {
	'structured-editor-ui':
		'데이터 역할과 설정 상태가 실제 미리보기와 어긋나지 않는 편집 흐름을 설계했습니다.',
	'hybrid-life-info-platform':
		'레거시 웹과 Android WebView를 유지보수하며 외부 API 응답, 캐시, 위치 처리와 운영 배포를 고쳤습니다.',
	'settlement-operations-platform':
		'Excel 대량등록과 청구·정산 관리 화면, Spring Boot API를 개발했습니다.',
	'mobile-operations-platform':
		'기존 모바일 업무 앱의 지도 화면과 오프라인 저장·재전송 기능을 유지보수했습니다.',
};

const supportingResultByStory: Record<string, string> = {
	'mobile-operations-platform':
		'실기기에서 복원과 재전송을 확인했으며 중복 전송 원인은 조사 중입니다.',
	'legacy-mobile-compatibility': '빌드 기준선 복구',
	'react-admin-state-migration': 'React Query로 서버 상태 갱신',
	'hybrid-security-boundary': '인증 정보는 서버에서 관리',
	'field-terminal-android': '개발·운영 빌드 경로 분리',
	'legacy-panel-baseline': '변경 전 영향 지점 지도화',
	'multi-role-hybrid-platform':
		'Android 앱의 파일 선택과 이미지 확대도 연결했습니다.',
	'operations-admin-web': '알림 등록 실패 시에도 저장된 답변을 유지했습니다.',
	'legacy-support-web':
		'오류 안내를 로컬에서 확인했으며 조회 최적화는 제안 단계입니다.',
	'structured-editor-ui': '설정 변경과 드래그 동작을 확인했습니다.',
	'hybrid-life-info-platform':
		'운영에 반영한 뒤 응답과 배포 파일을 확인했습니다.',
};

const captainDonghae = getProject('captain-donghae');
const shareBBy = getProject('sharebby');
const postureTeacher = getProject('posture-teacher');
const aiAgentPlaybook = getProject('ai-agent-playbook');

const contributionByStory: Record<string, string> = {
	'multi-role-hybrid-platform':
		'회원 정보 검색·수정·통합과 문의·첨부 기능을 개발하고, 서버에서 접근 권한을 확인하도록 했습니다.',
	'delivery-output-flow':
		'조회·예약·Excel 등록 화면을 React로 만들고, Android에서 권한 요청과 Bluetooth 프린터 제어를 구현했습니다.',
	'structured-editor-ui':
		'차트 종류에 맞는 설정만 보여주고 데이터 필드, 미리보기, 여섯 영역의 설정 화면을 하나의 편집 흐름으로 연결했습니다.',
	'ai-kickoff-documentation-tool':
		'저장소를 분석해 요구사항과 기능·화면 문서의 초안을 만들고, 표 형태로 검토·편집할 수 있도록 했습니다.',
	'hybrid-life-info-platform':
		'첫 화면에 필요한 정보부터 불러오도록 순서를 바꾸고 최신·만료 캐시를 나눴습니다. 운영에는 바뀐 파일만 올렸습니다.',
	'settlement-operations-platform':
		'표 편집과 Excel 등록 기능을 개발했습니다. 저장에 실패하면 전체를 되돌리고, 재요청에는 기존 결과를 반환하도록 했습니다.',
	'mobile-operations-platform':
		'지도 선택·복귀 화면과 API를 수정하고, 처리 내용·사진을 앱 저장소에 보관하도록 했습니다.',
};

const decisionByStory: Record<string, string> = {
	'multi-role-hybrid-platform':
		'Android 앱에 파일 선택기를 연결하고, 첨부 취소와 뒤로가기, 사진 확대 동작을 구현했습니다.',
	'delivery-output-flow':
		'첫 화면에서 쓰지 않는 페이지와 Excel 라이브러리를 필요할 때 불러오도록 변경했습니다.',
	'structured-editor-ui':
		'모든 차트에 같은 옵션을 붙이지 않고 차트별 설정과 미리보기 갱신 조건을 따로 두었습니다.',
	'ai-kickoff-documentation-tool':
		'검토가 끝난 내용은 유지하고, 선택한 항목만 AI로 다시 작성하도록 했습니다.',
	'hybrid-life-info-platform':
		'외부 API 실패가 첫 화면 전체를 막지 않게 로딩 순서를 바꾸고, 배포 작업마다 파일 수와 해시를 따로 남겼습니다.',
	'settlement-operations-platform':
		'담당 관계를 바꿔도 이전 정산이 달라지지 않도록 거래 당시의 대상과 금액을 따로 보관했습니다.',
	'mobile-operations-platform':
		'다른 사용자의 요청이나 이미 완료된 요청이 재전송되지 않도록 로그인 계정과 서버 처리 내역을 확인했습니다.',
};

const resultByStory: Record<string, string> = {
	'multi-role-hybrid-platform':
		'DB에서 정보 보존과 저장 실패 시 복구를 확인하고 Android 문의·첨부 기능을 점검했습니다. iOS 첨부는 미지원이며 일부 알림 변경은 배포 전입니다.',
	'delivery-output-flow':
		'첫 화면에서 내려받는 JavaScript 용량을 약 74% 줄였습니다. Android 실기기를 Bluetooth 프린터에 연결해 라벨 출력도 확인했습니다.',
	'structured-editor-ui':
		'옵션 변경, 미리보기 렌더링, 패널 접기, 드래그 앤 드롭과 툴팁 흐름을 점검했습니다.',
	'ai-kickoff-documentation-tool':
		'문서 생성과 내보내기, 선택 항목 재작성과 생성 실패 시 처리를 확인했습니다.',
	'hybrid-life-info-platform':
		'2026-07-08 운영 점검에서 첫 요청 약 2.85초와 캐시 응답 약 0.11초를 비교했습니다. 최종 테스트 결과와 날짜별 배포 내역도 따로 기록했습니다.',
	'settlement-operations-platform':
		'중복·부분 등록이 차단되고 기존 정산 금액이 유지되는지 DB에서 확인했습니다. 개발 환경에 반영했으며 감사 기록은 재설계 중입니다.',
	'mobile-operations-platform':
		'실기기에서 통신 단절·앱 재실행 뒤 요청 복원과 서버 반영을 확인했습니다. 일부 장애 조합은 미검증이며 중복 전송 건은 조사 중입니다.',
};

const careerBriefEvidenceByStory: Record<string, readonly string[]> = {
	'multi-role-hybrid-platform': [
		'격리 MariaDB에서 회원 정보 보존·실패 시 취소·동시 요청, Android 실기기의 파일 선택·취소·이미지 확대',
	],
	'delivery-output-flow': [
		'초기 JavaScript 2,405.50 → 616.59 kB, gzip 815.10 → 204.38 kB',
		'Android 16/API 36 실기기에서 권한, Bluetooth 연결, 실물 라벨 출력',
	],
	'structured-editor-ui': [
		'미리보기 렌더링, 옵션 변경, 패널 접기, 드래그 앤 드롭, 툴팁 점검',
	],
	'ai-kickoff-documentation-tool': [
		'저장소 자료 확인 → 문서 초안 생성 → 표에서 검토·편집 → 선택 항목 재작성 순서 점검',
	],
	'hybrid-life-info-platform': [
		'2026-07-08 운영 스모크 테스트에서 첫 요청 약 2.85초, 캐시 응답 약 0.11초',
		'최종 mvn test 131 tests / skipped 1, 운영 반영 뒤 해시와 주요 화면 별도 점검',
	],
	'settlement-operations-platform': [
		'격리 MariaDB의 원자 확정·재시도·복구, 개발 환경 전환 전후 업무 필드 해시 대조',
	],
	'mobile-operations-platform': [
		'실제 API 연결 차단·앱 재실행·복구 후 대기열과 서버 결과 대조',
	],
};

export const resumeDocument = {
	title: '이력서',
	role: '웹/모바일 프론트엔드 엔지니어',
	profile:
		'React로 업무용 웹을 개발하며 서버 API와 Android 앱 연동도 맡고 있습니다. 정산 관리, 회원 관리와 문의 응대, 라벨 출력, AI 문서화 도구를 개발했습니다.',
	competencies: [
		{
			title: '업무 UI·데이터 정합성',
			detail:
				'표에서 데이터를 편집하고 Excel로 일괄 등록하는 기능을 개발했습니다. 중복 저장을 막고 기존 정산 이력을 보존하도록 했습니다.',
			evidence: [
				{
					source: 'work-story',
					id: 'settlement-operations-platform',
				},
			],
		},
		{
			title: '회원·문의 기능 확장',
			detail:
				'회원 관리와 문의 기능에 접근 권한 검사를 적용하고, Android 앱에서 파일을 첨부할 수 있도록 했습니다.',
			evidence: [
				{
					source: 'work-story',
					id: 'multi-role-hybrid-platform',
				},
			],
		},
		{
			title: '성능·장비 출력',
			detail:
				'웹의 초기 다운로드 용량을 줄이고 Android 앱에 Bluetooth 프린터를 연동했습니다.',
			evidence: [
				{
					source: 'work-story',
					id: 'delivery-output-flow',
				},
			],
		},
		{
			title: 'AI 보조 도구',
			detail:
				'저장소를 분석해 문서 초안을 만들고, 검토 후 필요한 항목만 다시 작성할 수 있는 도구를 개발했습니다.',
			evidence: [
				{
					source: 'work-story',
					id: 'ai-kickoff-documentation-tool',
				},
				{
					source: 'project',
					id: 'ai-agent-playbook',
				},
			],
		},
	],
	careers: [
		{
			company: triphosCareerEvidence.company,
			period: triphosCareerEvidence.period,
			officialTitle: triphosCareerEvidence.officialTitle,
			role: triphosCareerEvidence.role,
			summary:
				'정산 웹, 물류 라벨 출력 앱, AI 문서화 도구를 개발하고 기존 웹과 모바일 앱을 유지보수했습니다.',
			highlights: [
				'Excel 자료가 중복되거나 일부만 등록되지 않도록 처리하고, 담당 관계가 바뀌어도 기존 정산 금액은 유지하도록 했습니다.',
				'회원 관리와 문의 기능을 개발하고, Android 앱에서 파일을 첨부하거나 사진을 확대해 볼 수 있도록 했습니다.',
				'페이지와 Excel 처리 코드를 필요할 때만 불러오도록 바꿔, 첫 화면에서 내려받는 JavaScript 용량을 약 74% 줄였습니다.',
				'웹에서 요청한 라벨을 Android 앱을 통해 Bluetooth 프린터로 출력하도록 구현하고 실기기로 확인했습니다.',
				'저장소를 분석해 문서 초안을 만들고, 검토 후 필요한 항목만 AI로 다시 작성할 수 있는 사내 도구를 개발했습니다.',
			],
			evidence: [
				{
					source: 'profile',
					id: triphosCareerEvidence.id,
					visibility: 'private',
				},
				...featuredStories.map(({ id }) => workStoryEvidence(id)),
			],
		},
		{
			company: tisCareerEvidence.company,
			period: tisCareerEvidence.period,
			officialTitle: tisCareerEvidence.officialTitle,
			role: '대학생 현장실습(기획·데이터 자동화)',
			summary:
				'공장 에너지 관리 시스템의 화면과 데이터 구조를 정리하고 에너지 데이터 수집을 보조했습니다.',
			highlights: tisCareerEvidence.highlights,
			evidence: [
				{ source: 'profile', id: tisCareerEvidence.id, visibility: 'private' },
			],
		},
	],
	projects: [
		{
			id: captainDonghae.id,
			title: 'C. Donghae',
			period: formatKoreanPeriod(captainDonghae.duration),
			role: '3명 팀 / 프론트엔드 개발',
			summary:
				'동해선 이용객이 실시간 교통과 주변 정보를 한 지도에서 볼 수 있는 웹 서비스입니다.',
			highlights: [
				'백엔드 개발자 2명과 Swagger 문서를 보며 API를 연결하고, 72시간 안에 Google Maps와 주요 화면, 드래그형 바텀 시트를 구현했습니다.',
			],
			technologies: captainDonghae.techStack,
			evidence: [projectEvidence(captainDonghae.id)],
		},
		{
			id: shareBBy.id,
			title: 'ShareBBy',
			period: formatKoreanPeriod(shareBBy.duration),
			role: 'React Native와 Firebase 개발',
			summary:
				'취미 활동을 올리고 함께할 사람을 찾는 앱으로 2024년 App Store에 배포했습니다.',
			highlights: [
				'Android 대응과 게시글·댓글 작성 및 수정, 위치 필터, 목록 새로고침과 무한 스크롤을 구현했습니다.',
				'Firebase 데이터 관계를 ERD로 정리하고 이미지 캐시 문제를 재현해 대체 라이브러리를 적용했습니다.',
			],
			technologies: shareBBy.techStack,
			evidence: [projectEvidence(shareBBy.id)],
		},
		{
			id: postureTeacher.id,
			title: postureTeacher.title,
			period: formatKoreanPeriod(postureTeacher.duration),
			role: '2명 팀 / Android 개발',
			summary:
				'카메라 프레임에서 자세를 판별하고 운동 시간을 기록하는 Android 앱입니다.',
			highlights: [
				'Ubuntu에서 MediaPipe AAR를 빌드해 앱에 통합하고, 신체 지점의 각도와 길이로 자세 판별과 유지 시간 측정을 구현했습니다.',
			],
			technologies: postureTeacher.techStack,
			evidence: [projectEvidence(postureTeacher.id)],
		},
		{
			id: aiAgentPlaybook.id,
			title: aiAgentPlaybook.title,
			period: formatKoreanPeriod(aiAgentPlaybook.duration),
			role: '1인 개발',
			summary:
				'AI 에이전트가 프로젝트 규칙과 이전 작업 내용을 참고하도록 돕는 개인 개발 도구입니다.',
			highlights: [
				'CLI, 스킬, 템플릿, 읽기 전용 MCP 도구를 만들고 파일을 바꾸는 명령에는 dry-run을 두었습니다.',
				'npm 패키지와 GitHub 저장소로 공개했습니다.',
			],
			technologies: aiAgentPlaybook.techStack,
			evidence: [projectEvidence(aiAgentPlaybook.id)],
		},
	],
	skillGroups: recruitingDocumentSkillGroups,
	education: [
		{
			title: universityEducationEvidence.title,
			period: universityEducationEvidence.period,
			detail: universityEducationEvidence.detail,
			evidence: [
				{
					source: 'profile',
					id: universityEducationEvidence.id,
					visibility: 'public',
				},
			],
		},
		{
			title: '프로그래머스 데브코스',
			period: '2023.12 ~ 2024.05',
			detail: 'Cloud Application Engineering 과정, React와 React Native',
			evidence: [{ source: 'activity', id: 'programmers-devcourse-student' }],
		},
	],
	awards: [
		{
			title: 'DIVE 2024 글로벌 데이터 해커톤',
			period: '2024.10',
			detail: '부산테크노파크원장상(3등)',
			evidence: [{ source: 'award', id: 'DIVE 2024 해커톤' }],
		},
		{
			title: '경남소프트웨어 경진대회',
			period: '2021.10',
			detail: 'ESD HotDeal, 최우수상',
			evidence: [{ source: 'award', id: '경남소프트웨어 경진대회' }],
		},
	],
} as const satisfies ResumeDocumentCopy;

export const careerBriefDocument = {
	title: '경력기술서',
	role: '웹/모바일 프론트엔드 엔지니어',
	company: {
		name: triphosCareerEvidence.company,
		period: triphosCareerEvidence.period,
		officialTitle: triphosCareerEvidence.officialTitle,
		role: triphosCareerEvidence.role,
		summary:
			'정산 웹과 회원 관리, 문의 응대, 물류 라벨 출력, AI 문서화 도구를 개발했습니다. 기존 웹과 앱의 유지보수도 맡았습니다.',
		responsibilities: [
			'React 편집표·Excel 등록·정산 화면과 Spring Boot API 개발',
			'회원·문의 API와 Android 파일 선택, Bluetooth 프린터 연동',
			'AI 문서화 도구 개발, 레거시 웹·앱의 기능 확장과 오류 수정',
		],
		evidenceRefs: [
			{
				source: 'profile',
				id: triphosCareerEvidence.id,
				visibility: 'private',
			},
			...featuredStories.map(({ id }) => workStoryEvidence(id)),
		],
	},
	featuredWork: featuredStories.map((story) => ({
		id: story.id,
		title: story.title,
		period: story.period,
		platform: careerPlatformByStory[story.id] ?? story.platform,
		goal: careerGoalByStory[story.id] ?? story.headline,
		contribution: contributionByStory[story.id],
		decision: decisionByStory[story.id],
		result: resultByStory[story.id],
		evidence: careerBriefEvidenceByStory[story.id],
		technologies: story.stack,
		evidenceRefs: [workStoryEvidence(story.id)],
	})),
	supportingWork: supportingStories.map((story) => ({
		id: story.id,
		title: story.title,
		period: story.period,
		decision: supportingDecisionByStory[story.id],
		result: supportingResultByStory[story.id] ?? story.checks[0],
		evidenceRef: workStoryEvidence(story.id),
	})),
	practices: [],
	skillGroups: [],
} as const satisfies CareerBriefCopy;
