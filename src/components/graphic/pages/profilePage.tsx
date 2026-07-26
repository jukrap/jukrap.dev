'use client';

import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/contexts/localeContext';

const boundaries = [
	'React / TypeScript',
	'WebView / Android',
	'Legacy Web',
	'Testing / Delivery',
];

export function ProfilePage() {
	const { locale, dictionary, data } = useLocale();
	const isKo = locale === 'ko';

	return (
		<section className="graphic-profile-page">
			<div className="graphic-profile-intro">
				<div>
					<h1>PROFILE</h1>
					<p className="graphic-job-title">Web &amp; Mobile Frontend Engineer</p>
					<p className="graphic-profile-statement">
						{isKo
							? '사용자가 실제로 끝까지 사용할 수 있는 기능을 만들고자 합니다.'
							: 'I build features that people can use through the final step.'}
					</p>
				</div>
				<section>
					<h2>WORKING BOUNDARIES</h2>
					<ul>
						{boundaries.map((boundary) => (
							<li key={boundary}>{boundary}</li>
						))}
					</ul>
				</section>
			</div>
			<div className="graphic-profile-rows">
				<section>
					<h2>CAREER</h2>
					<div>
						<strong>{dictionary.about.careerSummary.company}</strong>
						<span>{dictionary.about.careerSummary.role}</span>
						<time>{dictionary.about.careerSummary.period}</time>
					</div>
				</section>
				<section>
					<h2>SKILLS</h2>
					<div className="graphic-skill-list">
						{data.skills.map((skill) => (
							<div key={skill.category}>
								<strong>{skill.category}</strong>
								<span>{skill.items}</span>
							</div>
						))}
					</div>
				</section>
				<section>
					<h2>CONTACT</h2>
					<div className="graphic-profile-links">
						{data.aboutLinks.map((link) => (
							<a
								key={link.url}
								href={link.url}
								target={link.isExternal ? '_blank' : undefined}
								rel={link.isExternal ? 'noreferrer' : undefined}
							>
								{link.text}
								<ArrowRight aria-hidden />
							</a>
						))}
					</div>
				</section>
			</div>
		</section>
	);
}
