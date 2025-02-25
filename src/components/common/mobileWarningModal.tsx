import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MobileWarningModalProps } from '@/types/modal';
import { alerts } from '@/data/messages/alerts';

const MobileWarningModal: React.FC<MobileWarningModalProps> = ({
	isOpen,
	onClose,
}) => {
	const [dontShowAgain, setDontShowAgain] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			document.body.style.position = 'fixed';
			document.body.style.width = '100%';
		} else {
			document.body.style.overflow = '';
			document.body.style.position = '';
			document.body.style.width = '';
		}
		return () => {
			document.body.style.overflow = '';
			document.body.style.position = '';
			document.body.style.width = '';
		};
	}, [isOpen]);

	const handleClose = () => {
		if (dontShowAgain) {
			localStorage.setItem('mobileWarningDismissed', new Date().toISOString());
		}
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-background dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full mx-4">
				<div className="flex justify-center mb-6">
					<Image src="/icons/construction.svg" alt="공사중" width={80} height={80} />
				</div>
				<h2 className="text-2xl font-bold mb-4 text-center text-accent">
					{alerts.mobileWarning.title}
				</h2>
				<p className="mb-6 text-center text-foreground dark:text-gray-300">
					<span className="font-semibold text-accent">
						{alerts.mobileWarning.description}
					</span>
				</p>
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
					<label className="flex items-center cursor-pointer">
						<input
							type="checkbox"
							checked={dontShowAgain}
							onChange={(e) => setDontShowAgain(e.target.checked)}
							className="mr-2 form-checkbox h-5 w-5 text-accent"
						/>
						<span className="text-sm text-foreground dark:text-gray-300">
							1일 동안 보지 않기
						</span>
					</label>
					<button
						onClick={handleClose}
						className="px-6 py-2 bg-accent text-background rounded-2xl font-bold hover:bg-foreground transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
					>
						닫기
					</button>
				</div>
			</div>
		</div>
	);
};

export default MobileWarningModal;
