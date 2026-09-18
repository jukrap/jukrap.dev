import { links as aboutLinks } from '@/data/about/links';
import type { PortfolioPageDefinition } from '@/types/documents';
import type { Locale } from '@/types/locale';
import {
	documentProfile,
	supportingDocumentCopy,
	workDocumentCopy,
} from './editorialCopy';
import { projectDocumentCopy } from './projectCopy';
import { getRecruitingDocumentManifest } from './manifest';
import { getResumeDocument, getDocumentSkillGroups } from './privateDocuments';
import { portfolioPublicEmails } from './publicContact';
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
	const supporting = manifest.selection.supportingWorkStoryIds.map((id) =>
		getWorkStory(id, locale),
	);
	const resume = getResumeDocument(locale);
	const supportingPageNumber = featured.length + 4;
	const links = [
		...portfolioPublicEmails.map(({ address }, index) => ({
			label: index ? t('보조 이메일', 'Alternate email') : t('이메일', 'Email'),
			href: 'mailto:' + address,
		})),
		...aboutLinks
			.filter(({ type }) => type !== 'email')
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
			nickname: 'Jukrap',
			summary: documentProfile[locale],
			metadata: [
				{ label: t('직무', 'Role'), value: manifest.role },
				{
					label: t('주요 경험', 'Experience'),
					value: t(
						'웹 UI 개발, API 개발, Android 연동',
						'Web UI development, API development, Android integration',
					),
				},
			],
			sections: [
				{
					id: 'positioning',
					body: [
						t(
							'직접 만든 화면과 구현 과정에서의 선택, 그 결과를 소개합니다.',
							'Selected interfaces, implementation decisions, and outcomes from my work.',
						),
					],
					links,
				},
			],
			evidence: [
				{ source: 'profile', id: 'personal-info' },
				{ source: 'profile', id: 'links' },
			],
		},
		{
			id: 'experience-overview',
			pageNumber: 2,
			kind: 'overview',
			eyebrow: t('경력', 'Experience'),
			title: t('트리포스에서 맡은 일', 'Work at Triphos'),
			summary: `${resume.careers[0].summary} ${t(
				'서버 저장과 접근 권한 처리, Android 앱의 파일 첨부와 라벨 출력 연동도 맡았습니다.',
				'I also implemented persistence and access checks, and connected file attachments and label printing to Android apps.',
			)}`,
			metadata: [
				{
					label: t('회사와 기간', 'Company / period'),
					value: resume.careers[0].company + '  ' + resume.careers[0].period,
				},
				{ label: t('직무', 'Role'), value: resume.careers[0].role },
			],
			sections: [
				{
					id: 'main-work',
					title: t('주요 경험', 'Selected work'),
					items: featured.map((story) => ({
						title: story.title,
						description: [
							workDocumentCopy[locale][story.id].summary,
							workDocumentCopy[locale][story.id].overviewDetail,
						]
							.filter(Boolean)
							.join(' '),
					})),
				},
				{
					id: 'additional-work',
					variant: 'note',
					body: [
						t(
							`추가 업무는 ${supportingPageNumber}쪽과 사이트 Work에 정리했습니다.`,
							`Further work appears on page ${supportingPageNumber} and the Work page.`,
						),
					],
				},
			],
			evidence: featured.map(({ id }) => workStoryEvidence(id)),
		},
		...featured.map((story, index): PortfolioPageDefinition => {
			const copy = workDocumentCopy[locale][story.id];
			const isLogistics = story.id === 'delivery-output-flow';
			const chapter = isLogistics
				? story.chapters.find(({ id }) => id === 'delivery-operations-web')!
				: undefined;
			return {
				id: isLogistics ? 'logistics-web' : story.id,
				pageNumber: index + 3,
				kind: 'case',
				eyebrow: `${t('주요 업무', 'Selected work')} ${String(index + 1).padStart(2, '0')}`,
				title: chapter?.title ?? story.title,
				summary: copy.summary,
				metadata: [
					{ label: t('기간', 'Period'), value: chapter?.period ?? story.period },
					{ label: t('담당', 'Scope'), value: chapter?.area ?? story.area },
				],
				technologies: chapter?.stack ?? story.stack,
				sections: [
					{ id: 'problem', title: t('배경', 'Context'), body: [copy.problem] },
					{
						id: 'contribution',
						title: t('담당 구현', 'Implementation'),
						items: copy.actions,
					},
					...(copy.decision
						? [
								{
									id: 'decision',
									title: t('선택 이유', 'Trade-off'),
									body: [copy.decision],
								},
							]
						: []),
					{
						id: 'result',
						title: t('결과', 'Outcome'),
						body: [copy.result],
						metrics: isLogistics
							? story.resultSections.find(
									({ id }) => id === 'delivery-operations-web',
								)!.impact
							: story.impact,
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
	pages.push(
		{
			id: 'logistics-mobile',
			pageNumber: featured.length + 3,
			kind: 'case',
			eyebrow: t('Android 연동', 'Related work / Android'),
			title: mobile.title,
			summary: mobileCopy.summary,
			metadata: [
				{ label: t('기간', 'Period'), value: mobile.period },
				{ label: t('담당', 'Scope'), value: mobile.area },
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
					metrics: logistics.resultSections.find(({ id }) => id === mobile.id)!
						.impact,
				},
			],
			evidence: [workStoryEvidence(logistics.id), workCaseEvidence(mobile.id)],
		},
		{
			id: 'supporting-work',
			pageNumber: supportingPageNumber,
			kind: 'compact-work',
			eyebrow: t('업무 경험', 'Experience'),
			title: t('추가 업무', 'Additional work'),
			summary: t(
				'웹과 모바일의 기능 확장과 유지보수 경험입니다.',
				'Further feature development and maintenance across web and mobile.',
			),
			sections: [
				{
					id: 'work-list',
					items: supporting.map((story, index) => ({
						label: String(index + 1).padStart(2, '0'),
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
		},
	);
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
				{ id: 'problem', title: t('배경', 'Context'), body: [copy.problem] },
				{
					id: 'contribution',
					title: t('담당 구현', 'Implementation'),
					items: copy.actions,
				},
				{
					id: 'result',
					title: t('결과', 'Outcome'),
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
				title: t('교육', 'Education'),
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
					{ label: 'Work', href: `https://jukrap.vercel.app/${locale}/work` },
					{
						label: 'Projects',
						href: `https://jukrap.vercel.app/${locale}/projects`,
					},
				],
			},
		],
		evidence: [
			{ source: 'profile', id: 'skills' },
			{ source: 'profile', id: 'education-university' },
			{ source: 'activity', id: 'programmers-devcourse-student' },
			...resume.awards.flatMap(({ evidence }) => evidence ?? []),
		],
	});
	return pages;
}

export const portfolioDocument = getPortfolioDocument('ko');
