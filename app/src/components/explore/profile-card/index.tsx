import React from 'react';

// Types
import type { ProfileType } from '~/types';

const ProfileCard = ({
	id,
	name,
	bio,
	picture,
	coverPicture,
	stats,
	interests,
}: ProfileType) => {
	return <div>{name}</div>;
};

export default ProfileCard;
