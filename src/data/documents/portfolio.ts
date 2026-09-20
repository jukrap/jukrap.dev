import { links as aboutLinks } from '@/data/about/links';
import type { PortfolioPageDefinition } from '@/types/documents';
import type { Locale } from '@/types/locale';
import { supportingDocumentCopy, workDocumentCopy } from './editorialCopy';
import { projectDocumentCopy } from './projectCopy';
import { getRecruitingDocumentManifest, portfolioPageIds } from './manifest';
import { getPortfolioFeatureCases } from './portfolioFeatureCases';
import { getResumeDocument, getDocumentSkillGroups } from './privateDocuments';
import { portfolioPublicEmails } from './publicContact';
import { workContributionEvidence } from './workContributionEvidence';
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
				'정산 ERP, 물류 운영, 주식 업무 관리 웹의 화면 개발과 API·Android 연동 경험.',
				'Web applications and Android integration, with selected work in settlement, logistics, and stock administration.',
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
					items: featured.map((story) => ({
						title: story.title,
						description: workDocumentCopy[locale][story.id].overviewDetail,
						evidence: [workStoryEvidence(story.id)],
					})),
				},
			],
			evidence: [
				{ source: 'profile', id: 'personal-info' },
				{ source: 'profile', id: 'links' },
				...resume.careers[0].evidence.filter((ref) => ref.source === 'profile'),
				...featured.map(({ id }) => workStoryEvidence(id)),
			],
		},
		...featured.map((story, index): PortfolioPageDefinition => {
			const copy = workDocumentCopy[locale][story.id];
			const isErp = story.id === 'settlement-operations-platform';
			const isLogistics = story.id === 'delivery-output-flow';
			const chapter = isLogistics
				? story.chapters.find(({ id }) => id === 'delivery-operations-web')!
				: undefined;
			const contribution =
				workContributionEvidence[
					(chapter?.id ?? story.id) as keyof typeof workContributionEvidence
				];
			return {
				id: isLogistics ? 'logistics-web' : story.id,
				aliases: isErp ? ['settlement-saving'] : undefined,
				pageNumber: index + 2,
				kind: 'case',
				eyebrow: `${t('회사 업무', 'Company work')} ${String(index + 1).padStart(2, '0')}${isLogistics ? ' / Web' : ''}`,
				title: chapter?.title ?? story.title,
				summary: isErp
					? t(
							'차량·기사 등 기준 정보와 운송료·청구·정산을 관리하는 업무 시스템. ERP 웹 전반과 주요 서버 API 개발, 기존 사용자 웹·모바일 앱의 기능 확장.',
							'A business system for vehicle and driver records, transport fees, billing, and settlement. Built the ERP web app and key server APIs, and extended the existing user-facing web and mobile apps.',
						)
					: isLogistics
						? t(
								'조회·예약·Excel 등록·라벨 출력으로 이어지는 물류 업무 웹. React·TypeScript로 프론트엔드 전체를 개발하고, 서버 API와 PC 라벨 출력을 연동.',
								'A logistics web app for search, reservations, Excel imports, and label printing. Built the complete frontend with React and TypeScript, including server API integration and PC label printing.',
							)
						: copy.summary,
				metadata: [
					{ label: t('기간', 'Period'), value: chapter?.period ?? story.period },
					{
						label: t('담당', 'Scope'),
						value: isErp
							? t('풀스택 개발', 'Full-stack development')
							: isLogistics
								? t('프론트엔드 전체 개발', 'Complete frontend development')
								: t('프론트엔드 전체 개발', 'Complete frontend development'),
					},
					...(contribution
						? [{ ...contribution.copy[locale], kind: 'attribution' as const }]
						: []),
				],
				technologies: chapter?.stack ?? story.stack,
				sections: isErp
					? [
							{
								id: 'contribution',
								title: t(
									'화면 입력부터 일괄 저장까지',
									'From data entry to batch saves',
								),
								items: copy.actions.slice(0, 2),
							},
							{
								id: 'history',
								title: t(
									'기준 정보 변경과 정산 이력',
									'Record changes and settlement history',
								),
								body: [
									t(
										'현재 담당 관계와 과거 거래 정보를 구분해 확정된 정산 금액을 유지했습니다. 차량 정보 저장 결과에는 새 정보 생성·운행 상태 변경과 보험·공과금 등 연결 업무에 미치는 영향을 안내했습니다.',
										'Separated current assignments from historical transactions to retain finalized settlement amounts. Vehicle save feedback identifies newly created records, operating-status changes, and affected insurance or utility records.',
									),
								],
							},
							{
								id: 'logs',
								title: t(
									'작업 내용과 오류를 확인하는 로그',
									'Logs showing actions and errors',
								),
								body: [
									t(
										'초기 로그는 여러 정보를 남겼지만, 기술 항목이 많아 문제가 생긴 과정을 따라가기 불편했습니다. 작업 대상과 변경 내용, 입력 오류의 원인을 화면에 표시하고 불필요한 기술 항목은 줄였습니다.',
										'The initial logs captured many details, but technical fields made it difficult to follow what had happened. I surfaced affected records, changes, and input-error reasons, and removed unnecessary technical fields.',
									),
								],
							},
							{ id: 'status', variant: 'note', body: [copy.result] },
						]
					: isLogistics
						? [
								{
									id: 'contribution',
									title: t('업무 화면과 출력', 'Business interfaces and printing'),
									items: [copy.actions[0], copy.actions[2]],
								},
								{
									id: 'android-connection',
									variant: 'note',
									body: [
										t(
											'같은 프로젝트의 Android 앱에서는 웹의 출력 요청을 Bluetooth 프린터로 전달했습니다. 장비 연결과 권한 처리는 다음 사례에서 설명합니다.',
											'The Android app for this project sends web print requests to Bluetooth printers. The following case covers device connections and permissions.',
										),
									],
								},
								{
									id: 'loading',
									title: t(
										'첫 화면에 필요한 코드만 로딩',
										'Load only the code needed on entry',
									),
									body: [copy.problem, copy.actions[1].description],
								},
								{
									id: 'result',
									title: t('번들 크기 변화', 'Bundle size change'),
									metrics: story.resultSections.find(
										({ id }) => id === 'delivery-operations-web',
									)!.impact,
									body: [
										t(
											'동일 빌드 기준의 초기 엔트리 파일 크기입니다. 전체 다운로드량이나 로딩 시간의 감소율이 아닙니다.',
											'These are initial entry-file sizes on the same build basis, not a reduction in total downloads or loading time.',
										),
									],
								},
								{
									id: 'decision',
									title: t('코드 분리 범위', 'Scope of code splitting'),
									body: [copy.decision!],
								},
							]
						: [
								{
									id: 'contribution',
									title: t('담당 구현', 'Implementation'),
									items: copy.actions,
								},
							],
				evidence: [
					workStoryEvidence(story.id),
					...(chapter ? [workCaseEvidence(chapter.id)] : []),
				],
			};
		}),
	];
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
			{
				...workContributionEvidence['mobile-output-bridge'].copy[locale],
				kind: 'attribution',
			},
		],
		technologies: mobile.stack,
		sections: [
			{ id: 'problem', title: t('배경', 'Context'), body: [mobileCopy.problem] },
			{
				id: 'contribution',
				title: t('담당 구현', 'Implementation'),
				items: mobileCopy.actions,
			},
			{
				id: 'result',
				title: t('결과', 'Outcome'),
				body: [mobileCopy.result],
			},
		],
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
		eyebrow: t('회사 업무 04', 'Company work 04'),
		title: t('생활정보 앱의 날씨 기능', 'Weather in a Daily Information App'),
		summary: t(
			'기존 Android 앱에 공공 데이터 기반 날씨 기능 추가. WebView 화면과 서버의 API 연동·캐시 처리 담당.',
			'Added public-data weather features to an existing Android app, implementing the WebView interface, server-side API integration, and caching.',
		),
		metadata: [
			{ label: t('기간', 'Period'), value: weather.period },
			{
				label: t('담당', 'Scope'),
				value: t('웹·서버 기능 개발', 'Web and server feature development'),
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
							'서버에 지역·정보 종류별 응답을 캐시하고, 정보별 갱신 주기에 맞춰 재사용.',
							'Cached responses by region and data type, with expiry periods matched to each type.',
						),
					},
					{
						title: t('동시에 들어온 요청 묶기', 'Share in-flight requests'),
						description: t(
							'같은 캐시 키의 조회가 진행 중이면 해당 결과를 함께 사용해 외부 API 중복 호출 방지.',
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
						'현재 날씨와 핵심 예보를 먼저 표시하고, 대기질·특보 등 부가 정보는 응답이 도착하면 채우도록 나눴습니다. 부가 정보가 늦거나 조회에 실패해도 이미 받은 날씨 정보는 볼 수 있습니다.',
						'Displayed current conditions and the core forecast first, then filled in air quality and alerts as responses arrived. Delays or failures in supplementary requests did not hide weather data already received.',
					),
				],
			},
			{
				id: 'failure',
				title: t('오래된 정보를 보여 줄 때의 기준', 'Handling stale information'),
				body: [
					t(
						'외부 조회가 실패하면 허용 범위 안에서 이전 값을 표시했습니다. 다만 만료된 ‘특보 없음’은 현재도 특보가 없다는 뜻이 아니므로 조회 불가로 구분하고, 이전에 조회한 특보에는 최근 조회 기준임을 표시했습니다.',
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
			sections: [
				{
					id: 'problem',
					title:
						id === 'captain-donghae'
							? t('해커톤의 개발 범위', 'Hackathon scope')
							: id === 'sharebby'
								? t('Android 지원과 이미지 갱신', 'Android support and image updates')
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
		section.id === 'contribution'
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
					'계좌·종목·주문 화면에 반복되는 목록·검색·상세·등록·수정 UI를 공통 컴포넌트로 구성했습니다. 테이블에는 열 고정·너비 조절·재정렬을 넣고, MSW 모의 API로 조회와 입력 동작을 구현했습니다.',
					'Built shared list, search, detail and editing components for account, stock and order screens. Added column pinning, resizing and reordering to tables, and implemented queries and input interactions with MSW mock APIs.',
				),
			],
		},
		{
			id: 'state',
			title: t('주문내역의 조회 조건 적용', 'Applying order-history filters'),
			body: [
				t(
					'선택 중인 계좌·종목과 목록 조회에 적용한 조건을 따로 관리했습니다. 필터를 바꾸는 중에는 기존 목록을 유지하고, 조회 버튼을 누르면 제출한 조건으로 TanStack Query의 조회 키를 갱신하도록 구현했습니다.',
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
						'기존 조회를 초기화해 첫 페이지부터 다시 불러오도록 처리.',
						'Reset the existing query to reload from the first page.',
					),
				},
				{
					title: t('더보기 요청 중복 방지', 'Guard load-more requests'),
					description: t(
						'다음 페이지가 없거나 이미 요청 중일 때 추가 요청을 보내지 않도록 처리.',
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
	cover.sections = [
		...cover.sections,
		{
			id: 'additional',
			variant: 'note',
			body: [
				t(
					'이어서 생활정보·개인정보 보호 앱과 사내 문서화 도구, 그 밖의 회사 업무와 개인·팀 프로젝트를 소개합니다.',
					'Following these cases: daily information and privacy apps, an internal documentation tool, further company work, and personal and team projects.',
				),
			],
		},
	];
	return pages;
}
export const portfolioDocument = getPortfolioDocument('ko');
