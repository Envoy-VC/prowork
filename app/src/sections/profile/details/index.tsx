import React from 'react';
import { Image, Avatar } from 'antd';
import { sanitizeURL } from '~/helpers';
import type { AirstackProfile } from '~/types';
import { formatFollowers } from '~/helpers';

interface Props {
	profile: AirstackProfile;
}

const ProfileDetails = ({ profile }: Props) => {
	const {
		profileDisplayName,
		profileHandle,
		profileBio,
		profileImage,
		coverImageURI,
		followerCount,
		followingCount,
		userAddress,
		profileImageContentValue: { image },
	} = profile;

	const coverImage =
		coverImageURI !== ''
			? sanitizeURL(coverImageURI)
			: 'https://static.vecteezy.com/system/resources/thumbnails/019/011/154/small/abstract-watercolor-paint-background-beautiful-blue-green-and-yellow-watercolor-splash-design-colorful-plain-green-tones-watercolor-textures-paper-textured-aquarelle-canvas-for-modern-creative-design-vector.jpg';

	const profileContentImage = image
		? sanitizeURL(image.extraSmall) ??
		  sanitizeURL(image.small) ??
		  sanitizeURL(image.medium) ??
		  sanitizeURL(image.original)
		: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png';

	const avatar =
		profileImage !== ''
			? sanitizeURL(profileImage)
			: sanitizeURL(profileContentImage);

	return (
		<div className='profileDetails flex h-full flex-col rounded-xl'>
			<Image
				src={coverImage}
				alt='Profile Banner'
				height={256}
				className='w-full rounded-t-xl object-cover'
				preview={false}
			/>

			<div className='my-6 flex flex-row items-center gap-4 px-3'>
				<Avatar
					src={avatar}
					size={128}
					className='rounded-full border-4 border-secondary'
				/>
				<div className='flex flex-col items-stretch'>
					<div className='text-2xl font-semibold text-slate-800'>
						{profileDisplayName}
					</div>
					<div className='text-lg font-semibold text-gray-500'>{profileHandle}</div>
					<div className='flex flex-row items-center gap-2'>
						<span className='font-semibold text-slate-700'>
							<span className='font-medium text-gray-500'>Following: </span>
							{formatFollowers(parseInt(followingCount))}
						</span>
						<span className='font-semibold text-slate-700'>
							<span className='font-medium text-gray-500'>Following: </span>
							{formatFollowers(parseInt(followerCount))}
						</span>
					</div>
				</div>
			</div>
			<div className='flex items-center justify-center'>
				<p className='mx-4 w-full whitespace-pre-line break-words rounded-lg bg-gray-100 p-3'>
					{profileBio}
				</p>
			</div>
		</div>
	);
};

export default ProfileDetails;
