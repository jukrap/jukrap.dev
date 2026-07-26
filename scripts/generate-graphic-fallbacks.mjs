import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const fallbackDirectory = path.join(
	process.cwd(),
	'public',
	'images',
	'graphic-fallback',
);
await mkdir(fallbackDirectory, { recursive: true });

const themes = {
	dark: {
		background: '#0b0d0f',
		surface: '#15191c',
		muted: '#646d72',
		rule: '#343a3e',
		accent: '#5875ee',
	},
	light: {
		background: '#e8e9e4',
		surface: '#f5f5f1',
		muted: '#7b8384',
		rule: '#b8bdbb',
		accent: '#2f49b8',
	},
};

const frame = (theme, body) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <rect width="1600" height="1000" fill="${theme.background}"/>
  <g stroke="${theme.rule}" stroke-width="1" opacity=".72">
    ${Array.from({ length: 13 }, (_, index) => `<path d="M${index * 134} 0V1000"/>`).join('')}
    ${Array.from({ length: 9 }, (_, index) => `<path d="M0 ${index * 125}H1600"/>`).join('')}
  </g>
  ${body}
  <path d="M56 944H1544" stroke="${theme.rule}"/>
</svg>`;

const overview = (theme) => {
	const points = [];
	for (let z = 0; z < 3; z += 1) {
		for (let y = 0; y < 3; y += 1) {
			for (let x = 0; x < 3; x += 1) {
				points.push([520 + x * 230 + z * 78, 246 + y * 198 - z * 47]);
			}
		}
	}
	const lines = [];
	points.forEach((point, index) => {
		if (index % 3 !== 2)
			lines.push(
				`<path d="M${point[0]} ${point[1]}L${points[index + 1][0]} ${points[index + 1][1]}"/>`,
			);
		if (Math.floor(index / 3) % 3 !== 2)
			lines.push(
				`<path d="M${point[0]} ${point[1]}L${points[index + 3][0]} ${points[index + 3][1]}"/>`,
			);
		if (index < 18)
			lines.push(
				`<path d="M${point[0]} ${point[1]}L${points[index + 9][0]} ${points[index + 9][1]}"/>`,
			);
	});
	return frame(
		theme,
		`<g fill="none" stroke="${theme.muted}" stroke-width="2">${lines.join('')}</g><g fill="${theme.surface}" stroke="${theme.muted}" stroke-width="2">${points.map(([x, y]) => `<rect x="${x - 7}" y="${y - 7}" width="14" height="14"/>`).join('')}</g><path d="M520 246L750 246L828 199L1058 199L1136 152" fill="none" stroke="${theme.accent}" stroke-width="10"/>`,
	);
};

const work = (theme) =>
	frame(
		theme,
		`
  <g fill="${theme.surface}" stroke="${theme.muted}" stroke-width="2">
    <path d="M260 314L754 244L934 356L438 430Z"/>
    <path d="M650 532L1138 476L1346 612L848 674Z"/>
    <path d="M540 676L896 618L1032 734L670 790Z"/>
  </g>
  <path d="M370 484L1232 394" stroke="${theme.accent}" stroke-width="11"/>
  <path d="M882 394L946 744" stroke="${theme.accent}" stroke-width="11"/>
`,
	);

const projects = (theme) =>
	frame(
		theme,
		`
  <path d="M390 772L1220 710L1370 808L530 874Z" fill="${theme.surface}" stroke="${theme.muted}" stroke-width="2"/>
  <path d="M526 250L1082 196L1196 676L632 738Z" fill="${theme.surface}" stroke="${theme.muted}" stroke-width="3"/>
  <path d="M576 300L1034 260L1122 626L658 672Z" fill="${theme.background}" stroke="${theme.rule}" stroke-width="2"/>
  <path d="M610 560L1072 520" stroke="${theme.accent}" stroke-width="12"/>
  <path d="M632 362L1012 328M646 420L1040 386M662 478L1060 444" stroke="${theme.muted}" stroke-width="6" opacity=".74"/>
`,
	);

const scenes = { overview, work, projects };
for (const [sceneName, render] of Object.entries(scenes)) {
	for (const [themeName, theme] of Object.entries(themes)) {
		const svg = render(theme);
		await sharp(Buffer.from(svg))
			.avif({ quality: 62, effort: 8 })
			.toFile(path.join(fallbackDirectory, `${sceneName}-${themeName}.avif`));
	}
}

const projectSceneSources = {
	'ai-agent-playbook': 'images/ai-agent-playbook/npm-overview.png',
	'captain-donghae': 'images/captain-donghae/image1.png',
	itzip: 'images/itzip/image1.png',
	'jukrap-website': 'images/jukrap-website/image1.png',
	sharebby: 'images/sharebby/image1.png',
	'posture-teacher': 'images/posture-teacher/image1.png',
	chatterbox: 'images/chatterbox/image1.png',
	mytime: 'images/mytime/image1.png',
	'esd-hotdeal': 'images/esd-hotdeal/image1.png',
};
const sceneMediaDirectory = path.join(
	process.cwd(),
	'public',
	'images',
	'graphic-scene-media',
);
await mkdir(sceneMediaDirectory, { recursive: true });
for (const [slug, source] of Object.entries(projectSceneSources)) {
	for (const [variant, width] of [
		['desktop', 1600],
		['mobile', 1024],
	]) {
		await sharp(path.join(process.cwd(), 'public', source))
			.rotate()
			.resize({ width, height: width, fit: 'inside', withoutEnlargement: true })
			.avif({ quality: 56, effort: 8 })
			.toFile(path.join(sceneMediaDirectory, `${slug}-${variant}.avif`));
	}
}
