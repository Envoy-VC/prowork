import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import Dashboard from '~/sections/dashboard';

const DashboardPage: NextPageWithLayout = () => {
	return (
		<div className='mx-auto max-w-screen-2xl py-12'>
			<Dashboard />
		</div>
	);
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default DashboardPage;
