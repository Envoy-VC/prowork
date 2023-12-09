import React from 'react';
import { Image, Avatar } from 'antd';

const ProfileDetails = () => {
	return (
		<div className='profileDetails flex h-full flex-col rounded-xl'>
			<Image
				src={
					'https://cloudflare-ipfs.com/ipfs/bafkreid2mlomtqkdl2cha5tqfhluts3ug2h2tgsm6asrsbqrf43lmpvq3u'
				}
				alt='Profile Banner'
				height={256}
				className='w-full rounded-t-xl object-cover'
				preview={false}
			/>

			<div className='my-6 flex flex-row items-center gap-4 px-3'>
				<Avatar
					src={
						'https://cloudflare-ipfs.com/ipfs/bafkreihzphsxh4kqucbqcmfgmux6clffxdyocgrocu7y7dpjf32w3bz4xe'
					}
					size={128}
					className='rounded-full border-4 border-secondary'
				/>
				<div className='flex flex-col items-stretch'>
					<div className='text-2xl font-semibold text-slate-800'>rAAVE 👻</div>
					<div className='text-lg font-semibold text-gray-500'>@letsraave</div>
					<div className='flex flex-row items-center gap-2'>
						<span className='font-semibold text-slate-700'>
							<span className='font-medium text-gray-500'>Following: </span>
							28
						</span>
						<span className='font-semibold text-slate-700'>
							<span className='font-medium text-gray-500'>Following: </span>
							6.3K
						</span>
					</div>
				</div>
			</div>
			<div className='flex items-center justify-center'>
				<p className='whitespace-pre-line break-words rounded-lg bg-gray-100 p-3'>
					{bio}
				</p>
			</div>
		</div>
	);
};

const bio = `⌐◨-◨ Stay curious 🌎 // Head of Growth @LensProtocol // Building the future of social

🎨 : My Favourite Lens Collects -- > https://www.bonfire.xyz/christina/home
📖: Working in Public

Background image - courtesy of collect by @mstrbstrd.lens`;

export default ProfileDetails;
