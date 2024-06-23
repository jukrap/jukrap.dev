import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProjectDetailType, LinkType } from './types';
import { useIcon } from '@/hook/useIcon';
import ImageViewer from '@/components/ImageViewer';
import InfiniteCarousel from '@/components/InfiniteCarousel';

interface ProjectDetailProps {
	project: ProjectDetailType;
	onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
	const { getIcon } = useIcon();
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
		null,
	);

	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleImageClick = (index: number) => {
		setSelectedImageIndex(index);
	};

	useEffect(() => {
		const scrollBarWidth =
			window.innerWidth - document.documentElement.clientWidth;
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = `${scrollBarWidth}px`;

		return () => {
			document.body.style.overflow = 'unset';
			document.body.style.paddingRight = '0';
		};
	}, []);

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden"
			onClick={handleBackgroundClick}
		>
			<div
				className="bg-background w-[670px] rounded-3xl py-12 px-10 flex flex-col items-center gap-12 max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-hide"
				style={{ WebkitOverflowScrolling: 'touch' }}
			>
				<div className="flex flex-col items-center gap-3">
					<h1 className="font-extrabold text-4xl tracking-wide leading-10 text-foreground">
						{project.title}
					</h1>
					<h2 className="font-medium text-xl leading-6 text-foreground">
						{project.subtitle}
					</h2>
					<p className="font-light text-lg leading-6 text-muted-foreground">
						{project.duration}
					</p>
				</div>

				<div className="flex gap-8">
					{project.links
						.filter((link) => link.visible)
						.map((link: LinkType, index: number) => (
							<a
								key={index}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2"
							>
								<Image
									src={getIcon(link.type)}
									alt={link.type}
									width={28}
									height={28}
								/>
								<span className="font-light text-lg text-foreground">
									{link.type === 'appleStore'
										? 'A.Store'
										: link.type === 'googleStore'
											? 'G.Store'
											: link.type.charAt(0).toUpperCase() + link.type.slice(1)}
								</span>
							</a>
						))}
				</div>

				<div className="w-full flex flex-col gap-8">
					<div className="flex flex-col gap-3 break-words">
						<h3 className="font-bold text-xl text-foreground">프로젝트 개요</h3>
						<p className="font-medium text-base leading-9 text-foreground">
							{project.overview}
						</p>
					</div>

					<div className="flex flex-col gap-3 break-words">
						<h3 className="font-bold text-xl text-foreground">기술 스택</h3>
						<p className="font-medium text-base leading-9 text-foreground">
							{project.techStack.join(' • ')}
						</p>
					</div>

					<div className="flex gap-8 w-full break-words">
						<div className="flex-1 flex flex-col gap-3 min-w-0">
							<h3 className="font-bold text-xl text-foreground">프로젝트 담당</h3>
							<p className="font-medium text-base leading-7 text-foreground overflow-wrap-anywhere">
								{project.role.join(', ')}
							</p>
						</div>
						<div className="flex-1 flex flex-col gap-3 min-w-0">
							<h3 className="font-bold text-xl text-foreground">프로젝트 인원</h3>
							<p className="font-medium text-base leading-7 text-foreground">
								{project.teamSize}인
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-3 break-words">
						<h3 className="font-bold text-xl text-foreground">프로젝트 기능</h3>
						{project.functions.map((func, index) => (
							<div key={index}>
								<p className="font-bold text-base leading-9 text-foreground">
									{index + 1}. {func.title}
								</p>
								<ul className="list-disc pl-5">
									{func.details.map((detail, detailIndex) => (
										<li
											key={detailIndex}
											className="font-medium text-base leading-9 text-foreground"
										>
											{detail}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					<div className="flex flex-col gap-3 break-words">
						<h3 className="font-bold text-xl text-foreground">프로젝트 업무</h3>
						{project.tasks.map((task, index) => (
							<div key={index}>
								<p className="font-bold text-base leading-9 text-foreground">
									{index + 1}. {task.title}
								</p>
								<ul className="list-disc pl-5">
									{task.details.map((detail, detailIndex) => (
										<li
											key={detailIndex}
											className="font-medium text-base leading-9 text-foreground"
										>
											{detail}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					<div className="flex flex-col gap-3 break-words">
						<h3 className="font-bold text-xl text-foreground">프로젝트 소감</h3>
						{project.impression.map((impression, index) => (
							<div key={index}>
								<p className="font-bold text-base leading-9 text-foreground">
									{impression.title}
								</p>
								<ul className="list-disc pl-5">
									{impression.details.map((detail, detailIndex) => (
										<li
											key={detailIndex}
											className="font-medium text-base leading-9 text-foreground"
										>
											{detail}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-3 break-words w-full">
					<h3 className="font-bold text-xl text-foreground">프로젝트 자료</h3>
					<InfiniteCarousel images={project.projectData.images} />
				</div>

				<div className="flex gap-8">
					{project.projectData.subLinks
						.filter((link) => link.visible)
						.map((link, index) => (
							<a
								key={index}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2"
							>
								<Image
									src={getIcon(link.type)}
									alt={link.type}
									width={32}
									height={32}
								/>
								<span className="font-light text-lg text-foreground">
									{link.type === 'video'
										? 'Video'
										: link.type === 'ppt'
											? 'PPT'
											: link.type === 'doc'
												? 'Doc'
												: 'Other'}
								</span>
							</a>
						))}
				</div>
				<button
					onClick={onClose}
					className="relative flex items-center gap-2 px-4 my-3 py-2 font-bold text-xl leading-5 text-center text-background bg-foreground rounded-lg hover:bg-accent transition-colors duration-300"
				>
					닫기
				</button>
			</div>
			{selectedImageIndex !== null && (
				<ImageViewer
					images={project.projectData.images}
					currentIndex={selectedImageIndex}
					onClose={() => setSelectedImageIndex(null)}
					onIndexChange={setSelectedImageIndex}
				/>
			)}
		</div>
	);
};

export default ProjectDetail;