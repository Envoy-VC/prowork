import { getProfilesQuery } from '~/services/graphql';

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
		profileIds.push(profile.id);
	});

	return profileIds;
};

export interface ProfileType {
	id: string;
	name: string;
	bio: string;
	picture: {
		original: {
			url: string;
		};
		optimized: {
			url: string;
		} | null;
		transformed: {
			url: string;
		} | null;
	};
	coverPicture: {
		original: {
			url: string;
		};
		optimized: {
			url: string;
		} | null;
		transformed: {
			url: string;
		} | null;
	};
	stats: {
		totalFollowers: number;
		totalFollowing: number;
	};
	interests: string[];
}

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

	const data = (await res.json()) as ProfileType[];
	return data;
};
