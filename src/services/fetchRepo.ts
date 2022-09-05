import axios from "axios";

/** 
 * Fetch repo from the Github api
 * @param owner The owner/organization of the repository
 * @param name The name of the repository
 * @param options For test purposes
*/
const fetchRepo = async (owner: string, name: string, options?: any) => {

  let baseUrl = 'https://api.github.com';

  // Check for test purposes
  if(options?.serviceUnavailable && process.env.NODE_ENV !== 'production') {
    baseUrl = '';
  }

  let response = await axios.get(`${baseUrl}/repos/${owner}/${name}`, {
    headers: {
      'accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + process.env.GITHUB_ACCESS_TOKEN,
    },
    validateStatus: (status) => true,
  });

  return response;
}

export default fetchRepo;