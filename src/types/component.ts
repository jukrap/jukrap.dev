import { Link } from './common';
import { Platform, Project } from './project';

export interface ImageViewerProps {
	images: string[];
	currentIndex: number;
	onClose: () => void;
	onIndexChange: (newIndex: number) => void;
}

export interface ProjectCardProps {
	project: Project;
	onClick: () => void;
}

export interface TechStackIconsProps {
	techStack: string[];
	className?: string;
}

export interface ProfileImageProps {
	isFlipped: boolean;
	onClick: () => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	showMessage: boolean;
	isMessageFadingOut: boolean;
}

export interface CategorySectionProps {
	selectedPlatform: Platform;
	onSelectPlatform: (platform: Platform) => void;
}

// 이미지 관련 베이스 Props
export interface BaseImageProps {
	src: string;
	alt: string;
	className?: string;
}

// 이미지 컴포넌트들의 Props
export interface AspectRatioImageProps extends BaseImageProps {
	onLoad?: () => void;
}

export interface ImageWithAspectRatioProps extends BaseImageProps {
	maxWidth: number;
	maxHeight: number;
}

export interface ImageSpinnerProps {
	className?: string;
}

export interface ImageViewerProps {
	images: string[];
	currentIndex: number;
	onClose: () => void;
	onIndexChange: (newIndex: number) => void;
}

export interface LoadingImageProps {
	src: string;
	alt: string;
	maxWidth?: number;
	maxHeight?: number;
	className?: string;
	priority?: boolean;
	objectFit?: 'contain' | 'cover';
	onLoad?: () => void;
	fill?: boolean;
}

export interface InfiniteCarouselProps {
	images: string[];
	currentIndex: number;
	onImageClick: (index: number) => void;
	onIndexChange: (index: number) => void;
	isViewerOpen: boolean;
}

// UI 컴포넌트 Props
export interface AlertTopBannerProps {
	message: string;
}

export interface ProfileImageProps {
	isFlipped: boolean;
	onClick: () => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	showMessage: boolean;
	isMessageFadingOut: boolean;
}

export interface TechStackIconsProps {
	techStack: string[];
	className?: string;
}

// LoadingState 타입
export interface LoadingState {
	[key: number]: boolean;
}
