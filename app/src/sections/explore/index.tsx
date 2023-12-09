import React from 'react';
import { getFeed } from '~/helpers';

import { ProfileCard } from '~/components/explore';

// Types
import type { ProfileType } from '~/types';

const ExploreProfiles = () => {
	const [profiles, setProfiles] = React.useState<ProfileType[] | null>(null);

	React.useEffect(() => {
		const fetchData = async () => {
			const feed = await getFeed();
			setProfiles(feed);
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
