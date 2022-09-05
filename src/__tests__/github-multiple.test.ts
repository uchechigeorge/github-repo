import request from 'supertest';
import app from '../app';

describe('GET /repo-multiple', () => {

  const baseUrl = '/github/repo-multiple';
  const token = process.env.ACCESS_TOKEN ?? '';

  it('get organization repos', async () => {
    const res = await request(app)
    .get(baseUrl)
    .set('Authorization', token)
    .query({organization: 'facebook'});
    
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });
  
  it('invalid organization', async () => {
    const res = await request(app)
    .get(baseUrl)
    .set('Authorization', token)
    .query({organization: 'faceboo'});
    
    expect(res.statusCode).toEqual(404);
  });
  
  it('get repos', async() => {
    const res = await request(app)
    .get(baseUrl)
    .set('Authorization', token)
    .query({repo_names: 'facebook/react,facebook/react-native'});
    
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  it('invalid repo name in repo_names param', async () => {
    const res = await request(app)
    .get(baseUrl)
    .set('Authorization', token)
    .query({repo_names: 'facebook,angular'});

    expect(res.statusCode).toEqual(400);
  });

  it('unauthorized/invalid token', async() => {
    const res = await request(app)
    .get(baseUrl)
    .query({repo_names: 'facebook/react'});

    expect(res.statusCode).toEqual(401);

  });
  
  it('github api unavailable', async() => {
    const res = await request(app)
    .get(baseUrl)
    .set('Authorization', token)
    .query({organization: 'facebook/react', service: 'unavailable'});

    expect(res.statusCode).toEqual(500);

  });

});