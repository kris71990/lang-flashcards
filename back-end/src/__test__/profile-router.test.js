'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createAccountMock } from './lib/account-mock';
import { removeProfileMock, createProfileMock } from './lib/profile-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Profile Router Tests', () => {
  beforeAll(startServer);
  afterEach(removeProfileMock);
  afterAll(stopServer);

  describe('POST /profile', () => {
    test('POST profile correctly should return profile', () => {
      return createAccountMock()
        .then((accountMock) => {
          return superagent.post(`${API_URL}/profile`)
            .set('Authorization', `Bearer ${accountMock.token}`)
            .send({
              name: 'name',
            })
            .then((res) => {
              expect(res.status).toEqual(200);
              expect(res.body).toBeTruthy();
              expect(res.body.name).toEqual('name');
              expect(res.body.languages).toHaveLength(0);
            });
        });
    });

    test('POST profile that already exists returns 409', () => {
      return createProfileMock()
        .then((profileMock) => {
          return superagent.post(`${API_URL}/profile`)
            .set('Authorization', `Bearer ${profileMock.accountSetMock.token}`)
            .send({
              name: 'kris',
            });
        })
        .catch((err) => {
          expect(err.status).toEqual(409);
          expect(err.body).toBeFalsy();
        });
    });

    test('POST profile without credentials returns unauthorized 401', () => {
      return superagent.post(`${API_URL}/profile`)
        .send({
          name: 'name',
        })
        .catch((err) => {
          expect(err.status).toEqual(401);
          expect(err.body).toBeFalsy();
        });
    });
  });

  describe('GET /profile/me', () => {
    test('GET profile with token returns profile', () => {
      return createProfileMock()
        .then((profileMock) => {
          return superagent.get(`${API_URL}/profile/me`)
            .set('Authorization', `Bearer ${profileMock.accountSetMock.token}`)
            .then((res) => {
              expect(res.status).toEqual(200);
              expect(res.body).toBeTruthy();
              expect(res.body.id).toEqual(profileMock.profile.id);
              expect(res.body.name).toEqual(profileMock.profile.name);
              expect(res.body.languages).toHaveLength(0);
              expect(res.body.createdAt).toBeTruthy();
              expect(res.body.updatedAt).toBeTruthy();
            });
        });
    });

    test('GET profile without credentials returns 401', () => {
      return superagent.get(`${API_URL}/profile/me`)
        .catch((err) => {
          expect(err.status).toEqual(401);
          expect(err.body).toBeFalsy();
        });
    });

    test('GET profile when no profile exists returns 404', () => {
      return createAccountMock()
        .then((accountMock) => {
          return superagent.get(`${API_URL}/profile/me`)
            .set('Authorization', `Bearer ${accountMock.token}`);
        })
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err.body).toBeFalsy();
        });
    });
  });

  describe('PUT /profile/:id', () => {
    test('PUT returns updated profile', () => {
      let profileMock;
      return createProfileMock()
        .then((profileSetMock) => {
          profileMock = profileSetMock;
          return superagent.put(`${API_URL}/profile/${profileMock.profile.id}`)
            .set('Authorization', `Bearer ${profileMock.accountSetMock.token}`)
            .send({
              name: 'bleh',
            });
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toBeTruthy();
          expect(res.body.name).toEqual('bleh');
          expect(res.body.id).toEqual(profileMock.profile.id);
          expect(res.body.accountId).toEqual(profileMock.accountSetMock.account.id);
        });
    });

    test('PUT returns profile if not updated', () => {
      return createProfileMock()
        .then((profileMock) => {
          return superagent.put(`${API_URL}/profile/${profileMock.profile.id}`)
            .set('Authorization', `Bearer ${profileMock.accountSetMock.token}`)
            .then((res) => {
              expect(res.status).toEqual(200);
              expect(res.body).toBeTruthy();
              expect(res.body.name).toEqual(profileMock.profile.name);
              expect(res.body.id).toEqual(profileMock.profile.id);
              expect(res.body.accountId).toEqual(profileMock.accountSetMock.account.id);
            });
        });
    });

    test('PUT without credentials returns unauthorized (401)', () => {
      return createProfileMock()
        .then((profileMock) => {
          return superagent.put(`${API_URL}/profile/${profileMock.profile.id}`)
            .catch((err) => {
              expect(err.status).toEqual(401);
              expect(err.body).toBeFalsy();
            });
        });
    });

    test('PUT without profile id returns 404', () => {
      return superagent.put(`${API_URL}/profile/`)
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err.body).toBeFalsy();
        });
    });
  });
});
