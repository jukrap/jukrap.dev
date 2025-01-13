import { Project } from './project';

export interface WebViewModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	selectedLink: string;
	linkText: string;
}

export interface MobileWarningModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export interface ProjectDetailProps {
	project: Project;
	onClose: () => void;
}
