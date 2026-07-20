'use client';

import { useState } from 'react';

const ASSET_TIMEOUT_MS = 12_000;

const waitWithTimeout = <T,>(promise: Promise<T>, message: string) =>
	new Promise<T>((resolve, reject) => {
		const timeoutId = window.setTimeout(
			() => reject(new Error(message)),
			ASSET_TIMEOUT_MS,
		);

		promise.then(
			(value) => {
				window.clearTimeout(timeoutId);
				resolve(value);
			},
			(error: unknown) => {
				window.clearTimeout(timeoutId);
				reject(error);
			},
		);
	});

const waitForImage = async (image: HTMLImageElement) => {
	if (!image.complete) {
		await new Promise<void>((resolve, reject) => {
			const cleanup = () => {
				window.clearTimeout(timeoutId);
				image.removeEventListener('load', handleLoad);
				image.removeEventListener('error', handleError);
			};
			const handleLoad = () => {
				cleanup();
				resolve();
			};
			const handleError = () => {
				cleanup();
				reject(new Error(`Document image failed to load: ${image.currentSrc}`));
			};
			const timeoutId = window.setTimeout(() => {
				cleanup();
				reject(new Error('Document image loading timed out.'));
			}, ASSET_TIMEOUT_MS);

			image.addEventListener('load', handleLoad, { once: true });
			image.addEventListener('error', handleError, { once: true });
		});
	}

	if (image.decode) {
		await waitWithTimeout(image.decode(), 'Document image decoding timed out.');
	}

	if (!image.complete || image.naturalWidth === 0) {
		throw new Error(`Document image is not ready: ${image.currentSrc}`);
	}
};

const waitForDocumentAssets = async () => {
	const images = Array.from(
		document.querySelectorAll<HTMLImageElement>('.document-stage img'),
	);

	await Promise.all([
		waitWithTimeout(document.fonts.ready, 'Document font loading timed out.'),
		Promise.all(images.map((image) => waitForImage(image))),
	]);

	await new Promise<void>((resolve) => {
		requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
	});
};

export const PrintButton = () => {
	const [status, setStatus] = useState<'idle' | 'preparing' | 'error'>('idle');

	const handlePrint = async () => {
		setStatus('preparing');

		try {
			await waitForDocumentAssets();
			setStatus('idle');
			window.print();
		} catch (error) {
			console.error(error);
			setStatus('error');
		}
	};

	const label =
		status === 'preparing'
			? '출력 준비 중…'
			: status === 'error'
				? '새로고침 후 다시 시도'
				: 'PDF로 저장';
	const statusMessage =
		status === 'preparing'
			? '문서 이미지와 글꼴을 확인하고 있습니다.'
			: status === 'error'
				? '문서 자산을 불러오지 못했습니다. 새로고침한 뒤 다시 시도해 주세요.'
				: '';

	return (
		<>
			<button
				type="button"
				onClick={handlePrint}
				disabled={status === 'preparing'}
				className="document-toolbar-button disabled:cursor-wait disabled:opacity-60"
				aria-busy={status === 'preparing'}
				aria-describedby={status === 'idle' ? undefined : 'document-print-status'}
				title={status === 'error' ? statusMessage : undefined}
			>
				{label}
			</button>
			<span
				id="document-print-status"
				role="status"
				aria-live="polite"
				className="sr-only"
			>
				{statusMessage}
			</span>
		</>
	);
};
