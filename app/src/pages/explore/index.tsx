import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

const Explore: NextPageWithLayout = () => {
	return <div className=''></div>;
};

Explore.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Explore;
