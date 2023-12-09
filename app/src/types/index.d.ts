export interface ProfileType {
	id: string;
	name: string;
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
}
