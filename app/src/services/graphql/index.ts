export const getProfileDetails = (address: string) => {
	return `
	query FetchUserDetails {
		Domains(
			input: {
				filter: {
					resolvedAddress: { _eq: "${address}" }
				}
				blockchain: ethereum
			}
		) {
			Domain {
				dappName
				name
			}
		}
		Socials(
			input: {
				filter: {
					userAssociatedAddresses: {
						_eq: "${address}"
					}
				}
				blockchain: ethereum
			}
		) {
			Social {
				dappName
				followerCount
				followingCount
				profileHandle
				profileDisplayName
				profileBio
				profileImage
				coverImageURI
				identity
				twitterUserName
			}
		}
		XMTPs(
			input: {
				blockchain: ALL
				filter: { owner: { _eq: "${address}" } }
			}
		) {
			XMTP {
				isXMTPEnabled
			}
		}
	}
`;
};

export const getProfilesQuery = () => {
	return `
		query getProfiles($profileIds: [ProfileId!]!) {
			profiles(request: { limit: 50, profileIds: $profileIds }) {
				items {
					id
					name
					handle
					ownedBy
					bio
					picture {
						... on MediaSet {
							original {
								url
							}
							optimized {
								url
							}
							transformed(
								params: { height: "auto", width: "auto", keepAspectRatio: true }
							) {
								url
							}
						}
						... on NftImage {
							uri
						}
					}
					coverPicture {
						... on MediaSet {
							original {
								url
							}
							optimized {
								url
							}
							transformed(
								params: { height: "auto", width: "auto", keepAspectRatio: true }
							) {
								url
							}
						}
						... on NftImage {
							uri
						}
					}
					stats {
						totalFollowers
						totalFollowing
					}
					interests
				}
			}
		}
	`;
};

export const getProfilesAirstack = () => {
	return `
		query getProfiles($profileIds: [Identity!]) {
			Socials(
				input: { filter: { identity: { _in: $profileIds } }, blockchain: ethereum }
			) {
				Social {
					profileDisplayName
					profileHandle
					profileBio
					profileImage
					coverImageURI
					followingCount
					followerCount
					userAddress
					profileImageContentValue {
						image {
							original
							extraSmall
							small
							medium
						}
					}
				}
				pageInfo {
					hasNextPage
					hasPrevPage
					nextCursor
					prevCursor
				}
			}
		}
	`;
};

export const getNameAndProfileImage = () => {
	return `
		query getNameAndProfileImage($address: Identity!) {
			Socials(
				input: {
					filter: { identity: { _eq: $address } }
					blockchain: ethereum
				}
			) {
				Social {
					profileHandle
					dappName
					profileImageContentValue {
						image {
							original
							extraSmall
							large
							medium
							small
						}
					}
				}
			}
		}
	`;
};
