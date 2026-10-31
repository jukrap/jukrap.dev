// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/workStories.json';

import type { Locale, Localized } from '@/types/locale';

import type { ProfessionalStory } from '@/types/work';

export const workStoryDefinitions: readonly [
	{
		readonly id: 'ai-document-analysis';
		readonly tier: 'featured';
		readonly caseIds: readonly ['ai-document-analysis'];
		readonly includeInAbout: true;
	},
	{
		readonly id: 'delivery-output-flow';
		readonly tier: 'featured';
		readonly caseIds: readonly [
			'delivery-operations-web',
			'mobile-output-bridge',
		];
		readonly includeInAbout: true;
	},
	{
		readonly id: 'structured-editor-ui';
		readonly tier: 'compact';
		readonly caseIds: readonly ['structured-editor-ui'];
		readonly includeInAbout: false;
	},
	{
		readonly id: 'settlement-operations-platform';
		readonly tier: 'featured';
		readonly caseIds: readonly [
			'settlement-operations-platform',
			'erp-mobile-workflow',
		];
		readonly includeInAbout: true;
	},
	{
		readonly id: 'react-admin-state-migration';
		readonly tier: 'compact';
		readonly caseIds: readonly ['react-admin-state-migration'];
		readonly includeInAbout: false;
	},
	{
		readonly id: 'multi-role-hybrid-platform';
		readonly tier: 'compact';
		readonly caseIds: readonly ['multi-role-hybrid-platform'];
		readonly includeInAbout: false;
	},
	{
		readonly id: 'ai-kickoff-documentation-tool';
		readonly tier: 'compact';
		readonly caseIds: readonly ['ai-kickoff-documentation-tool'];
		readonly includeInAbout: false;
	},
	{
		readonly id: 'mobile-operations-platform';
		readonly tier: 'compact';
		readonly caseIds: readonly ['mobile-operations-platform'];
		readonly includeInAbout: false;
	},
	{
		readonly id: 'legacy-support-web';
		readonly tier: 'compact';
		readonly caseIds: readonly ['legacy-support-web'];
		readonly includeInAbout: false;
	},
	{
		readonly id: 'hybrid-life-info-platform';
		readonly tier: 'compact';
		readonly caseIds: readonly ['hybrid-life-info-platform'];
		readonly includeInAbout: false;
	},
	{
		readonly id: 'legacy-mobile-compatibility';
		readonly tier: 'compact';
		readonly caseIds: readonly ['legacy-mobile-compatibility'];
		readonly includeInAbout: false;
	},
	{
		readonly id: 'hybrid-security-boundary';
		readonly tier: 'compact';
		readonly caseIds: readonly ['hybrid-security-boundary'];
		readonly includeInAbout: false;
	},
	{
		readonly id: 'field-terminal-android';
		readonly tier: 'compact';
		readonly caseIds: readonly ['field-terminal-android'];
		readonly includeInAbout: false;
	},
] = readCareerValue<
	readonly [
		{
			readonly id: 'ai-document-analysis';
			readonly tier: 'featured';
			readonly caseIds: readonly ['ai-document-analysis'];
			readonly includeInAbout: true;
		},
		{
			readonly id: 'delivery-output-flow';
			readonly tier: 'featured';
			readonly caseIds: readonly [
				'delivery-operations-web',
				'mobile-output-bridge',
			];
			readonly includeInAbout: true;
		},
		{
			readonly id: 'structured-editor-ui';
			readonly tier: 'compact';
			readonly caseIds: readonly ['structured-editor-ui'];
			readonly includeInAbout: false;
		},
		{
			readonly id: 'settlement-operations-platform';
			readonly tier: 'featured';
			readonly caseIds: readonly [
				'settlement-operations-platform',
				'erp-mobile-workflow',
			];
			readonly includeInAbout: true;
		},
		{
			readonly id: 'react-admin-state-migration';
			readonly tier: 'compact';
			readonly caseIds: readonly ['react-admin-state-migration'];
			readonly includeInAbout: false;
		},
		{
			readonly id: 'multi-role-hybrid-platform';
			readonly tier: 'compact';
			readonly caseIds: readonly ['multi-role-hybrid-platform'];
			readonly includeInAbout: false;
		},
		{
			readonly id: 'ai-kickoff-documentation-tool';
			readonly tier: 'compact';
			readonly caseIds: readonly ['ai-kickoff-documentation-tool'];
			readonly includeInAbout: false;
		},
		{
			readonly id: 'mobile-operations-platform';
			readonly tier: 'compact';
			readonly caseIds: readonly ['mobile-operations-platform'];
			readonly includeInAbout: false;
		},
		{
			readonly id: 'legacy-support-web';
			readonly tier: 'compact';
			readonly caseIds: readonly ['legacy-support-web'];
			readonly includeInAbout: false;
		},
		{
			readonly id: 'hybrid-life-info-platform';
			readonly tier: 'compact';
			readonly caseIds: readonly ['hybrid-life-info-platform'];
			readonly includeInAbout: false;
		},
		{
			readonly id: 'legacy-mobile-compatibility';
			readonly tier: 'compact';
			readonly caseIds: readonly ['legacy-mobile-compatibility'];
			readonly includeInAbout: false;
		},
		{
			readonly id: 'hybrid-security-boundary';
			readonly tier: 'compact';
			readonly caseIds: readonly ['hybrid-security-boundary'];
			readonly includeInAbout: false;
		},
		{
			readonly id: 'field-terminal-android';
			readonly tier: 'compact';
			readonly caseIds: readonly ['field-terminal-android'];
			readonly includeInAbout: false;
		},
	]
>(snapshot, 'workStoryDefinitions');

export function resolveWorkStories(locale: Locale): ProfessionalStory[] {
	return readCareerCall<ProfessionalStory[]>(
		snapshot,
		'resolveWorkStories',
		locale,
	);
}

export const workStories: Localized<ProfessionalStory[]> = readCareerValue<
	Localized<ProfessionalStory[]>
>(snapshot, 'workStories');
