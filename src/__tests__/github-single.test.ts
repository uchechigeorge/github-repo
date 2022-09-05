import app from '../app';
import request from 'supertest';

describe('GET /github/repo_info', () => {

  const baseUrl = '/github/repo-single';
  const token = process.env.ACCESS_TOKEN ?? '';

  it('get information about a repository', async ()  => {

    const res = await request(app)
    .get(baseUrl)
    .set('Authorization', token)
    .query({repo_name: 'facebook/react'});

    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toMatch(/json/);

  });

  it('invalid repository name', async () => {

    const res = await request(app)
    .get(baseUrl)
    .set('Authorization', token)
    .query({repo_name: 'facebook'});

    expect(res.statusCode).toEqual(400);
  });


  it('repo not found', async() => {
    const res = await request(app)
    .get(baseUrl)
    .set('Authorization', token)
    .query({repo_name: 'facebook/not-found'});

    expect(res.statusCode).toEqual(404);
  });


  it('unauthorized/invalid token', async() => {
    const res = await request(app)
    .get(baseUrl)
    .query({repo_name: 'facebook/react'});

    expect(res.statusCode).toEqual(401);

  });
 
  it('github api unavailable', async() => {
    const res = await request(app)
    .get(baseUrl)
    .set('Authorization', token)
    .query({repo_name: 'facebook/react', service: 'unavailable'});

    expect(res.statusCode).toEqual(500);

  });
  

});