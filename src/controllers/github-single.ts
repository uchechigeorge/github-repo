import { Request, Response } from "express";
import fetchRepo from "../services/fetchRepo";


export const getSingleRepo = async (req: Request, res: Response) => {
  try {

    const repoName = req.query['repo_name'];
    const hasRepoName = repoName && repoName.toString().trim() !== '';
    let result: any;

    // Split repo name into owner and name fields
    const owner = repoName?.toString().split('/')[0];
    const repo = repoName?.toString().split('/')[1];
    
    // Check if repo is valid
    if(!hasRepoName) {
      res.status(400).json({message: 'Invalid request'});
      return;
    } else {
      if(!owner || !repo) {
        res.status(400).json({message: 'Invalid request'});
        return;
      }
    }

    // Fetch repos
    const repoNameRes = await fetchRepo(owner ?? '', repo ?? '', {
      serviceUnavailable: req.query['service'] === 'unavailable'
    });

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

    res.status(200).json({message: 'OK', data: result});

  } catch(err: any) {
    res.status(500).json({message: err.message});
  }
}