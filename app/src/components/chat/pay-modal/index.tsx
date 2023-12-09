import React from 'react';
import { Modal, Select, Button, Avatar } from 'antd';
import type { SelectProps } from 'antd';

import { useSwitchChain, useAddress, useSigner } from '@thirdweb-dev/react';
import { getTxData } from '~/helpers/contracts';
import { ethers } from 'ethers';

// Types
import type { ContentProps } from '~/lib/xmtp';

interface Props {
	content: ContentProps;
	open: boolean;
	close: () => void;
}

type SupportedChains = 'bscTestnet' | 'mumbaiTestnet' | 'goerliTestnet';

import { supportedTokens } from '../payments-modal';
import { getQuoteCrossChainSwap } from '~/lib/uniswap';
import { ZetaChainContracts } from '~/helpers/contracts';
import toast from 'react-hot-toast';

const PayModal = ({ content, open, close }: Props) => {
	const [token, setToken] = React.useState<string | null>(null);
	const [quote, setQuote] = React.useState<string | null>(null);

	const address = useAddress();
	const switchChain = useSwitchChain();
	const signer = useSigner();

	const [isCalculating, setIsCalculating] = React.useState<boolean>(false);

	const handleChange = async (value: string) => {
		setToken(value);
		try {
			setIsCalculating(true);
			const out = await getQuoteCrossChainSwap({
				sourceAmount: content.amount,
				destinationZRC20: content.targetToken,
				sourceZRC20: ZetaChainContracts[value as SupportedChains].zrc20,
			});
			setQuote(out);
		} catch (error) {
			console.log(error);
		} finally {
			setIsCalculating(false);
		}
	};

	const options: SelectProps['options'] = [
		...supportedTokens.map((token) => {
			const imageUrl = 'https://ipfs.io/ipfs/' + token.logo.slice(7);
			return {
				label: (
					<div className='flex flex-row gap-2'>
						<Avatar src={imageUrl} alt={token.title} size={24} />
						<span className='text-lg font-medium dark:text-[#ffffffd8]'>
							{token.title}
						</span>
					</div>
				),
				value: token.name,
			};
		}),
	];

	const handlePay = async () => {
		const sourceToken = supportedTokens.find((t) => t.name === token);
		if (!sourceToken) return;

		try {
			await switchChain(sourceToken.chainId);
			const txData = getTxData({
				recipient: content.recipient,
				targetToken: content.targetToken,
				sender: address!,
			});
			if (!quote) return;
			const tx = await signer?.sendTransaction({
				data: txData,
				to: ZetaChainContracts[sourceToken.name as SupportedChains].tss,
				value: ethers.utils.parseEther(quote),
				gasLimit: 300000,
			});
			console.log(tx?.hash);
			const toastId = toast.loading('Waiting for transaction to confirm...');
			await tx?.wait();
			toast.dismiss(toastId);
			toast.success('Transaction Confirmed');
		} catch (error) {
			console.log(error);
		} finally {
			close();
		}
	};

	return (
		<Modal
			open={open}
			title='Pay Now'
			footer={null}
			onCancel={close}
			destroyOnClose
		>
			<div className='flex flex-col gap-3 dark:text-gray-200'>
				<div className='text-lg font-medium'>Select Token</div>
				<Select
					placeholder='Select Token'
					value={token}
					defaultValue='goerliTestnet'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onChange={handleChange}
					optionLabelProp='label'
					options={options}
					size='large'
				/>
				<div className='text-lg font-medium dark:text-[#ffffffd8]'>
					Estimated Cost: {quote}{' '}
					{supportedTokens.find((t) => t.name === token)?.title}
				</div>

				<div className='flex w-full justify-center py-6'>
					<Button
						disabled={isCalculating}
						className='bg-secondary'
						type='primary'
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onClick={handlePay}
					>
						Pay
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default PayModal;
