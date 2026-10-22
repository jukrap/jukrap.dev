import { links as aboutLinks } from '@/data/about/links';
import type { PortfolioPageDefinition } from '@/types/documents';
import type { Locale } from '@/types/locale';
import { supportingDocumentCopy, workDocumentCopy } from './editorialCopy';
import { projectDocumentCopy } from './projectCopy';
import { getRecruitingDocumentManifest, portfolioPageIds } from './manifest';
import { getPortfolioFeatureCases } from './portfolioFeatureCases';
import { getResumeDocument, getDocumentSkillGroups } from './privateDocuments';
import { portfolioPublicEmails } from './publicContact';
import { decisionCases } from '@/data/decisionCases';
import type { DocumentContentSection } from '@/types/documents';
import {
	getProject,
	getWorkStory,
	projectEvidence,
	workStoryEvidence,
	workCaseEvidence,
	visibleProjectLinks,
} from './sourceSelectors';

export function getPortfolioDocument(
	locale: Locale,
): readonly PortfolioPageDefinition[] {
	const ko = locale === 'ko';
	const t = (korean: string, english: string) => (ko ? korean : english);
	const manifest = getRecruitingDocumentManifest(locale);
	const featured = manifest.selection.featuredWorkStoryIds.map((id) =>
		getWorkStory(id, locale),
	);
	const supporting = manifest.selection.portfolioSupportingWorkStoryIds.map(
		(id) => getWorkStory(id, locale),
	);
	const resume = getResumeDocument(locale);
	const caseStories = [
		...featured,
		getWorkStory('react-admin-state-migration', locale),
	];
	const decisionSections = (id: string): DocumentContentSection[] => {
		const entry = decisionCases[locale][id];
		return [
			{ id: 'context', title: t('해결할 문제', 'Problem'), body: [entry.context] },
			...entry.points.map((point, index) => ({
				id: `decision-${index + 1}`,
				title: point.title,
				body: [point.decision],
				items: [
					{ title: t('검증', 'Verification'), description: point.verification },
				],
			})),
			{ id: 'result', title: t('결과', 'Outcome'), body: [entry.outcome] },
		];
	};

	const links = [
		...portfolioPublicEmails.map(({ address }) => ({
			label: t('이메일', 'Email'),
			href: 'mailto:' + address,
		})),
		...aboutLinks
			.filter(({ type }) => type === 'github' || type === 'linkedin')
			.map(({ text, url }) => ({ label: text, href: url })),
		{
			label: t('개인 사이트', 'Website'),
			href: `https://jukrap.vercel.app/${locale}`,
		},
	];
	const pages: PortfolioPageDefinition[] = [
		{
			id: 'cover',
			pageNumber: 1,
			kind: 'cover',
			eyebrow: manifest.role,
			title: t('박주철', 'Ju-cheol Park'),
			aliases: ['experience-overview'],
			summary: t(
				'AI 문서 분석 플랫폼과 정산 ERP의 풀스택 개발, 물류·주식 업무 웹과 Android 연동 경험.',
				'Full-stack AI document analysis and settlement platforms, with web applications and Android integration for business workflows.',
			),
			metadata: [
				{
					label: t('경력', 'Experience'),
					value: resume.careers[0].company + ' / ' + resume.careers[0].period,
				},
				{
					label: t('담당', 'Scope'),
					value: t(
						'웹 화면과 서버 API 개발, Android 앱 연동',
						'Built web interfaces and server APIs, and integrated Android app features',
					),
				},
			],
			sections: [
				{ id: 'contact', links },
				{
					id: 'main-work',
					title: t('주요 경험', 'Selected work'),
					items: [
						...featured.map((story) => ({
							title: story.title,
							description:
								story.id === 'delivery-output-flow'
									? workDocumentCopy[locale][story.id].overviewDetail
									: decisionCases[locale][story.id].points[0].decision,
							evidence: [workStoryEvidence(story.id)],
						})),
						{
							title: 'AI Agent Playbook',
							description: t(
								'프로젝트 규칙과 스킬을 관리하는 개인 개발 도구입니다. 설치 실패 시 복구와 사용자 수정본 보존 기능을 구현했습니다.',
								'A personal tool for project rules and skills, with installation recovery and protection for user-edited files.',
							),
							evidence: [projectEvidence('ai-agent-playbook')],
						},
					],
				},
			],
			evidence: [
				{ source: 'profile', id: 'personal-info' },
				{ source: 'profile', id: 'links' },
				...resume.careers[0].evidence.filter((ref) => ref.source === 'profile'),
				...featured.map(({ id }) => workStoryEvidence(id)),
				projectEvidence('ai-agent-playbook'),
			],
		},
		...caseStories.map((story, index): PortfolioPageDefinition => {
			const copy = workDocumentCopy[locale][story.id];
			const isAi = story.id === 'ai-document-analysis';
			const isErp = story.id === 'settlement-operations-platform';
			const isLogistics = story.id === 'delivery-output-flow';
			const chapter = isErp
				? story.chapters.find(({ id }) => id === 'settlement-operations-platform')!
				: isLogistics
					? story.chapters.find(({ id }) => id === 'delivery-operations-web')!
					: undefined;
			return {
				id: isLogistics ? 'logistics-web' : story.id,
				aliases: isErp ? ['settlement-saving'] : undefined,
				pageNumber: index + 2,
				kind: 'case',
				eyebrow: `${t('회사 업무', 'Company work')} ${String(index + 1).padStart(2, '0')}${isLogistics ? ' / Web' : ''}`,
				title: chapter?.title ?? story.title,
				summary: copy.summary,
				metadata: [
					{ label: t('기간', 'Period'), value: chapter?.period ?? story.period },
					{
						label: t('담당', 'Scope'),
						value:
							isErp || isAi
								? t('풀스택 개발', 'Full-stack development')
								: isLogistics
									? t('프론트엔드 전체 개발', 'Complete frontend development')
									: t('프론트엔드 전체 개발', 'Complete frontend development'),
					},
				],
				technologies: chapter?.stack ?? story.stack,

				sections:
					isAi || isErp || isLogistics
						? decisionSections(chapter?.id ?? story.id).map((section) =>
								section.id === 'result'
									? {
											...section,
											metrics: isAi
												? story.impact
												: isLogistics
													? story.resultSections.find(
															({ id }) => id === 'delivery-operations-web',
														)!.impact
													: undefined,
										}
									: section,
							)
						: [
								{
									id: 'contribution',
									title: t('담당 구현', 'Implementation'),
									items: copy.actions,
								},
								{ id: 'result', title: t('결과', 'Outcome'), body: [copy.result] },
							],
				evidence: [
					workStoryEvidence(story.id),
					...(chapter ? [workCaseEvidence(chapter.id)] : []),
				],
			};
		}),
	];
	const erp = getWorkStory('settlement-operations-platform', locale);
	const erpMobile = erp.chapters.find(({ id }) => id === 'erp-mobile-workflow')!;
	const erpMobileCopy = workDocumentCopy[locale][erpMobile.id];
	pages.push({
		id: erpMobile.id,
		pageNumber: 0,
		kind: 'case',
		eyebrow: `${t('회사 업무', 'Company work')} ${String(featured.findIndex(({ id }) => id === erp.id) + 1).padStart(2, '0')} / Mobile`,
		title: erpMobile.title,
		summary: erpMobileCopy.summary,
		metadata: [
			{ label: t('기간', 'Period'), value: erpMobile.period },
			{
				label: t('담당', 'Scope'),
				value: t(
					'풀스택 개발 · 채팅 시스템 제외',
					'Full-stack development · excluding the chat system',
				),
			},
		],
		technologies: erpMobile.stack,
		sections: decisionSections(erpMobile.id),
		evidence: [workStoryEvidence(erp.id), workCaseEvidence(erpMobile.id)],
	});

	const logistics = getWorkStory('delivery-output-flow', locale);
	const mobile = logistics.chapters.find(
		({ id }) => id === 'mobile-output-bridge',
	)!;
	const mobileCopy = workDocumentCopy[locale]['mobile-output-bridge'];
	const logisticsPageIndex = pages.findIndex(({ id }) => id === 'logistics-web');
	const logisticsWorkNumber = String(
		featured.findIndex(({ id }) => id === logistics.id) + 1,
	).padStart(2, '0');
	pages.splice(logisticsPageIndex + 1, 0, {
		id: 'logistics-mobile',
		pageNumber: logisticsPageIndex + 2,
		kind: 'case',
		eyebrow: `${t('회사 업무', 'Company work')} ${logisticsWorkNumber} / Android`,
		title: t('물류 라벨 출력 앱', 'Logistics Label Printing App'),
		summary: mobileCopy.summary,
		metadata: [
			{ label: t('기간', 'Period'), value: mobile.period },
			{
				label: t('담당', 'Scope'),
				value: t('Android 앱 개발', 'Android app development'),
			},
		],
		technologies: mobile.stack,
		sections: decisionSections(mobile.id),
		evidence: [workStoryEvidence(logistics.id), workCaseEvidence(mobile.id)],
	});
	pages.forEach((page, index) => {
		page.pageNumber = index + 1;
	});
	pages.push({
		id: 'supporting-work',
		pageNumber: pages.length + 1,
		kind: 'compact-work',
		eyebrow: t('회사 업무', 'Company work'),
		title: t('그 밖에 맡은 업무', 'Further company work'),
		summary: t(
			'기존 서비스에 기능을 추가하고, Android 버전과 현장 사용 조건에 맞춰 수정한 작업입니다.',
			'Feature additions to existing services and updates for Android versions and field use.',
		),
		sections: [
			{
				id: 'work-list',
				items: supporting.map((story, index) => ({
					label: String(
						featured.length +
							manifest.selection.portfolioDetailedWorkStoryIds.length +
							index +
							1,
					).padStart(2, '0'),
					title: story.title,
					description: supportingDocumentCopy[locale][story.id],
					metadata: [
						{ label: t('기간', 'Period'), value: story.period },
						{ label: t('플랫폼', 'Platform'), value: story.platform },
					],
					technologies: story.stack,
					evidence: [workStoryEvidence(story.id)],
				})),
			},
		],
		evidence: supporting.map(({ id }) => workStoryEvidence(id)),
	});
	const weather = getWorkStory('hybrid-life-info-platform', locale);
	pages.push({
		id: 'weather-feature',
		pageNumber: pages.length + 1,
		kind: 'case',
		eyebrow: `${t('회사 업무', 'Company work')} ${String(featured.length + 2).padStart(2, '0')}`,
		title: t('생활정보 앱의 날씨 기능', 'Weather in a Daily Information App'),
		summary: t(
			'기존 Android 앱에 공공 데이터 기반 날씨 기능을 추가하며, WebView 화면과 서버 API 연동 / 캐시 처리를 맡았습니다.',
			'Added public-data weather features to an existing Android app, implementing the WebView interface, server-side API integration, and caching.',
		),
		metadata: [
			{ label: t('기간', 'Period'), value: weather.period },
			{
				label: t('담당', 'Scope'),
				value: t(
					'프론트엔드·백엔드 기능 개발',
					'Frontend and backend feature development',
				),
			},
		],
		technologies: weather.stack,
		sections: [
			{
				id: 'context',
				title: t('여러 API로 나뉜 날씨 정보', 'Weather data across separate APIs'),
				body: [
					t(
						'날씨와 대기질, 특보는 조회 지역과 갱신 주기가 달랐습니다. 화면을 열 때마다 모든 정보를 다시 요청하면 같은 지역의 호출이 반복되고, 느린 응답 하나 때문에 다른 정보까지 늦게 표시될 수 있었습니다.',
						'Weather, air quality, and alerts had different regional coverage and update schedules. Fetching everything on every visit repeated requests for the same area and could hold up available information while a slower response arrived.',
					),
				],
			},
			{
				id: 'cache',
				title: t('지역과 정보 종류에 따른 캐시', 'Caching by region and data type'),
				items: [
					{
						title: t('조회한 지역의 정보 재사용', 'Reuse data for requested regions'),
						description: t(
							'같은 지역의 정보를 매번 요청하지 않도록 서버 응답을 지역 / 정보 종류별로 캐시합니다. 보관 시간은 각 정보의 갱신 주기에 맞췄습니다.',
							'Cached responses by region and data type, with expiry periods matched to each type.',
						),
					},
					{
						title: t('동시에 들어온 요청 묶기', 'Share in-flight requests'),
						description: t(
							'같은 지역 / 정보를 동시에 요청하면 진행 중인 결과를 함께 사용하도록 묶어, 외부 API에 같은 요청이 중복해서 전송되지 않도록 했습니다.',
							'Reused an in-flight result for the same cache key rather than issuing another external API call.',
						),
					},
				],
			},
			{
				id: 'display',
				title: t('핵심 정보부터 표시', 'Show core information first'),
				body: [
					t(
						'현재 날씨와 핵심 예보를 먼저 표시하고, 대기질 / 특보 등 부가 정보는 응답이 도착할 때 채웁니다. 부가 정보가 늦거나 조회에 실패해도 이미 받은 날씨 정보는 계속 볼 수 있습니다.',
						'Displayed current conditions and the core forecast first, then filled in air quality and alerts as responses arrived. Delays or failures in supplementary requests did not hide weather data already received.',
					),
				],
			},
			{
				id: 'failure',
				title: t('오래된 정보를 보여 줄 때의 기준', 'Handling stale information'),
				body: [
					t(
						'외부 조회 실패 시 허용 범위 안에서 이전 값을 표시합니다. 만료된 ‘특보 없음’은 현재도 특보가 없다는 뜻이 아니므로 조회 불가로 구분하고, 이전 특보에는 최근 조회 기준임을 표시합니다.',
						'When an external request failed, allowed stale values could remain visible. An expired “no alerts” response was marked unavailable rather than treated as current. Previously retrieved active alerts were labelled as based on the last retrieval.',
					),
				],
			},
		],
		evidence: [workStoryEvidence(weather.id), workCaseEvidence(weather.id)],
	});
	pages.push(...getPortfolioFeatureCases(locale));
	manifest.selection.portfolioProjectIds.forEach((id, index) => {
		const project = getProject(id);
		const copy = projectDocumentCopy[locale][id];
		pages.push({
			id,
			pageNumber: pages.length + 1,
			kind: 'project',
			eyebrow: `${t('프로젝트', 'Project')} ${String(index + 1).padStart(2, '0')}`,
			title: copy.title,
			summary: copy.summary,
			metadata: [
				{
					label: t('기간', 'Period'),
					value: ko
						? project.duration.replace(/Present/g, '현재')
						: project.duration.replace(/현재/g, 'Present'),
				},
				{ label: t('담당', 'Role'), value: copy.role },
			],
			technologies: project.techStack,
			sections:
				id === 'ai-agent-playbook'
					? decisionSections(id).map((section) =>
							section.id === 'result'
								? { ...section, links: visibleProjectLinks(id) }
								: section,
						)
					: [
							{
								id: 'problem',
								title:
									id === 'captain-donghae'
										? t('해커톤의 개발 범위', 'Hackathon scope')
										: id === 'sharebby'
											? t(
													'Android 지원과 이미지 갱신',
													'Android support and image updates',
												)
											: id === 'ai-agent-playbook'
												? t(
														'기록 관리와 사용자 파일 보존',
														'Context and user-file preservation',
													)
												: id === 'itzip'
													? t('편집 기능과 팀 개발 환경', 'Editing and team development')
													: t('카메라 분석과 화면 조작', 'Camera analysis and interaction'),
								body: [copy.problem],
							},
							{
								id: 'contribution',
								title: t('담당 구현', 'Implementation'),
								items: copy.actions,
							},
							{
								id: 'result',
								title:
									id === 'captain-donghae'
										? t('수상', 'Award')
										: id === 'sharebby'
											? t('배포', 'Release')
											: id === 'ai-agent-playbook'
												? t('공개와 검증', 'Release and verification')
												: id === 'itzip'
													? t('팀 개발에 적용', 'Team adoption')
													: t('측정 결과', 'Measured result'),
								body: [copy.result],
								links: visibleProjectLinks(id),
							},
						],
			images: copy.images,
			evidence: [
				projectEvidence(id),
				...(id === 'captain-donghae'
					? [{ source: 'award' as const, id: 'DIVE 2024 해커톤' }]
					: []),
			],
		});
	});
	pages.push({
		id: 'closing',
		pageNumber: pages.length + 1,
		kind: 'closing',
		eyebrow: t('프로필', 'Profile'),
		title: t('기술, 교육과 수상', 'Skills, education, and awards'),
		sections: [
			{
				id: 'skills',
				title: t('기술', 'Skills'),
				items: getDocumentSkillGroups(locale).map(({ label, items }) => ({
					title: label,
					description: items.join(', '),
				})),
			},
			{
				id: 'education',
				title: t('교육·활동', 'Education & activities'),
				items: resume.education.map(({ title, period, detail, evidence }) => ({
					title,
					meta: period,
					description: detail,
					evidence,
				})),
			},
			{
				id: 'awards',
				title: t('수상', 'Awards'),
				items: resume.awards.map(({ title, period, detail, evidence }) => ({
					title,
					meta: period,
					description: detail,
					evidence,
				})),
			},
			{
				id: 'more',
				title: t('더 보기', 'More'),
				links: [
					{ label: 'About', href: `https://jukrap.vercel.app/${locale}/about` },
					{ label: 'Work', href: `https://jukrap.vercel.app/${locale}/work` },
					{
						label: 'Side Projects',
						href: `https://jukrap.vercel.app/${locale}/projects`,
					},
				],
			},
		],
		evidence: [
			{ source: 'profile', id: 'skills' },
			{ source: 'profile', id: 'education-university' },
			{ source: 'activity', id: 'programmers-devcourse-student' },
			{ source: 'activity', id: 'programmers-devcourse-assistant-mentor' },
			...resume.awards.flatMap(({ evidence }) => evidence ?? []),
		],
	});
	const mobilePage = pages.find((page) => page.id === 'logistics-mobile')!;
	mobilePage.sections = mobilePage.sections.map((section) =>
		section.id === 'result'
			? {
					...section,
					flow: {
						label: t('라벨 출력 연결', 'Label-printing path'),
						steps: [
							{
								title: 'WebView',
								detail: t('라벨 데이터·출력 요청', 'Label data and print request'),
							},
							{
								title: 'Android',
								detail: t(
									'브리지·권한·장비 연결',
									'Bridge, permissions, device connection',
								),
							},
							{
								title: 'Bluetooth',
								detail: t('프린터 SDK·라벨 출력', 'Printer SDK and label output'),
							},
						],
					},
				}
			: section,
	);
	const stockPage = pages.find(
		(page) => page.id === 'react-admin-state-migration',
	)!;
	stockPage.sections = [
		{
			id: 'table',
			title: t('함께 쓰는 테이블·필터·모달', 'Shared tables, filters, and modals'),
			body: [
				t(
					'계좌 / 종목 / 주문 화면의 목록 / 검색 / 상세 / 등록 / 수정 UI는 공통 컴포넌트를 사용합니다. 테이블에는 열 고정 / 너비 조절 / 재정렬 기능을 구현했습니다.',
					'Built shared list, search, detail and editing components for account, stock and order screens. Added column pinning, resizing and reordering to tables, and implemented queries and input interactions with MSW mock APIs.',
				),
			],
		},
		{
			id: 'state',
			title: t('주문내역의 조회 조건 적용', 'Applying order-history filters'),
			body: [
				t(
					'선택 중인 계좌 / 종목과 목록 조회에 적용한 조건을 따로 관리합니다. 필터를 바꾸는 동안에는 기존 목록을 유지하고, 조회 버튼을 누르면 제출한 조건으로 TanStack Query의 조회 키를 갱신합니다.',
					'Kept account and stock selections separate from the conditions applied to the list. Editing a filter retained the existing results; pressing Search applied the submitted conditions to the TanStack Query key.',
				),
			],
		},
		{
			id: 'repeat-query',
			title: t('재조회와 더보기', 'Repeat searches and load more'),
			items: [
				{
					title: t('같은 조건으로 다시 조회', 'Search again with the same filters'),
					description: t(
						'기존 조회를 초기화해 첫 페이지부터 다시 불러옵니다.',
						'Reset the existing query to reload from the first page.',
					),
				},
				{
					title: t('더보기 요청 중복 방지', 'Guard load-more requests'),
					description: t(
						'다음 페이지가 없거나 이미 요청 중이면 추가 요청을 보내지 않습니다.',
						'Skipped additional requests when no next page remained or a request was already in progress.',
					),
				},
			],
		},
	];
	pages.sort(
		(a, b) => portfolioPageIds.indexOf(a.id) - portfolioPageIds.indexOf(b.id),
	);
	pages.forEach((page, index) => {
		page.pageNumber = index + 1;
	});
	const cover = pages[0];
	cover.sections = cover.sections.map((section) =>
		section.id === 'main-work'
			? {
					...section,
					items: section.items?.map((item, index) => ({
						...item,
						label: String(index + 1).padStart(2, '0'),
					})),
				}
			: section,
	);
	return pages;
}
export const portfolioDocument = getPortfolioDocument('ko');
