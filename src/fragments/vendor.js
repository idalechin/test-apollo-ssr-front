import gql from 'graphql-tag';

export default Vendor.fragments = {
  vendor: gql`
    fragment VendorMedia on Vendor {
      media {
				id
				source
				images {
					normal {
						src
						width
						height
					}
				}
			}
    }
  `,
};