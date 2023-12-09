import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import { useRouter } from 'next/router';
import { useChatStore } from '~/stores';

import { getProfilesAirstack } from '~/services/graphql';
import { useLazyQueryWithPagination } from '@airstack/airstack-react';

import { CgSpinner } from 'react-icons/cg';
import type { BaseAirStackResponse, AirstackProfile } from '~/types';

// Components
import { ProfileChat, ProfileDetails } from '~/sections/profile';

const Profile: NextPageWithLayout = () => {
	const [fetch] = useLazyQueryWithPagination<
		BaseAirStackResponse<AirstackProfile>
	>(getProfilesAirstack());

	const [profile, setProfile] = React.useState<AirstackProfile | null>(null);

	const { setPeerAddress } = useChatStore();
	const router = useRouter();
	const address = router.query?.address as string;

	React.useEffect(() => {
		async function getProfile() {
			const res = await fetch({
				profileIds: [address],
			});
			const profilesData = res.data?.Socials?.Social?.at(0) ?? null;
			console.log(profilesData);
			setProfile(profilesData);
		}
		if (address) {
			setPeerAddress(address);
			void getProfile();
		}
	}, [address]);

	if (profile)
		return (
			<div className='mx-auto flex h-[85vh] max-w-screen-2xl flex-col gap-8 px-4 md:flex-row'>
				<div className='order-2 h-full w-full basis-1/2 md:order-1'>
					<ProfileDetails profile={profile} />
				</div>
				<div className='order-1 h-[85vh] w-full basis-1/2 md:order-2'>
					<ProfileChat />
				</div>
			</div>
		);
};

Profile.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Profile;
