import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

import { TbArrowRight } from 'react-icons/tb';

import { Button } from 'antd';
import { useSigner } from '@thirdweb-dev/react';

import { getQuoteCrossChainSwap } from '~/lib/uniswap';

import { ethers } from 'ethers';

// Components
import { Hero } from '~/components/home';

const Home: NextPageWithLayout = () => {
	const signer = useSigner();
	const onClick = async () => {
		const omniChainContract = '0x1Be3F441c1F2a479BA7890f83B9B667DB6B30911';
		const amount = 0.01;
		const targetToken = '0x48f80608B672DC30DC7e3dbBd0343c5F02C738Eb';
		const sender = '0xe269688F24e1C7487f649fC3dCD99A4Bf15bDaA1';
		const recipient = '0xBF4979305B43B0eB5Bb6a5C67ffB89408803d3e1';

		const abiCoder = ethers.utils.defaultAbiCoder;

		const types = ['address', 'bytes', 'bytes'];
		const args = [targetToken, sender, recipient];
		for (let i = 0; i < args.length; i++) {
			if (types[i] === 'bytes32') {
				args[i] = ethers.utils.hexlify(ethers.utils.zeroPad(args[i]!, 32));
			}
		}

		const r = abiCoder.encode(types, args);
		const res = `${omniChainContract}${r.slice(2)}`;
		const tx = await signer?.sendTransaction({
			data: res,
			to: '0x8531a5aB847ff5B22D855633C25ED1DA3255247e',
			value: ethers.utils.parseEther(amount.toString()),
			gasLimit: 300000,
		});
		console.log(tx?.hash);
	};

	const getQuotes = async () => {
		const quotes = await getQuoteCrossChainSwap({
			sourceAmount: '0.01',
			sourceZRC20: '0x13A0c5930C028511Dc02665E7285134B6d11A5f4',
			destinationZRC20: '0x48f80608B672DC30DC7e3dbBd0343c5F02C738Eb',
		});
	};
	return (
		<div className=''>
			<Hero />
			<div className='px-4'>
				<div className='mx-auto my-12 flex max-w-screen-2xl flex-col gap-8 rounded-lg bg-[#6eb9d48b] py-5 pl-12 text-slate-700'>
					{ProfessionList.map((profession, index) => (
						<div className='group flex flex-col gap-2 md:gap-4' key={index}>
							<div className='flex cursor-pointer flex-row justify-between py-4 text-2xl font-medium md:text-5xl'>
								{profession.name}
								<TbArrowRight className='mr-12 translate-x-[-48px] opacity-0 transition-all duration-500 ease-out group-hover:flex group-hover:translate-x-0 group-hover:text-black group-hover:opacity-100' />
							</div>
							{index !== ProfessionList.length - 1 && (
								<div className='border-b-[3px] border-gray-100 transition-all duration-500 ease-out group-hover:border-black'></div>
							)}
						</div>
					))}
				</div>
			</div>
			<Button
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={getQuotes}
			>
				Click
			</Button>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export const ProfessionList = [
	{
		name: 'Product Management',
	},
	{
		name: 'Web and Mobile Development',
	},
	{
		name: 'Product Design',
	},
	{
		name: 'Digital Marketing',
	},
	{
		name: 'Sales and Marketing',
	},
	{
		name: 'Writing and Translation',
	},
	{
		name: 'Finance and Accounting',
	},
];

export default Home;
