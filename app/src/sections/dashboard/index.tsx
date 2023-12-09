import React from 'react';
import { useSigner, useAddress } from '@thirdweb-dev/react';
import { useClient } from '@xmtp/react-sdk';

import { ZetaChainTypeCodec } from '~/lib/xmtp';

import { Button } from 'antd';

import { CgSpinner } from 'react-icons/cg';

import { Chats } from '~/components/dashboard';
import ChatArea from '../chat-area';

const Dashboard = () => {
	const { client, isLoading, initialize } = useClient();
	const signer = useSigner();
	const address = useAddress();

	const handleConnect = async () => {
		const options = {
			persistConversations: true,
			env: 'dev' as 'dev' | 'local' | 'production' | undefined,
		};
		const client = await initialize({ options, signer });
		client?.registerCodec(new ZetaChainTypeCodec());
		console.log(client);
	};

	if (!address) {
		return (
			<Wrapper>
				<div>Connect you Wallet</div>
			</Wrapper>
		);
	} else if (address && !client && !isLoading) {
		return (
			<Wrapper>
				<Button
					size='large'
					type='primary'
					className='bg-secondary'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={handleConnect}
				>
					Start Chat
				</Button>
			</Wrapper>
		);
	} else if (address && !client && isLoading) {
		return (
			<Wrapper>
				<div className='text-center text-xl font-semibold'>
					<CgSpinner className='mr-2 inline-block animate-spin' />
					Loading...
				</div>
			</Wrapper>
		);
	} else if (address && client) {
		return (
			<div className='flex flex-col gap-8 md:flex-row'>
				<div className='w-full basis-1/3'>
					<Chats />
				</div>
				<div className='w-full basis-2/3 border-2'>
					<ChatArea />
				</div>
			</div>
		);
	}
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex h-full flex-col items-center justify-center'>
			{children}
		</div>
	);
};

export default Dashboard;
