export interface ProfileType {
	id: string;
	name: string;
	handle: string;
	bio: string;
	picture: {
		original: {
			url: string;
		};
		optimized: {
			url: string;
		} | null;
		transformed: {
			url: string;
		} | null;
	};
	coverPicture: {
		original: {
			url: string;
		};
		optimized: {
			url: string;
		} | null;
		transformed: {
			url: string;
		} | null;
	};
	stats: {
		totalFollowers: number;
		totalFollowing: number;
	};
	interests: string[];
	ownedBy: string;
}

export interface AirstackProfile {
	profileDisplayName: string;
	profileHandle: string;
	profileBio: string;
	profileImage: string;
	coverImageURI: string;
	followingCount: string;
	followerCount: string;
	userAddress: string;
	profileImageContentValue: {
		image: {
			original: string;
			extraSmall: string;
			small: string;
			medium: string;
		} | null;
	};
}

export interface BaseAirStackResponse<T> {
	Socials: {
		Social: T[];
		pageInfo: {
			hasNextPage: boolean;
			hasPrevPage: boolean;
			nextCursor: string;
			prevCursor: string;
		};
		pageInfo_cursor: {
			nextCursor: string;
			prevCursor: string;
		};
	};
}

export interface ProfileNameAndImageResponse {
	Socials: {
		Social: {
			profileHandle: string;
			dappName: string;
			profileContentValue: {
				image: {
					original: string;
					extraSmall: string;
					large: string;
					medium: string;
					small: string;
				} | null;
			};
		}[];
	};
}
