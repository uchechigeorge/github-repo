import axios from "axios";

const fetchOrganizationRepos = async (organization: string, options?: any) => {

  let baseUrl = 'https://api.github.com';

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