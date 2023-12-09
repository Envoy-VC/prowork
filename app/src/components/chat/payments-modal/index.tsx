import React from 'react';
import { Modal, Button, Select, Avatar, InputNumber } from 'antd';
import type { SelectProps } from 'antd';

import { useSendMessage } from '@xmtp/react-sdk';
import { useAddress } from '@thirdweb-dev/react';

import { ContentTypeZetaChainInteraction } from '~/lib/xmtp';
import type { ContentProps } from '~/lib/xmtp';

import { Mumbai, Goerli, BinanceTestnet } from '@thirdweb-dev/chains';
import { useChatStore } from '~/stores';

import {
	OmniChainContractAddress,
	ZetaChainContracts,
} from '~/helpers/contracts';

interface Props {
	open: boolean;
	close: () => void;
}

export const supportedTokens = [
	{
		title: 'MATIC',
		name: 'mumbaiTestnet',
		chainId: Mumbai.chainId,
		logo: Mumbai.icon.url,
	},
	{
		title: 'gETH',
		name: 'goerliTestnet',
		chainId: Goerli.chainId,
		logo: Goerli.icon.url,
	},
	{
		title: 'tBSC',
		name: 'bscTestnet',
		chainId: BinanceTestnet.chainId,
		logo: BinanceTestnet.icon.url,
	},
];

const PaymentsModal = ({ open, close }: Props) => {
	const [token, setToken] = React.useState<string>('goerliTestnet');
	const [amount, setAmount] = React.useState<string>('0.01');

	const { sendMessage } = useSendMessage();
	const { conversation } = useChatStore();
	const [isSending, setIsSending] = React.useState(false);
	const address = useAddress();

	const handleSend = async () => {
		if (!conversation) return;
		if (parseInt(amount) < 0) return;
		try {
			setIsSending(true);
			const message: ContentProps = {
				omniChainContractAddress: OmniChainContractAddress,
				targetToken:
					ZetaChainContracts[
						token as 'mumbaiTestnet' | 'bscTestnet' | 'goerliTestnet'
					].zrc20,
				recipient: address!,
				amount,
			};
			await sendMessage(conversation, message, ContentTypeZetaChainInteraction);
			close();
		} catch (error) {
			console.log(error);
		} finally {
			setIsSending(false);
		}
	};

	const handleChange = (value: string) => {
		setToken(value);
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

	return (
		<Modal open={open} title='Payment Details' footer={null} onCancel={close}>
			<div className='flex flex-col gap-3 dark:text-gray-200'>
				<div className='text-lg font-medium'>Select Token</div>
				<Select
					placeholder='Select Token'
					value={token}
					defaultValue='goerliTestnet'
					onChange={handleChange}
					optionLabelProp='label'
					options={options}
					size='large'
				/>
				<InputNumber
					placeholder='Enter Amount'
					value={amount}
					size='large'
					className='w-full'
					onChange={(e) => {
						setAmount(e?.toString() ?? '');
					}}
				/>

				<div className='flex w-full justify-center py-6'>
					<Button
						className='bg-secondary'
						type='primary'
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onClick={handleSend}
					>
						Request
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default PaymentsModal;
