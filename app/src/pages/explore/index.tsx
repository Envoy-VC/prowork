import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { ExploreProfiles } from '~/sections';
import { Button, Input } from 'antd';

import { isValidAddress } from '@xmtp/react-sdk';

import { TbSearch } from 'react-icons/tb';
// Fonts
import { Dela_Gothic_One } from 'next/font/google';
import toast from 'react-hot-toast';

const delaOne = Dela_Gothic_One({ weight: '400', subsets: ['latin'] });

const Explore: NextPageWithLayout = () => {
	const router = useRouter();
	const [address, setAddress] = React.useState<string>('');

	const onClick = () => {
		if (isValidAddress(address)) {
			void router.push(`/profile/${address}`);
		} else {
			toast.error('Invalid address');
		}
	};
	return (
		<div className='mx-auto my-16 max-w-screen-2xl px-4'>
			<div
				className={clsx(
					'flex flex-col text-4xl uppercase leading-[1.15] text-slate-900 md:text-[5rem]',
					delaOne.className
				)}
			>
				<div className=''>Find a job</div>
				<div className=''>that&lsquo;s just right.</div>
			</div>
			<div className='mt-8 flex flex-col items-center gap-3 md:flex-row'>
				<Input
					prefix={<TbSearch />}
					placeholder='Find by address'
					size='large'
					className='w-full max-w-md'
					onChange={(e) => setAddress(e.target.value)}
				/>
				<Button
					className='!border-none bg-slate-900 text-white hover:!bg-slate-900'
					size='large'
					type='primary'
					onClick={onClick}
				>
					SEARCH
				</Button>
			</div>
			<ExploreProfiles />
		</div>
	);
};

Explore.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Explore;
