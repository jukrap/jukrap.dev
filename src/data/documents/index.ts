import { getCareerBriefDocument, getResumeDocument } from './privateDocuments';
import { getRecruitingDocumentManifest } from './manifest';
import { getPortfolioDocument } from './portfolio';
import { validateRecruitingDocumentData } from './validation';

for (const locale of ['ko', 'en'] as const) {
	validateRecruitingDocumentData({
		manifest: getRecruitingDocumentManifest(locale),
		portfolio: getPortfolioDocument(locale),
		resume: getResumeDocument(locale),
		careerBrief: getCareerBriefDocument(locale),
	});
}

export {
	recruitingDocumentManifest,
	getRecruitingDocumentManifest,
} from './manifest';
export { portfolioDocument, getPortfolioDocument } from './portfolio';
export {
	careerBriefDocument,
	resumeDocument,
	getCareerBriefDocument,
	getResumeDocument,
} from './privateDocuments';
export { validateRecruitingDocumentData } from './validation';
