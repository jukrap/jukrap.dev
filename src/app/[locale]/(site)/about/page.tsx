import React from 'react';
import { Metadata } from 'next';
import ActivitySection from '@/components/pages/about/activitySection';
import AwardsSection from '@/components/pages/about/awardsSection';
import CareerSection from '@/components/pages/about/careerSection';
import IntroSection from '@/components/pages/about/introSection';
import SideProjectsSection from '@/components/pages/about/sideProjectsSection';
import SkillsSection from '@/components/pages/about/skillsSection';
import WorkSummarySection from '@/components/pages/about/workSummarySection';
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
		<div className="flex h-full w-full flex-col items-center gap-12 px-4 py-8 sm:gap-16 sm:px-6 sm:py-12 lg:gap-20 lg:px-20 lg:py-20">
			<IntroSection />
			<SkillsSection />
			<CareerSection />
			<ActivitySection />
			<AwardsSection />
			<WorkSummarySection />
			<SideProjectsSection />
		</div>
	);
};

export default About;
