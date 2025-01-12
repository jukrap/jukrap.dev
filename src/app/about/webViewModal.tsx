// src/app/about/webViewModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { X } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import LoadingImage from '@/components/LoadingImage';

interface WebViewModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	selectedLink: string;
	linkText: string;
}

const WebViewModal: React.FC<WebViewModalProps> = ({
	isOpen,
	onRequestClose,
	selectedLink,
	linkText,
}) => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const [isLoading, setIsLoading] = useState(true);
	const isImageLink = selectedLink.match(/\.(jpg|jpeg|png|gif|svg)$/i);

	// 컴포넌트가 마운트될 때 Modal의 앱 엘리먼트 설정
	useEffect(() => {
		// main 엘리먼트를 찾아서 설정
		const mainElement = document.querySelector('main');
		if (mainElement) {
			Modal.setAppElement(mainElement);
		}
	}, []);

	const modalStyles = {
		overlay: {
			backgroundColor: 'rgba(0, 0, 0, 0.75)',
			zIndex: 50,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '2rem',
		},
		content: {
			position: 'relative' as const,
			top: 'auto',
			left: 'auto',
			right: 'auto',
			bottom: 'auto',
			maxWidth: '800px',
			width: '100%',
			maxHeight: '80vh',
			margin: '0 auto',
			padding: 0,
			border: 'none',
			borderRadius: '1rem',
			background: isDarkMode ? 'hsl(var(--background))' : 'hsl(var(--background))',
			overflow: 'hidden',
		},
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			style={modalStyles}
			shouldCloseOnOverlayClick={true}
			contentLabel={`${linkText} 보기`}
		>
			{/* 모달 헤더 */}
			<div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
				<h2 className="font-semibold text-lg text-foreground truncate pr-4">
					{linkText}
				</h2>
				<button
					onClick={onRequestClose}
					className="p-2 hover:bg-secondary rounded-full transition-colors duration-300"
					aria-label="닫기"
				>
					<X className="w-5 h-5 text-foreground" />
				</button>
			</div>

			{/* 모달 컨텐츠 */}
			<div className="relative overflow-auto h-[calc(80vh-4rem)]">
				{isImageLink ? (
					<div className="flex items-center justify-center p-6">
						<LoadingImage
							src={selectedLink}
							alt={linkText}
							maxWidth={700}
							maxHeight={500}
							className="rounded-lg"
							onLoad={() => setIsLoading(false)}
						/>
					</div>
				) : (
					<iframe
						src={selectedLink}
						className="w-full h-full min-h-[500px]"
						onLoad={() => setIsLoading(false)}
						title={linkText}
					/>
				)}

				{isLoading && (
					<div className="absolute inset-0 flex items-center justify-center bg-background">
						<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default WebViewModal;
