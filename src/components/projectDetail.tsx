import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectTask } from '@/app/projects/types';
import { useIcon } from '@/hook/useIcon';
import ImageViewer from './imageViewer';
import InfiniteCarousel from './infiniteCarousel';
import TechStackDetailIcons from './techStackDetailIcons';

interface ProjectDetailProps {
	project: Project;
	onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
	const { getIcon } = useIcon();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

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

	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsVisible(false);
			setTimeout(onClose, 300);
		}
	};

	const handleCloseClick = () => {
		setIsVisible(false);
		setTimeout(onClose, 300);
	};

	const handleImageClick = (index: number) => {
		setCurrentImageIndex(index);
		setIsViewerOpen(true);
	};

	const renderSection = (title: string, content: React.ReactNode) => (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="mb-8 p-6 bg-secondary/50 rounded-lg"
		>
			<h3 className="font-bold text-2xl text-foreground mb-4 pb-2 border-b border-border">
				{title}
			</h3>
			{content}
		</motion.div>
	);

	const renderList = (items: ProjectTask[]) => (
		<ul className="space-y-4">
			{items.map((item, index) => (
				<motion.li
					key={index}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1 }}
					className="bg-background/50 p-4 rounded-md border border-border/50"
				>
					<h4 className="font-semibold text-lg mb-2 text-foreground">
						{item.title}
					</h4>
					<ul className="list-disc pl-5 space-y-1">
						{item.details.map((detail, detailIndex) => (
							<li key={detailIndex} className="text-sm text-muted-foreground">
								{detail}
							</li>
						))}
					</ul>
				</motion.li>
			))}
		</ul>
	);

	const backgroundStyle = project.projectData.background?.image
		? {
				backgroundImage: `url(${project.projectData.background.image})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
			}
		: project.projectData.background?.gradientStart
			? {
					background: `linear-gradient(to bottom, ${project.projectData.background.gradientStart}, ${project.projectData.background.gradientStart}00)`,
				}
			: {};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
					onClick={handleBackgroundClick}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						className="relative bg-background w-[90%] max-w-[900px] rounded-xl 
              max-h-[90vh] overflow-hidden"
					>
						<div className="max-h-[90vh] overflow-y-auto scrollbar-hide">
							{/* 프로젝트 헤더 */}
							<div className="relative h-[300px] overflow-hidden rounded-t-xl">
								<div
									className="absolute inset-0 bg-center bg-cover"
									style={backgroundStyle}
								/>
								{project.projectData.background?.image && (
									<>
										<div
											className="absolute inset-0 filter blur-sm bg-center bg-cover"
											style={backgroundStyle}
										/>
										<div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/75 to-background" />
									</>
								)}

								<div className="relative h-full z-20 flex flex-col justify-end p-8">
									<div className="">
										<h2 className="text-4xl font-bold text-foreground pb-0.5">
											{project.title}
										</h2>
										<p className="text-xl font-light text-foreground/90 pb-4">
											{project.subtitle}
										</p>
										<p className="text-lg font-medium text-muted-foreground pb-6">
											{project.duration}
										</p>

										{/* 프로젝트 링크 */}
										<div className="flex flex-wrap gap-2 md:gap-4">
											{project.links
												.filter((link) => link.visible)
												.map((link, index) => (
													<a
														key={index}
														href={link.url}
														target="_blank"
														rel="noopener noreferrer"
														className="flex items-center gap-2 px-4 py-2 rounded-lg 
                              border border-accent bg-accent/10 text-accent
                              hover:bg-accent/30 transition-colors duration-300"
													>
														<Image
															src={getIcon(link.type)}
															alt={link.type}
															width={20}
															height={20}
														/>
														<span>
															{link.type === 'appleStore'
																? 'App Store'
																: link.type === 'googleStore'
																	? 'Play Store'
																	: link.type.charAt(0).toUpperCase() + link.type.slice(1)}
														</span>
													</a>
												))}
										</div>
									</div>
								</div>

								{/* 닫기 버튼 */}
								<button
									onClick={handleCloseClick}
									className="absolute top-8 right-8 p-2 rounded-full z-30
                    bg-background/60 hover:bg-background/95 backdrop-blur-sm
                    transition-colors duration-300"
									aria-label="Close modal"
								>
									<Image src={getIcon('close')} alt="Close" width={24} height={24} />
								</button>
							</div>

							{/* 프로젝트 컨텐츠 */}
							<div className="p-8 space-y-8">
								{/* 프로젝트 개요 */}
								{renderSection(
									'프로젝트 개요',
									<div className="space-y-4">
										<p className="text-foreground leading-relaxed">{project.overview}</p>
										<TechStackDetailIcons techStack={project.techStack} />
									</div>,
								)}

								{/* 프로젝트 정보 */}
								{renderSection(
									'프로젝트 정보',
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="p-4 bg-background rounded-lg border border-border/50">
											<h4 className="font-semibold text-lg mb-2 text-foreground">
												담당 역할
											</h4>
											<p className="text-muted-foreground">{project.role.join(', ')}</p>
										</div>
										<div className="p-4 bg-background rounded-lg border border-border/50">
											<h4 className="font-semibold text-lg mb-2 text-foreground">
												팀 규모
											</h4>
											<p className="text-muted-foreground">{project.teamSize}명</p>
										</div>
									</div>,
								)}

								{/* 주요 작업 */}
								{renderSection('주요 작업', renderList(project.tasks))}

								{/* 문제 해결 */}
								{project.troubleshooting &&
									renderSection('문제 해결', renderList(project.troubleshooting))}

								{/* 성능 개선 */}
								{project.performanceImprovements &&
									renderSection(
										'성능 개선',
										renderList(project.performanceImprovements),
									)}

								{/* 특별 구현 사항 */}
								{project.specialImplementations &&
									renderSection(
										'특별 구현 사항',
										renderList(project.specialImplementations),
									)}

								{/* 프로젝트 이미지 */}
								{project.projectData.images.length > 0 &&
									renderSection(
										'프로젝트 스크린샷',
										<>
											<InfiniteCarousel
												images={project.projectData.images}
												currentIndex={currentImageIndex}
												onImageClick={handleImageClick}
												onIndexChange={setCurrentImageIndex}
												isViewerOpen={isViewerOpen}
											/>
											{/* 부가 자료 링크 */}
											{project.projectData.subLinks.some((link) => link.visible) && (
												<div className="flex flex-wrap gap-4 mt-6 justify-center">
													{project.projectData.subLinks
														.filter((link) => link.visible)
														.map((link, index) => (
															<a
																key={index}
																href={link.url}
																target="_blank"
																rel="noopener noreferrer"
																className="flex items-center gap-2 px-4 py-2 rounded-lg 
                                bg-primary text-primary-foreground hover:bg-primary/50
                                transition-colors duration-300"
															>
																<Image
																	src={getIcon(link.type)}
																	alt={link.type}
																	width={20}
																	height={20}
																/>
																<span>
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
											)}
										</>,
									)}

								{/* 닫기 버튼 */}
								<div className="pt-4">
									<button
										onClick={handleCloseClick}
										className="w-full px-6 py-3 bg-primary hover:bg-primary/50 
                      text-primary-foreground font-semibold rounded-lg
                      transition-colors duration-300"
									>
										닫기
									</button>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}

			{/* 이미지 뷰어 */}
			{isViewerOpen && (
				<ImageViewer
					images={project.projectData.images}
					currentIndex={currentImageIndex}
					onClose={() => setIsViewerOpen(false)}
					onIndexChange={setCurrentImageIndex}
				/>
			)}
		</AnimatePresence>
	);
};

export default ProjectDetail;
