import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const respone = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await respone.json();

    if (!respone.ok) throw new Error(`${data.message} (${respone.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchURL = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //to tell the api that the content will be in json format
      },
      body: JSON.stringify(uploadData),
    });
    const respone = await Promise.race([fetchURL, timeout(TIMEOUT_SEC)]);
    const data = await respone.json();

    if (!respone.ok) throw new Error(`${data.message} (${respone.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
