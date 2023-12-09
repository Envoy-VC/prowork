import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import { useRouter } from 'next/router';

// Components
import { ProfileChat, ProfileDetails } from '~/sections/profile';

const Profile: NextPageWithLayout = () => {
	const router = useRouter();
	const address = router.query?.address as string;
	return (
		<div className='mx-auto flex h-[85vh] max-w-screen-2xl flex-col gap-8 px-4 md:flex-row'>
			<div className='order-2 h-full w-full basis-1/2 md:order-1'>
				<ProfileDetails />
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
