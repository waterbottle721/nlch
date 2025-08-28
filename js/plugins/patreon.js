const fetch = require('isomorphic-fetch');
const { JsonApiDataStore } = require('jsonapi-datastore');
const { normalizeRequest, checkStatus, getJson, userAgentString } = require('./utils');

function patreon(accessToken) {
    let store = new JsonApiDataStore();

    const makeRequest = requestSpec => {
        const normalizedRequest = normalizeRequest(requestSpec);
        const url = normalizedRequest.url;
        const options = {
            ...normalizedRequest,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'User-Agent': userAgentString()
            },
            credentials: 'include'
        };
        let _response = undefined;

        return fetch(url, options)
            .then(response => {
                _response = response;
                return checkStatus(response);
            })
            .then(getJson)
            .then(rawJson => {
                store.sync(rawJson);
                return { store, rawJson, response: _response };
            })
            .catch(error => {
                return Promise.reject({ error, response: _response });
            });
    };

    makeRequest.getStore = () => store;

    makeRequest.setStore = newStore => {
        store = newStore;
    };

    return makeRequest;
}

module.exports = patreon; // 改为 `module.exports` 兼容 CommonJS
