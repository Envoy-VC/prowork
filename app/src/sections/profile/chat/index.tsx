import React from 'react';
import { useClient } from '@xmtp/react-sdk';
import { useSigner, useAddress } from '@thirdweb-dev/react';
import { Button } from 'antd';
import { ChatArea } from '~/sections';

import { ZetaChainTypeCodec } from '~/lib/xmtp';

import { CgSpinner } from 'react-icons/cg';

const ProfileChat = () => {
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
			<Wrapper>
				<ChatArea />
			</Wrapper>
		);
	}
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='profileDetails flex h-full flex-col items-center justify-center rounded-xl'>
			{children}
		</div>
	);
};

export default ProfileChat;
