import app from '../app';
import request from 'supertest';

describe('GET /github/repo_info', () => {

  it('get information about a repository', async ()  => {

    const res = await request(app)
    .get('/github/repo-info')
    .query({repo_name: 'facebook/react'});

    expect(res.statusCode).toEqual(200);

  });
});