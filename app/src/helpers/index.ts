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
