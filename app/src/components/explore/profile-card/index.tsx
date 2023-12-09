import React from 'react';
import Link from 'next/link';
import { Avatar, Button, Image } from 'antd';

// Helpers
import { sanitizeURL, formatFollowers } from '~/helpers';

// Icons
import { TbExternalLink } from 'react-icons/tb';

// Types
import type { AirstackProfile } from '~/types';

const ProfileCard = ({
	profileDisplayName,
	profileHandle,
	profileBio,
	profileImage,
	coverImageURI,
	followerCount,
	followingCount,
	userAddress,
	profileImageContentValue: { image },
}: AirstackProfile) => {
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
		<div className='flex w-full flex-col justify-between rounded-xl pb-4 shadow-xl'>
			<div className=''>
				<div className='relative mb-16'>
					<Image
						src={coverImage}
						alt={`${profileDisplayName}'s Cover Image`}
						height={200}
						className='max-h-[256px] min-w-full rounded-t-xl object-cover'
						preview={false}
						fallback='https://static.vecteezy.com/system/resources/thumbnails/019/011/154/small/abstract-watercolor-paint-background-beautiful-blue-green-and-yellow-watercolor-splash-design-colorful-plain-green-tones-watercolor-textures-paper-textured-aquarelle-canvas-for-modern-creative-design-vector.jpg'
					/>
					<div className='absolute bottom-0 left-0 translate-x-1/4 translate-y-1/3 rounded-full bg-white'>
						<Avatar src={avatar} className='m-1' size={128} />
					</div>
				</div>

				<div className='flex flex-row items-center justify-between gap-2 px-4'>
					<div className='flex flex-col'>
						<span className='text-xl font-medium text-slate-900'>
							{profileDisplayName}
						</span>
						<span className='font-semibold text-gray-400'>{profileHandle}</span>
					</div>
					<Link
						href={`https://www.lensfrens.xyz/${profileHandle.slice(1)}`}
						target='_blank'
					>
						<TbExternalLink className='text-2xl text-slate-900' />
					</Link>
				</div>

				<p className='whitespace-pre-line break-words px-4 py-2 text-slate-800'>
					{profileBio}
				</p>

				<div className='flex flex-col px-4 md:flex-row md:gap-3'>
					<span>
						<span className='text-lg font-medium text-slate-900'>Following: </span>
						<span className='font-semibold text-slate-600'>
							{formatFollowers(parseInt(followingCount))}
						</span>
					</span>
					<span>
						<span className='text-lg font-medium text-slate-900'>Followers: </span>
						<span className='font-semibold text-slate-600'>
							{formatFollowers(parseInt(followerCount))}
						</span>
					</span>
				</div>
			</div>
			<div className='flex justify-center py-4'>
				<Link href={`/profile/${userAddress}`} target='_blank'>
					<Button className='bg-secondary' type='primary' size='large' shape='round'>
						Chat
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default ProfileCard;
