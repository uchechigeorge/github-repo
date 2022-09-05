import axios from "axios";

/** 
 * Fetch repos from an organization from the Github api
 * @param organization The owner/organization of the repository
 * @param options For test purposes
*/
const fetchOrganizationRepos = async (organization: string, options?: any) => {

  let baseUrl = 'https://api.github.com';

  // Check for test purposes
  if(options?.serviceUnavailable && process.env.NODE_ENV !== 'production') {
    baseUrl = '';
  }

  const response = await axios.get(`${baseUrl}/orgs/${organization}/repos`, {
    headers: {
      'accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + process.env.GITHUB_ACCESS_TOKEN,
    },
    validateStatus: (status) => true,
  });

  return response;
}

export default fetchOrganizationRepos;