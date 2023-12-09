/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getAddress } from '@zetachain/protocol-contracts';
import { getEndpoints } from '@zetachain/networks/dist/src/getEndpoints';
import UniswapV2Factory from '@uniswap/v2-periphery/build/IUniswapV2Router02.json';

import { ethers } from 'ethers';

interface CrossChainSwapQuoteProps {
	sourceAmount: string;
	sourceZRC20: string;
	destinationZRC20: string;
}

export const getQuoteCrossChainSwap = async ({
	sourceAmount,
	sourceZRC20,
	destinationZRC20,
}: CrossChainSwapQuoteProps) => {
	console.log(sourceAmount);
	const rpc = getEndpoints('evm', 'zeta_testnet')[0]?.url;
	const provider = new ethers.providers.StaticJsonRpcProvider(rpc);
	const routerAddress = getAddress('uniswapv2Router02', 'zeta_testnet');
	const router = new ethers.Contract(
		routerAddress,
		UniswapV2Factory.abi,
		provider
	);
	const zetaToken = '0x5F0b1a82749cb4E2278EC87F8BF6B618dC71a8bf';

	let zetaOut;
	try {
		zetaOut = await router.getAmountsOut(
			ethers.utils.parseUnits(sourceAmount, 18),
			[destinationZRC20, zetaToken]
		);
	} catch (e) {
		console.error(e);
	}

	let dstOut;
	try {
		dstOut = await router.getAmountsOut(zetaOut[1], [zetaToken, sourceZRC20]);
	} catch (e) {
		console.error(e);
	}
	return parseFloat(ethers.utils.formatUnits(dstOut[1], 18)).toFixed(5);
};
