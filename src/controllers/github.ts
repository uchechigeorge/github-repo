import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";


export const getRepoInfo = async (req: Request, res: Response) => {
  try {

    const repoName = req.query['repo_name'];
    const hasRepoName = repoName && repoName.toString().trim() !== '';

    console.log(req.query);
    const organisationName = req.query['organization'];
    const hasOrganisation = organisationName != null;
    const repoNames = req.query['repo_names'];
    const hasRepoNames = repoNames && repoNames.toString().trim() !== '';

    let result: any;

    // Has organisation param
    if(hasOrganisation) {

      const repoNameRes = await fetchOrganizationRepos(organisationName.toString());

      if(repoNameRes.status != 200) {
        res.status(repoNameRes.status).json('Invalid repository');
        return;
      }

      const reposArr = repoNameRes.data?.map(repo => {
        return {
          repoName: repo.full_name,
          description: repo.description,
          stars: repo.stargazers_count,
        };
      });

      result = reposArr
    } 
    
    // Has repos array
    else if(hasRepoNames) {

      const repos = repoNames.toString().split(',');

      const validRepos = repos.every(repo => {
        
        const owner = repo?.split('/')[0];
        const name = repo?.split('/')[1];

        return repo.split('/').length == 2 && owner && name;
      });

      if(!validRepos) {
        res.status(400).json({message: 'Invalid repo(s)'});
        return;
      }

      const reposArr = repos.map(repo => {
        return {
          owner: repo?.split('/')[0],
          name: repo?.split('/')[1],
        }
      });


      const repoResults: any[] = [];
      for(let i = 0; i < reposArr.length; i++) {
        const repo = reposArr[i];
        const repoNameRes = await fetchRepo(repo.owner, repo.name);

        if(repoNameRes.status != 200) {
          res.status(repoNameRes.status).json('Invalid repo(s)');
          break;
        }

        repoResults.push({
          repoName: repoNameRes.data.full_name,
          description: repoNameRes.data.description,
          stars: repoNameRes.data.stargazers_count,
        });
      }

      result = repoResults;
    }
 
    // Has repo name
    else {
      const owner = repoName?.toString().split('/')[0];
      const repo = repoName?.toString().split('/')[1];

      if(!hasRepoName) {
        res.status(400).json({message: 'Invalid request'});
        return;
      } else {
        if(!owner || !repo) {
          res.status(400).json({message: 'Invalid request'});
          return;
        }
      }
      
      const repoNameRes = await fetchRepo(owner ?? '', repo ?? '');
  
      if(repoNameRes.status != 200) {
        res.status(repoNameRes.status).json('Invalid repository');
        return;
      }
  
      const repoInfo: any = {
        repoName,
        description: repoNameRes.data.description,
        stars: repoNameRes.data.stargazers_count,
      };

      result = repoInfo;
    }

    res.status(200).json({message: 'OK', data: result});

  } catch(err: any) {
    res.status(500).json({message: err.message});
  }
}

const fetchRepo = async (owner: string, name: string) => {
  let response = await axios.get(`https://api.github.com/repos/${owner}/${name}`, {
    headers: {
      'accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + process.env.GITHUB_ACCESS_TOKEN,
    },
    validateStatus: (status) => true,
  });

  return response;
}

const fetchOrganizationRepos = async (organization: string) => {
  const response = await axios.get(`https://api.github.com/orgs/${organization}/repos`, {
    headers: {
      'accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + process.env.GITHUB_ACCESS_TOKEN,
    },
    validateStatus: (status) => true,
  });

  return response;
}