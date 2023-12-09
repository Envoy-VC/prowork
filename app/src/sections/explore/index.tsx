import React from 'react';
import { getFeed, getTop50Profiles } from '~/helpers';
import { getProfilesAirstack } from '~/services/graphql';
import { useLazyQueryWithPagination } from '@airstack/airstack-react';

import type { BaseAirStackResponse, AirstackProfile } from '~/types';

import { ProfileCard } from '~/components/explore';

const ExploreProfiles = () => {
	const [fetch] = useLazyQueryWithPagination<
		BaseAirStackResponse<AirstackProfile>
	>(getProfilesAirstack());

	const [profiles, setProfiles] = React.useState<AirstackProfile[] | null>(null);

	React.useEffect(() => {
		const fetchData = async () => {
			const profileIds = await getTop50Profiles();
			const res = await fetch({
				profileIds: profileIds,
			});
			const profilesData = res.data?.Socials?.Social ?? [];
			console.log(profilesData);
			setProfiles(profilesData);
		};
		void fetchData();
	}, []);
	if (profiles)
		return (
			<div className='grid grid-cols-1 justify-items-center gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3'>
				{profiles.map((profile, index) => (
					<ProfileCard key={index} {...profile} />
				))}
			</div>
		);
};

export default ExploreProfiles;
