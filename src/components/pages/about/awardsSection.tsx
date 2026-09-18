'use client';

import ScrollReveal from '@/components/common/scrollReveal';
import React from 'react';
import WebViewModal from '@/components/common/webViewModal';
import { useLocale } from '@/contexts/localeContext';
import { Project } from '@/types/project';
import ProjectDetailEntry from '@/components/common/projectDetailEntry';

const AwardsSection: React.FC = () => {
	const {
		dictionary,
		data: { awards, projectDetails },
	} = useLocale();
	const [modalIsOpen, setModalIsOpen] = React.useState(false);
	const [selectedLink, setSelectedLink] = React.useState('');
	const [selectedLinkText, setSelectedLinkText] = React.useState('');
	const [selectedProject, setSelectedProject] = React.useState<Project | null>(
		null,
	);

	const openModal = (link: string, text: string) => {
		setSelectedLink(link);
		setSelectedLinkText(text);
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const openProjectDetail = (projectId: string) => {
		const detailProject = projectDetails.find(
			(project) => project.id === projectId,
		);
		if (detailProject) {
			setSelectedProject(detailProject);
		}
	};

	const closeProjectDetail = () => {
		setSelectedProject(null);
	};

	return (
		<ScrollReveal className="w-full max-w-[700px] flex flex-col items-start gap-6 md:gap-8">
			<h2 className="about-section-title font-bold tracking-tight text-foreground">
				{dictionary.about.awards}
			</h2>

			<div className="w-full flex flex-col gap-6">
				{awards.map((award, index) => (
					<div key={index} className="about-entry">
						{/* 수상 정보 */}
						<div className="flex flex-col items-start gap-0.5">
							<p className="font-medium text-lg md:text-xl leading-6 text-left text-foreground break-keep">
								{award.title}
							</p>
							<p className="font-medium text-sm leading-6 text-left text-muted-foreground">
								{award.period}
							</p>
						</div>

						{/* 수상 세부사항 */}
						<div className="min-w-0 flex flex-col items-start gap-1">
							<p className="text-base md:text-lg leading-6 tracking-tight text-left text-foreground break-keep">
								<strong>{award.award}</strong>
							</p>
							<div className="flex flex-col gap-1">
								{award.details.map((detail, detailIndex) => (
									<div
										key={detailIndex}
										className="grid grid-cols-[auto,1fr] items-start gap-3"
									>
										<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
										{typeof detail !== 'string' ? (
											'projectId' in detail ? (
												<button
													type="button"
													onClick={() => openProjectDetail(detail.projectId)}
													className="text-sm md:text-base leading-6 text-left text-foreground hover:text-accent transition-colors duration-300 underline decoration-foreground/45 underline-offset-4 hover:decoration-accent break-keep"
												>
													{detail.text}
												</button>
											) : (
												<button
													type="button"
													onClick={() => openModal(detail.link, detail.text)}
													className="text-sm md:text-base leading-6 text-left text-foreground hover:text-accent transition-colors duration-300 underline decoration-foreground/45 underline-offset-4 hover:decoration-accent break-keep"
												>
													{detail.text}
												</button>
											)
										) : (
											<span className="text-sm md:text-base leading-6 text-left text-foreground">
												{detail}
											</span>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
			<WebViewModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				selectedLink={selectedLink}
				linkText={selectedLinkText}
			/>
			{selectedProject && (
				<ProjectDetailEntry
					key={selectedProject.id}
					project={selectedProject}
					onClose={closeProjectDetail}
				/>
			)}
		</ScrollReveal>
	);
};

export default AwardsSection;
