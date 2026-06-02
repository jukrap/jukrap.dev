import React from 'react';
import { Metadata } from 'next';
import ActivitySection from '@/components/pages/about/activitySection';
import AwardsSection from '@/components/pages/about/awardsSection';
import IntroSection from '@/components/pages/about/introSection';
import SideProjectsSection from '@/components/pages/about/sideProjectsSection';
import SkillsSection from '@/components/pages/about/skillsSection';
import { dictionaries } from '@/data/i18n/dictionaries';
import { isLocale } from '@/lib/locale';

interface LocalePageProps {
	params: Promise<{
		locale: string;
	}>;
}

export async function generateMetadata({
	params,
}: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	return isLocale(locale) ? dictionaries[locale].metadata.about : {};
}

const About: React.FC = () => {
	return (
		<div className="flex flex-col items-center px-4 sm:px-6 lg:px-20 py-8 sm:py-12 lg:py-20 w-full h-full gap-12 sm:gap-16 lg:gap-20">
			<IntroSection />
			<SkillsSection />
			<ActivitySection />
			<AwardsSection />
			<SideProjectsSection />
		</div>
	);
};

export default About;
