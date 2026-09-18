'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Modal from 'react-modal';
import './media.css';
import { registerModal, isTopModal } from './mediaModalState';

interface MediaModalProps {
	children: ReactNode;
	label: string;
	isOpen?: boolean;
	onClose: () => void;
	onAfterClose?: () => void;
	variant?: 'detail' | 'viewer';
}
export default function MediaModal({
	children,
	label,
	isOpen = true,
	onClose,
	onAfterClose,
	variant = 'detail',
}: MediaModalProps) {
	const release = useRef<(() => void) | undefined>(undefined);
	const content = useRef<HTMLDivElement | null>(null);
	const opener = useRef<HTMLElement | null>(null);
	useEffect(() => {
		opener.current =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;
		return () => {
			release.current?.();
			release.current = undefined;
		};
	}, []);
	return (
		<Modal
			isOpen={isOpen}
			portalClassName="site-shell media-modal-portal"
			overlayClassName={`media-modal-overlay media-modal-overlay-${variant}`}
			className={`media-modal-content media-modal-content-${variant}`}
			contentLabel={label}
			aria={{ modal: true }}
			ariaHideApp={false}
			bodyOpenClassName={null}
			shouldFocusAfterRender={false}
			shouldReturnFocusAfterClose={false}
			closeTimeoutMS={120}
			contentRef={(element) => {
				content.current = element;
			}}
			onAfterOpen={() => {
				if (content.current && !release.current)
					release.current = registerModal({
						content: content.current,
						opener: opener.current,
					});
			}}
			onRequestClose={() => {
				if (isTopModal(content.current)) onClose();
			}}
			onAfterClose={() => {
				release.current?.();
				release.current = undefined;
				onAfterClose?.();
			}}
		>
			{children}
		</Modal>
	);
}
