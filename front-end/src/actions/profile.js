import superagent from 'superagent';

const setProfile = profile => ({
  type: 'PROFILE_SET',
  payload: profile,
});

const createProfileReq = username => (store) => {
  const { auth: token } = store.getState();

  return superagent.post(`${API_URL}/profile`)
    .set('Authorization', `Bearer ${token}`)
    .send(username)
    .then((res) => {
      return store.dispatch(setProfile(res.body));
    });
};

const updateProfileReq = profile => (store) => {
  const { auth: token } = store.getState();

  return superagent.put(`${API_URL}/profile/${profile._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(profile)
    .then((res) => {
      return store.dispatch(setProfile(res.body));
    });
};

const fetchProfileReq = () => (store) => {
  const { auth: token } = store.getState();

  return superagent.get(`${API_URL}/profile/me`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return store.dispatch(setProfile(res.body));
    });
};

export {
  setProfile,
  fetchProfileReq,
  createProfileReq,
  updateProfileReq,
};
