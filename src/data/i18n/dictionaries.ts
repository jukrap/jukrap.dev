// Generated from the reviewed public content snapshot. Edit the authoring source.

import { readCareerValue, readCareerCall } from '@/data/publicCareer';

import snapshot from '@/data/generated/career/i18n-dictionaries.json';

import { LocaleDictionary, Localized } from '@/types/locale';

export const dictionaries: Localized<LocaleDictionary> = (() => {
	const result = readCareerValue<Localized<LocaleDictionary>>(
		snapshot,
		'dictionaries',
	);
	result.ko.webView.externalDescription = (host: string) =>
		`${host}으로 이동할 수 있습니다`;
	result.en.webView.externalDescription = (host: string) =>
		`Open ${host} in a new tab or webview.`;
	return result;
})();
