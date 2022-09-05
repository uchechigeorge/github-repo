import { Request, Response } from "express";
import fetchOrganizationRepos from "../services/fetchOrgRepos";
import fetchRepo from "../services/fetchRepo";

/**
 * Get multiple repo controller
 */
export const getMultipleRepos = async (req: Request, res: Response) => {
  try{

    // Get params
    const organisationName = req.query['organization'];
    const hasOrganisation = organisationName != null;
    const repoNames = req.query['repo_names'];
    const hasRepoNames = repoNames && repoNames.toString().trim() !== '';

    let result: any;

    // If no params to work with
    if(!hasOrganisation && !hasRepoNames) {
      res.status(400).json({message: 'Invalid request'});
      return;
    }

    // Has organisation param
    if(hasOrganisation) {

      // Fetch repos from organisation/owner
      const repoNameRes = await fetchOrganizationRepos(organisationName.toString(), {
        serviceUnavailable: req.query['service'] === 'unavailable',
      });

      // If invalid repo
      if(repoNameRes.status != 200) {
        res.status(repoNameRes.status).json({message: repoNameRes.statusText});
        return;
      }

      // Transform repo data
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

      // Check if repo names are valid
      const validRepos = repos.every(repo => {
        
        const owner = repo?.split('/')[0];
        const name = repo?.split('/')[1];

        return repo.split('/').length == 2 && owner && name;
      });

      if(!validRepos) {
        res.status(400).json({message: 'Invalid repo(s)'});
        return;
      }

      // Transform repo names into owner and name properties
      const reposArr = repos.map(repo => {
        return {
          owner: repo?.split('/')[0],
          name: repo?.split('/')[1],
        }
      });


      // Fetch repos
      const repoResults: any[] = [];
      for(let i = 0; i < reposArr.length; i++) {
        const repo = reposArr[i];
        const repoNameRes = await fetchRepo(repo.owner, repo.name);

        if(repoNameRes.data?.id) {
          repoResults.push({
            repoName: repoNameRes.data.full_name,
            description: repoNameRes.data.description,
            stars: repoNameRes.data.stargazers_count,
          });
        }
      }

      result = repoResults;
    }
 

    res.status(200).json({message: 'OK', result});

  } catch(err: any) {
    res.status(500).json({message: err.message});
  }
}