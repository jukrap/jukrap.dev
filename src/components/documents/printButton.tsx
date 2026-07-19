'use client';

export const PrintButton = () => (
	<button
		type="button"
		onClick={() => window.print()}
		className="document-toolbar-button"
	>
		PDF로 저장
	</button>
);
