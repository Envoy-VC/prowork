import { getProfilesQuery } from '~/services/graphql';

// Types
import type { ProfileType } from '~/types';

export const getTop50Profiles = async () => {
	const response = await fetch(
		'https://lens-api.k3l.io/profile/scores?strategy=creator&offset=0&limit=50'
	);
	const data = (await response.json()) as {
		score: number;
		rank: string;
		handle: string;
		followersCount: string;
		id: string;
	}[];

	const profileIds: string[] = [];

	data.forEach((profile) => {
		profileIds.push(`lens_id:${profile.id}`);
	});
	return profileIds;
};

export const getFeed = async () => {
	const profiles = await getTop50Profiles();
	const res = await fetch('https://api.lens.dev/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: getProfilesQuery(),
			variables: {
				profileIds: profiles,
			},
		}),
	});

	const data = (await res.json()) as {
		data: {
			profiles: {
				items: ProfileType[];
			};
		};
	};
	return data.data.profiles.items;
};

export const sanitizeURL = (url: string) => {
	if (url.startsWith('https://')) {
		return url;
	} else if (url.startsWith('ipfs://')) {
		return `https://cloudflare-ipfs.com/ipfs/${url.slice(7)}`;
	} else if (url.startsWith('ar://')) {
		return `https://arweave.net/${url.slice(5)}`;
	} else {
		return url;
	}
};

export const formatFollowers = (count: number) => {
	if (count < 1000) {
		return count;
	} else if (count < 1000000) {
		return (count / 1000).toFixed(1) + 'K';
	} else if (count < 1000000000) {
		return (count / 1000000).toFixed(1) + 'M';
	} else {
		return (count / 1000000000).toFixed(1) + 'B';
	}
};

export const formatTimestamp = (date: Date) => {
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	const formattedHours = hours % 12 || 12;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

export const getMessageTime = (timestamp: number) => {
	const now = new Date().getTime() / 1000;
	const seconds = Math.floor(now - timestamp);
	const intervals = [
		{ label: 'y', seconds: 31536000 },
		{ label: 'mo', seconds: 2592000 },
		{ label: 'w', seconds: 604800 },
		{ label: 'd', seconds: 86400 },
		{ label: 'h', seconds: 3600 },
		{ label: 'min', seconds: 60 },
		{ label: 's', seconds: 1 },
	];
	intervals.forEach((interval) => {
		const count = Math.floor(seconds / interval.seconds);
		if (count >= 1) {
			return `${count}${interval.label} ago`;
		}
	});
};

import { ZetaChainContracts } from './contracts';
import { BinanceTestnet, Goerli, Mumbai } from '@thirdweb-dev/chains';

export const getTargetChainAndTss = (targetToken: string) => {
	if (ZetaChainContracts.bscTestnet.zrc20 === targetToken) {
		return {
			icon: 'https://ipfs.io/ipfs/' + BinanceTestnet.icon.url.slice(7),
			name: 'tBSC',
			targetToken: ZetaChainContracts.bscTestnet.zrc20,
			tss: ZetaChainContracts.bscTestnet.tss,
		};
	} else if (ZetaChainContracts.goerliTestnet.zrc20 === targetToken) {
		return {
			icon: 'https://ipfs.io/ipfs/' + Goerli.icon.url.slice(7),
			name: 'gETH',
			targetToken: ZetaChainContracts.goerliTestnet.zrc20,
			tss: ZetaChainContracts.goerliTestnet.tss,
		};
	} else {
		return {
			icon: 'https://ipfs.io/ipfs/' + Mumbai.icon.url.slice(7),
			name: 'MATIC',
			targetToken: ZetaChainContracts.mumbaiTestnet.zrc20,
			tss: ZetaChainContracts.mumbaiTestnet.tss,
		};
	}
};
