export const OmniChainContractAddress =
	'0x1Be3F441c1F2a479BA7890f83B9B667DB6B30911';

export const ZetaChainContracts = {
	bscTestnet: {
		erc20Custody: '0x0000a7db254145767262c6a81a7ee1650684258e',
		tss: '0x8531a5aB847ff5B22D855633C25ED1DA3255247e',
		zrc20: '0xd97B1de3619ed2c6BEb3860147E30cA8A7dC9891',
	},
	goerliTestnet: {
		erc20Custody: '0x000047f11c6e42293f433c82473532e869ce4ec5',
		tss: '0x8531a5aB847ff5B22D855633C25ED1DA3255247e',
		zrc20: '0x13A0c5930C028511Dc02665E7285134B6d11A5f4',
	},
	mumbaiTestnet: {
		erc20Custody: '0x0000a7db254145767262c6a81a7ee1650684258e',
		tss: '0x8531a5aB847ff5B22D855633C25ED1DA3255247e',
		zrc20: '0x48f80608B672DC30DC7e3dbBd0343c5F02C738Eb',
	},
};
import { ethers } from 'ethers';

interface TXDataProps {
	targetToken: string;
	sender: string;
	recipient: string;
}

export const getTxData = ({ targetToken, sender, recipient }: TXDataProps) => {
	const abiCoder = ethers.utils.defaultAbiCoder;

	const types = ['address', 'bytes', 'bytes'];
	const args = [targetToken, sender, recipient];
	for (let i = 0; i < args.length; i++) {
		if (types[i] === 'bytes32') {
			args[i] = ethers.utils.hexlify(ethers.utils.zeroPad(args[i]!, 32));
		}
	}

	const r = abiCoder.encode(types, args);
	const res = `${OmniChainContractAddress}${r.slice(2)}`;
	return res;
};
