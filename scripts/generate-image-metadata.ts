const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

interface ImageMetadata {
	width: number;
	height: number;
	isPortrait: boolean;
}

interface MetadataRecord {
	[key: string]: ImageMetadata;
}

async function generateMetadata(): Promise<void> {
	const imageDir: string = path.join(process.cwd(), 'public/images');
	const metadata: MetadataRecord = {};

	const processDirectory = async (dir: string): Promise<void> => {
		const files: string[] = fs.readdirSync(dir);

		for (const file of files) {
			const filePath: string = path.join(dir, file);
			const stat = fs.statSync(filePath);

			if (stat.isDirectory()) {
				await processDirectory(filePath);
				continue;
			}

			if (!/\.(jpg|jpeg|png|webp)$/i.test(file)) continue;

			const relativePath: string = path
				.relative(process.cwd(), filePath)
				.replace(/\\/g, '/');
			const imageInfo = await sharp(filePath).metadata();

			if (imageInfo.width && imageInfo.height) {
				metadata[`/${relativePath}`] = {
					width: imageInfo.width,
					height: imageInfo.height,
					isPortrait: imageInfo.height > imageInfo.width,
				};
			}
		}
	};

	await processDirectory(imageDir);

	// data 폴더가 없으면 생성
	const dataDir: string = path.join(process.cwd(), 'src/data');
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir, { recursive: true });
	}

	fs.writeFileSync(
		path.join(process.cwd(), 'src/data/imageMetadata.json'),
		JSON.stringify(metadata, null, 2),
	);

	console.log('Image metadata generated successfully!');
}

generateMetadata().catch((error: Error) => {
	console.error('Error generating metadata:', error);
	process.exit(1);
});
