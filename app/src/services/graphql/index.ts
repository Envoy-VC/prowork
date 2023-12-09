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
