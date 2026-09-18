'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { X } from 'lucide-react';
import type { ProjectDetailProps } from '@/types/modal';
import { useLocale } from '@/contexts/localeContext';
import MediaModal from './mediaModal';
import ImageSpinner from './ImageSpinner';

// The modal stays mounted while its content chunk loads or retries, preserving focus.
export default function ProjectDetailEntry({
	project,
	onClose,
}: ProjectDetailProps) {
	const { locale, dictionary } = useLocale();
	const [open, setOpen] = useState(true);
	const [Detail, setDetail] = useState<ComponentType<ProjectDetailProps> | null>(
		null,
	);
	const [failed, setFailed] = useState(false);
	const [showLoading, setShowLoading] = useState(false);
	const [attempt, setAttempt] = useState(0);
	useEffect(() => {
		let active = true;
		setFailed(false);
		setShowLoading(false);
		const timer = setTimeout(() => {
			if (active) setShowLoading(true);
		}, 300);
		void import('./projectDetail')
			.then((module) => {
				if (active) {
					clearTimeout(timer);
					setDetail(() => module.default);
				}
			})
			.catch(() => {
				if (active) {
					clearTimeout(timer);
					setFailed(true);
				}
			});
		return () => {
			active = false;
			clearTimeout(timer);
		};
	}, [attempt]);
	return (
		<MediaModal
			isOpen={open}
			label={project.title}
			onClose={() => setOpen(false)}
			onAfterClose={onClose}
		>
			{Detail ? (
				<Detail project={project} onClose={() => setOpen(false)} />
			) : (
				<div className="relative flex min-h-72 flex-col items-center justify-center gap-4 p-8">
					<button
						type="button"
						className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full"
						aria-label={dictionary.projectDetail.close}
						onClick={() => setOpen(false)}
					>
						<X size={20} aria-hidden="true" />
					</button>
					{failed ? (
						<>
							<p role="status">
								{locale === 'ko'
									? '프로젝트를 불러오지 못했습니다.'
									: 'Could not load this project.'}
							</p>
							<button
								type="button"
								className="min-h-11 px-4 underline underline-offset-4"
								onClick={() => setAttempt((value) => value + 1)}
							>
								{locale === 'ko' ? '다시 시도' : 'Retry'}
							</button>
						</>
					) : (
						<div role="status">
							{showLoading && <ImageSpinner />}
							<span className="sr-only">
								{locale === 'ko' ? '프로젝트 불러오는 중' : 'Loading project'}
							</span>
						</div>
					)}
				</div>
			)}
		</MediaModal>
	);
}
