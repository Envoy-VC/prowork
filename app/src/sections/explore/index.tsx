import React from 'react';
import { getTop50Profiles } from '~/helpers';
import { getProfilesAirstack } from '~/services/graphql';
import { useLazyQueryWithPagination } from '@airstack/airstack-react';

import { CgSpinner } from 'react-icons/cg';

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
	else
		return (
			<div className='flex w-full items-center justify-center py-8'>
				<CgSpinner className='mr-2 inline-block animate-spin text-3xl' />
			</div>
		);
};

export default ExploreProfiles;
