import { careerBriefDocument, resumeDocument } from './privateDocuments';
import { recruitingDocumentManifest } from './manifest';
import { portfolioDocument } from './portfolio';
import { validateRecruitingDocumentData } from './validation';

validateRecruitingDocumentData({
	manifest: recruitingDocumentManifest,
	portfolio: portfolioDocument,
	resume: resumeDocument,
	careerBrief: careerBriefDocument,
});

export { recruitingDocumentManifest } from './manifest';
export { portfolioDocument } from './portfolio';
export { careerBriefDocument, resumeDocument } from './privateDocuments';
export { validateRecruitingDocumentData } from './validation';
