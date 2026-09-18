import { useId, useState } from 'react';
import Image from 'next/image';
import { ProfileInteractionProps } from '@/types/profile';
import { useLocale } from '@/contexts/localeContext';

const ProfileImage: React.FC<ProfileInteractionProps> = ({
	isFlipped,
	onClick,
	onMouseEnter,
	onMouseLeave,
	showMessage,
}) => {
	const {
		dictionary,
		data: { personalInfo },
	} = useLocale();
	const [frontStatus, setFrontStatus] = useState<'loading' | 'loaded' | 'error'>(
		'loading',
	);
	const [backStatus, setBackStatus] = useState<'loading' | 'loaded' | 'error'>(
		'loading',
	);
	const hintId = useId();
	return (
		<div
			className="profile-portrait"
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<button
				type="button"
				className="profile-portrait-button"
				onClick={onClick}
				onFocus={onMouseEnter}
				onBlur={onMouseLeave}
				aria-label={
					isFlipped ? dictionary.about.profileRestore : dictionary.about.profileFlip
				}
				aria-pressed={isFlipped}
				aria-describedby={showMessage ? hintId : undefined}
			>
				<span
					className={`profile-portrait-faces${isFlipped ? ' profile-portrait-flipped' : ''}`}
				>
					<span className="profile-portrait-face" aria-hidden={isFlipped}>
						{frontStatus !== 'loaded' && (
							<span className="profile-portrait-placeholder">
								{frontStatus === 'error' ? personalInfo.name : ''}
							</span>
						)}
						<Image
							src="/images/profileFront.png"
							alt={personalInfo.name}
							fill
							sizes="160px"
							preload
							className={`profile-portrait-image${frontStatus === 'loaded' ? ' profile-portrait-image-ready' : ''}`}
							onLoad={() => setFrontStatus('loaded')}
							onError={() => setFrontStatus('error')}
						/>
					</span>
					<span
						className="profile-portrait-face profile-portrait-back"
						aria-hidden={!isFlipped}
					>
						{backStatus !== 'loaded' && (
							<span className="profile-portrait-placeholder">
								{backStatus === 'error' ? 'Doge' : ''}
							</span>
						)}
						<Image
							src="/images/profileBack.png"
							alt="Doge"
							fill
							sizes="160px"
							className={`profile-portrait-image${backStatus === 'loaded' ? ' profile-portrait-image-ready' : ''}`}
							onLoad={() => setBackStatus('loaded')}
							onError={() => setBackStatus('error')}
						/>
					</span>
				</span>
			</button>
			{showMessage && (
				<span
					id={hintId}
					role="tooltip"
					className="profile-portrait-hint profile-portrait-hint-visible"
				>
					{isFlipped
						? dictionary.about.profileMessageFlipped
						: dictionary.about.profileMessageDefault}
				</span>
			)}
		</div>
	);
};
export default ProfileImage;
