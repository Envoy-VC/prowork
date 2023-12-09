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
