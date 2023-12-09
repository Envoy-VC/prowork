import React from 'react';
import Link from 'next/link';
import { Avatar, Button, Image } from 'antd';

// Helpers
import { sanitizeURL, formatFollowers } from '~/helpers';

// Icons
import { TbExternalLink } from 'react-icons/tb';

// Types
import type { ProfileType } from '~/types';

const ProfileCard = ({
	name,
	handle,
	bio,
	picture,
	coverPicture,
	stats,
	interests,
	ownedBy,
}: ProfileType) => {
	const interestsArray = [
		...new Set(interests?.map((interest) => interest.split('__').at(-1))),
	].map((interest) => interest?.replace(/_/g, ' '));
	const coverImage =
		coverPicture?.optimized?.url ??
		coverPicture?.transformed?.url ??
		coverPicture?.original?.url ??
		'https://static.vecteezy.com/system/resources/thumbnails/019/011/154/small/abstract-watercolor-paint-background-beautiful-blue-green-and-yellow-watercolor-splash-design-colorful-plain-green-tones-watercolor-textures-paper-textured-aquarelle-canvas-for-modern-creative-design-vector.jpg';
	const image =
		picture?.optimized?.url ??
		picture?.transformed?.url ??
		picture?.original?.url ??
		'';
	console.log(coverImage);
	return (
		<div className='flex w-full flex-col justify-between rounded-xl pb-4 shadow-xl'>
			<div className=''>
				<div className='relative mb-16'>
					<Image
						src={sanitizeURL(coverImage)}
						alt={`${name}'s Cover Image`}
						height={200}
						className='max-h-[256px] min-w-full rounded-t-xl object-cover'
						preview={false}
						fallback='https://static.vecteezy.com/system/resources/thumbnails/019/011/154/small/abstract-watercolor-paint-background-beautiful-blue-green-and-yellow-watercolor-splash-design-colorful-plain-green-tones-watercolor-textures-paper-textured-aquarelle-canvas-for-modern-creative-design-vector.jpg'
					/>
					<div className='absolute bottom-0 left-0 translate-x-1/4 translate-y-1/3 rounded-full bg-white'>
						<Avatar src={sanitizeURL(image)} className='m-1' size={128} />
					</div>
				</div>

				<div className='flex flex-row items-center justify-between gap-2 px-4'>
					<div className='flex flex-col'>
						<span className='text-xl font-medium text-slate-900'>{name}</span>
						<span className='font-semibold text-gray-400'>@{handle}</span>
					</div>
					<Link href={`https://www.lensfrens.xyz/${handle}`} target='_blank'>
						<TbExternalLink className='text-2xl text-slate-900' />
					</Link>
				</div>

				<p className='whitespace-pre-line break-words px-4 py-2 text-slate-800'>
					{bio}
				</p>

				<div className='flex flex-col px-4 md:flex-row md:gap-3'>
					<span>
						<span className='text-lg font-medium text-slate-900'>Following: </span>
						<span className='font-semibold text-slate-600'>
							{formatFollowers(stats.totalFollowing)}
						</span>
					</span>
					<span>
						<span className='text-lg font-medium text-slate-900'>Followers: </span>
						<span className='font-semibold text-slate-600'>
							{formatFollowers(stats.totalFollowers)}
						</span>
					</span>
				</div>
				{interestsArray.length > 0 && (
					<div className='flex flex-col px-4 md:flex-row md:gap-3'>
						<span>
							<span className='text-lg font-medium text-slate-900'>Interests: </span>
							<span className='font-semibold text-slate-600'>
								{interestsArray.join(', ')}
							</span>
						</span>
					</div>
				)}
			</div>
			<div className='flex justify-center py-4'>
				<Button className='bg-secondary' type='primary' size='large' shape='round'>
					Chat
				</Button>
			</div>
		</div>
	);
};

export default ProfileCard;
