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
		profileIds.push(profile.id);
	});
	console.log(profileIds);

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
