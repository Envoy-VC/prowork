import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

const Work: NextPageWithLayout = () => {
	return <div className=''></div>;
};

Work.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Work;
