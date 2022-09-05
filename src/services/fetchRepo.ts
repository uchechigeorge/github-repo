import axios from "axios";

const fetchRepo = async (owner: string, name: string, options?: any) => {

  let baseUrl = 'https://api.github.com';

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