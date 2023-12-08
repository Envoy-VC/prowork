import React from 'react';
import {
	ThirdwebProvider,
	metamaskWallet,
	walletConnect,
	coinbaseWallet,
	trustWallet,
	localWallet,
} from '@thirdweb-dev/react';
import {
	Goerli,
	Mumbai,
	BinanceTestnet,
	ZetachainAthens3Testnet,
} from '@thirdweb-dev/chains';

// Metadata
const dAppMetadata = {
	name: 'My dApp',
	description: 'My dApp description',
	logoUrl: 'https://my-dapp.com/logo.png',
	url: 'https://my-dapp.com',
	isDarkMode: true,
};

import { env } from '~/env.mjs';

const { NEXT_PUBLIC_TW_CLIENT_ID, NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID } = env;

interface Props {
	children: React.ReactNode;
}

const Web3Provider = ({ children }: Props) => {
	return (
		<ThirdwebProvider
			clientId={NEXT_PUBLIC_TW_CLIENT_ID}
			supportedChains={[Goerli, Mumbai, BinanceTestnet, ZetachainAthens3Testnet]}
			dAppMeta={dAppMetadata}
			theme='light'
			supportedWallets={[
				metamaskWallet(),
				coinbaseWallet(),
				walletConnect({
					projectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
				}),
				trustWallet({
					projectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
				}),
				localWallet(),
			]}
		>
			{children}
		</ThirdwebProvider>
	);
};

export default Web3Provider;
