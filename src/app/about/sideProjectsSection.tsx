'use client';
import React from 'react';
import Image from 'next/image';
import { useThemeStore } from '../../store/useThemeStore';
import { projectsData } from '@/data/projectsData';
import { LinkType } from './types';

const SideProjectsLink: React.FC<LinkType> = ({ type, url }) => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const iconMap = {
		appStore: {
			white: '/icons/whiteMode_appleStore.svg',
			black: '/icons/blackMode_appleStore.svg',
		},
		googlePlay: {
			white: '/icons/whiteMode_googlePlay.svg',
			black: '/icons/blackMode_googlePlay.svg',
		},
		github: {
			white: '/icons/whiteMode_github.svg',
			black: '/icons/blackMode_github.svg',
		},
		url: {
			white: '/icons/whiteMode_linkURL.svg',
			black: '/icons/blackMode_linkURL.svg',
		},
		detailView: {
			white: '/icons/whiteMode_detailView.svg',
			black: '/icons/blackMode_detailView.svg',
		},
	};

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="flex flex-row items-center justify-center"
		>
			<Image
				src={isDarkMode ? iconMap[type].black : iconMap[type].white}
				alt={`${type} Icon`}
				width={24}
				height={24}
			/>
		</a>
	);
};

const SideProjectsSection: React.FC = () => {
	return (
		<section className="w-[670px] flex flex-col items-start gap-8 h-fit">
			<h2 className="font-bold text-4xl leading-10 tracking-tight text-right text-foreground w-[153px] h-fit">
				S.Projects
			</h2>
			{projectsData.map((project, index) => (
				<div key={index} className="flex justify-between gap-12">
					<div className="w-[153px] flex flex-col items-end gap-2">
						<div className="flex flex-col items-end gap-2">
							<p className="font-medium text-xl leading-6 text-right text-foreground">
								{project.title}
							</p>
							<p className="font-medium text-sm leading-6 text-right text-muted-foreground">
								{project.duration}
							</p>
						</div>
						<div className="flex items-center gap-2">
							{project.links
								.filter((link) => link.visible)
								.map((link) => (
									<SideProjectsLink key={link.url} {...link} />
								))}
						</div>
					</div>
					<div className="w-[460px] flex flex-col items-start gap-2">
						<p className="text-lg font-bold leading-6 tracking-tight text-left text-foreground">
							{project.introduction}
						</p>
						<div className="flex flex-col gap-1">
							{project.description.map((item, index) => (
								<div
									key={index}
									className="grid grid-cols-[auto,1fr] items-start gap-4"
								>
									<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
									<span className="text-base leading-6 text-left text-foreground">
										{item}
									</span>
								</div>
							))}
						</div>
						<p className="font-light text-sm leading-6 tracking-tight text-left text-muted-foreground py-1">
							{project.techStack}
						</p>
					</div>
				</div>
			))}
		</section>
	);
};

export default SideProjectsSection;
