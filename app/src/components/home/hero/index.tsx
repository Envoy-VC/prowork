import clsx from 'clsx';
import React from 'react';
import { Space, Input, Button } from 'antd';

// Icons
import { TbSearch, TbCurrentLocation } from 'react-icons/tb';

// Fonts
import { Dela_Gothic_One } from 'next/font/google';
const delaOne = Dela_Gothic_One({ weight: '400', subsets: ['latin'] });

const Hero = () => {
	return (
		<div className='mx-auto my-8 max-w-screen-2xl px-4'>
			<div
				className={clsx(
					'flex flex-col text-4xl uppercase leading-[1.1] text-slate-900 md:text-[5rem]',
					delaOne.className
				)}
			>
				<div className=''>Choose an expert.</div>
				<div className=''>And get the job done.</div>
			</div>
			<div className='my-16 flex flex-col items-center justify-start gap-4 md:flex-row'>
				<Space.Compact size='large' className='w-full max-w-3xl'>
					<Input
						prefix={<TbSearch />}
						placeholder='Find Jobs, Freelancers'
						size='large'
						className='w-full max-w-md'
					/>
					<Input
						prefix={<TbCurrentLocation />}
						placeholder='Everywhere'
						size='large'
						className='w-full max-w-xs'
					/>
				</Space.Compact>
				<Button
					className='!border-none bg-slate-900 text-white hover:!bg-slate-900'
					size='large'
					type='primary'
				>
					SEARCH
				</Button>
			</div>
		</div>
	);
};

export default Hero;
