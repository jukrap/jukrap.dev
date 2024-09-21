import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProjectDetailType, LinkType } from './types';
import { useIcon } from '@/hook/useIcon';
import ImageViewer from '@/components/imageViewer';
import InfiniteCarousel from '@/components/infiniteCarousel';

interface ProjectDetailProps {
	project: ProjectDetailType;
	onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
	const { getIcon } = useIcon();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsVisible(false);
			setTimeout(onClose, 300);
		}
	};

	const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setIsVisible(false);
		setTimeout(onClose, 300);
	};

	const handleImageClick = (index: number) => {
		setCurrentImageIndex(index);
		setIsViewerOpen(true);
	};

	const handleViewerClose = () => {
		setIsViewerOpen(false);
	};

	const handleIndexChange = (newIndex: number) => {
		setCurrentImageIndex(newIndex);
	};

	useEffect(() => {
		setIsVisible(true);
		const scrollBarWidth =
			window.innerWidth - document.documentElement.clientWidth;
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = `${scrollBarWidth}px`;
		return () => {
			document.body.style.overflow = 'unset';
			document.body.style.paddingRight = '0';
		};
	}, []);

	const renderSection = (title: string, content: React.ReactNode) => (
		<div className="mb-8 p-6 bg-secondary rounded-lg shadow-md">
			<h3 className="font-bold text-2xl text-primary mb-4 pb-2 border-b border-primary">
				{title}
			</h3>
			{content}
		</div>
	);

	const renderList = (items: { title: string; details: string[] }[]) => (
		<ul className="space-y-4">
			{items.map((item, index) => (
				<li key={index} className="bg-background p-4 rounded-md">
					<h4 className="font-semibold text-lg mb-2">{item.title}</h4>
					<ul className="list-disc pl-5 space-y-1">
						{item.details.map((detail, detailIndex) => (
							<li key={detailIndex} className="text-sm">
								{detail}
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);

	const backgroundStyle = project.projectData.background?.image
		? {
				backgroundImage: `url(${project.projectData.background.image})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}
		: project.projectData.background?.gradientStart
			? {
					background: `linear-gradient(to bottom, ${project.projectData.background.gradientStart}, ${project.projectData.background.gradientStart}00)`,
				}
			: {};

	return (
		<div
			className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden transition-opacity duration-300 ${
				isVisible ? 'opacity-100' : 'opacity-0'
			}`}
			onClick={handleBackgroundClick}
		>
			<div
				className={`relative bg-background w-[670px] rounded-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-hide transition-transform duration-300 ${
					isVisible ? 'scale-100' : 'scale-95'
				}`}
				style={{ WebkitOverflowScrolling: 'touch' }}
			>
				<div
					className="relative h-[300px] overflow-hidden rounded-t-3xl"
					style={backgroundStyle}
				>
					{project.projectData.background?.image && (
						<div
							className="absolute inset-0 filter blur-sm"
							style={backgroundStyle}
						></div>
					)}
					<div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/75 to-background z-10"></div>
					<div className="relative z-20 h-full flex flex-col justify-end py-12 px-10">
						<div className="flex flex-col items-center gap-3">
							<h1 className="font-extrabold text-4xl tracking-wide leading-10 text-foreground">
								{project.title}
							</h1>
							<h2 className="font-medium text-xl leading-6 text-foreground">
								{project.subtitle}
							</h2>
							<p className="font-light text-lg leading-6 text-foreground">
								{project.duration}
							</p>
						</div>
						<div className="flex gap-8 mt-6 justify-center">
							{project.links
								.filter((link) => link.visible)
								.map((link: LinkType, index: number) => (
									<a
										key={index}
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 transition-transform duration-300 hover:scale-110 no-select group"
									>
										<Image
											src={getIcon(link.type)}
											alt={link.type}
											width={28}
											height={28}
											className="transition-filter duration-300 group-hover:brightness-125"
										/>
										<span className="text-lg text-foreground group-hover:text-accent transition-colors duration-300">
											{link.type === 'appleStore'
												? 'A.Store'
												: link.type === 'googleStore'
													? 'G.Store'
													: link.type.charAt(0).toUpperCase() + link.type.slice(1)}
										</span>
									</a>
								))}
						</div>
					</div>
				</div>

				<div className="py-12 px-8">
					{renderSection(
						'프로젝트 개요',
						<>
							<p className="mb-4">{project.overview}</p>
							<div className="flex flex-wrap gap-2">
								{project.techStack.map((tech, index) => (
									<span
										key={index}
										className="bg-primary text-background px-2 py-1 rounded-full text-sm"
									>
										{tech}
									</span>
								))}
							</div>
						</>,
					)}

					{renderSection(
						'프로젝트 정보',
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-background p-4 rounded-md">
								<h4 className="font-semibold text-lg mb-2">프로젝트 담당</h4>
								<p className="text-sm">{project.role.join(', ')}</p>
							</div>
							<div className="bg-background p-4 rounded-md">
								<h4 className="font-semibold text-lg mb-2">프로젝트 인원</h4>
								<p className="text-sm">{project.teamSize}명</p>
							</div>
						</div>,
					)}

					{renderSection('프로젝트 업무', renderList(project.tasks))}

					{project.troubleshooting &&
						renderSection('트러블슈팅', renderList(project.troubleshooting))}

					{project.performanceImprovements &&
						renderSection('성능 개선', renderList(project.performanceImprovements))}

					{project.specialImplementations &&
						renderSection(
							'특별 사항',
							renderList(project.specialImplementations),
						)}

					{renderSection(
						'프로젝트 자료',
						<>
							<InfiniteCarousel
								images={project.projectData.images}
								currentIndex={currentImageIndex}
								onImageClick={handleImageClick}
								onIndexChange={handleIndexChange}
								isViewerOpen={isViewerOpen}
							/>
							<div className="flex flex-wrap gap-4 mt-6 justify-center">
								{project.projectData.subLinks
									.filter((link) => link.visible)
									.map((link, index) => (
										<a
											key={index}
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 px-4 py-2 bg-primary text-background rounded-full transition-transform duration-300 hover:scale-105 no-select"
										>
											<Image
												src={getIcon(link.type)}
												alt={link.type}
												width={24}
												height={24}
												className="transition-filter duration-300"
											/>
											<span className="text-sm font-medium">
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
						</>,
					)}

					<div className="flex justify-center mt-8">
						<button
							onClick={handleCloseClick}
							className="px-8 py-2 font-bold text-xl leading-5 text-center text-background bg-foreground rounded-lg hover:bg-accent transition-colors duration-300 no-select cursor-pointer"
						>
							닫기
						</button>
					</div>
				</div>
			</div>

			{isViewerOpen && (
				<ImageViewer
					images={project.projectData.images}
					currentIndex={currentImageIndex}
					onClose={handleViewerClose}
					onIndexChange={handleIndexChange}
				/>
			)}
		</div>
	);
};

export default ProjectDetail;
