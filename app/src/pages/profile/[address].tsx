import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import { useRouter } from 'next/router';

const Profile: NextPageWithLayout = () => {
	const router = useRouter();
	const address = router.query?.address as string;
	return <div className=''>{address}</div>;
};

Profile.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Profile;
