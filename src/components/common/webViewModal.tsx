'use client';

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { X, ExternalLink, Globe, Lock } from 'lucide-react';
import { useLocale } from '@/contexts/localeContext';
import { WebViewModalProps } from '@/types/modal';
import LoadImage from '@/components/common/loadImage';

const WebViewModal: React.FC<WebViewModalProps> = ({
	isOpen,
	onRequestClose,
	selectedLink,
	linkText,
}) => {
	const { dictionary } = useLocale();
	const [isLoading, setIsLoading] = useState(true);
	const isImageLink = selectedLink.match(/\.(jpg|jpeg|png|gif|svg)$/i);
	const isExternalLink = selectedLink.startsWith('http');
	const [showEmbedded, setShowEmbedded] = useState(false);

	useEffect(() => {
		const mainElement = document.querySelector('main');
		if (mainElement) {
			Modal.setAppElement(mainElement);
		}
	}, []);

	// 외부 링크일 경우 로딩 상태 즉시 해제
	useEffect(() => {
		if (isExternalLink) {
			setIsLoading(false);
		}
	}, [isExternalLink]);

	const modalStyles = {
		overlay: {
			backgroundColor: 'rgba(0, 0, 0, 0.62)',
			zIndex: 50,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '1rem',
		},
		content: {
			position: 'relative' as const,
			top: 'auto',
			left: 'auto',
			right: 'auto',
			bottom: 'auto',
			maxWidth: '1000px', // 더 넓게 조정
			width: '100%',
			maxHeight: '85vh',
			margin: '0 auto',
			padding: 0,
			border: '1px solid hsl(var(--border) / 0.32)',
			borderRadius: '0.5rem',
			background: 'hsl(var(--background))',
			overflow: 'hidden',
			boxShadow: '0 24px 70px hsl(var(--blacks) / 0.22)',
		},
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			style={modalStyles}
			shouldCloseOnOverlayClick={true}
			bodyOpenClassName="ReactModal__Body--open"
			contentLabel={`${linkText} ${dictionary.projectDetail.detailView}`}
		>
			{/* 브라우저 스타일 헤더 */}
			<div className="flex flex-col border-b border-border">
				{/* 상단 컨트롤 */}
				<div className="flex items-center justify-between px-4 py-3 bg-background">
					<div className="flex items-center gap-2">
						<button
							onClick={onRequestClose}
							className="p-2 hover:bg-foreground/30 rounded-full transition-colors duration-300"
							aria-label={dictionary.projectDetail.close}
						>
							<X className="w-5 h-5 text-foreground" />
						</button>
					</div>
					{isExternalLink && (
						<a
							href={selectedLink}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-4 py-1.5 bg-secondary/35 hover:bg-secondary/65 text-foreground rounded-full transition-colors duration-200"
						>
							<ExternalLink className="w-4 h-4" />
							<span className="text-sm font-medium">
								{dictionary.webView.openNewTab}
							</span>
						</a>
					)}
				</div>

				{/* URL/제목 바 */}
				<div className="flex items-center gap-3 px-4 py-3 bg-background/72 border-t border-border">
					{selectedLink.startsWith('https') ? (
						<Lock className="w-4 h-4 text-foreground" />
					) : (
						<Globe className="w-4 h-4 text-muted-foreground" />
					)}
					<div className="flex-1 truncate">
						<p className="text-sm font-medium text-foreground">{linkText}</p>
						{isExternalLink && (
							<p className="text-xs text-muted-foreground truncate">
								{new URL(selectedLink).hostname}
							</p>
						)}
					</div>
				</div>
			</div>

			{/* 컨텐츠 영역 */}
			<div className="relative overflow-auto h-[calc(85vh-8rem)] bg-secondary/10">
				{isImageLink ? (
					<div className="flex items-center justify-center p-8">
						<LoadImage
							src={selectedLink}
							alt={linkText}
							maxWidth={900}
							maxHeight={600}
							className="rounded-lg shadow-lg"
							onLoad={() => setIsLoading(false)}
						/>
					</div>
				) : isExternalLink && !showEmbedded ? (
					<div className="flex flex-col items-center justify-center p-12 space-y-6">
						<Globe className="w-16 h-16 text-muted-foreground" />
						<div className="text-center space-y-2 max-w-md">
							<h3 className="text-xl font-bold text-foreground">
								{dictionary.webView.externalTitle}
							</h3>
							<p className="text-sm text-muted-foreground">
								{dictionary.webView.externalDescription(new URL(selectedLink).hostname)}
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							<a
								href={selectedLink}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg transition-colors duration-200 font-medium"
							>
								<ExternalLink className="w-5 h-5" />
								<span>{dictionary.webView.openNewTab}</span>
							</a>
							<button
								onClick={() => setShowEmbedded(true)}
								className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors duration-200 font-medium"
							>
								<Globe className="w-5 h-5" />
								<span>{dictionary.webView.viewInWebView}</span>
							</button>
						</div>
					</div>
				) : (
					<iframe
						src={selectedLink}
						className="w-full h-full min-h-[500px]"
						onLoad={() => setIsLoading(false)}
						title={linkText}
					/>
				)}

				{/* 로딩 스피너 */}
				{isLoading && !isExternalLink && (
					<div className="absolute inset-0 flex items-center justify-center bg-background/90">
						<div className="animate-spin rounded-full h-12 w-12 border-4 border-foreground/70 border-t-transparent" />
					</div>
				)}
			</div>
		</Modal>
	);
};

export default WebViewModal;
