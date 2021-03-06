import CONF from './config';

export const handleResponse = (response) => {
	if (response.status === 401) {
		store.dispatch({
			type: UNAUTHORIZED,
			payload: true,
		});
		return Promise.reject('You should login');
	}
	const json = response.json();
	return response.ok ? json : json
	.then(err => Promise.reject(err.message));
};

export const addWord = (body) => {
	var headers = new Headers();
	headers.append('cache-control', 'no-cache');
	headers.append('Content-Type', 'application/json');
	return fetch(`${CONF.API_URL}/vocabulary`,{
		headers: headers,
		body: JSON.stringify(body),
		method: "POST"
	})
	.then(response => handleResponse(response))
	.catch(error => Promise.reject(error));
};

export const getWordList = () => {
	var headers = new Headers();
	headers.append('cache-control', 'no-cache');
	headers.append('Content-Type', 'application/json');
	return fetch(`${CONF.API_URL}/vocabulary`,{
		headers: headers,
		method: "GET"
	})
	.then(response => handleResponse(response))
	.catch(error => Promise.reject(error));
};

export const updatWord = (id, body) => {
	var headers = new Headers();
	headers.append('cache-control', 'no-cache');
	headers.append('Content-Type', 'application/json');
	return fetch(`${CONF.API_URL}/vocabulary/${id}`,{
		headers: headers,
		body: JSON.stringify(body),
		method: "PUT"
	})
	.then(response => handleResponse(response))
	.catch(error => Promise.reject(error));
};

export const deleteWord = (id) => {
	var headers = new Headers();
	headers.append('cache-control', 'no-cache');
	headers.append('Content-Type', 'application/json');
	return fetch(`${CONF.API_URL}/vocabulary/${id}`,{
		headers: headers,
		method: "DELETE"
	})
	.then(response => handleResponse(response))
	.catch(error => Promise.reject(error));
};

/*

fetch('http://localhost:3012/vocabulary', {
	method: 'post',
	headers: {
		'Accept': 'application/json, text/plain',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({en, ru, setName})
}).then(res=>res.json())
.then(res => console.log(res));
}
*/
/*Question*/

export const addQuestion = (body) => {
	var headers = new Headers();
	headers.append('cache-control', 'no-cache');
	headers.append('Content-Type', 'application/json');
	return fetch(`${CONF.API_URL}/question`,{
		headers: headers,
		body: JSON.stringify(body),
		method: "POST"
	})
	.then(response => handleResponse(response))
	.catch(error => Promise.reject(error));
};

export const getQuestionList = () => {
	var headers = new Headers();
	headers.append('cache-control', 'no-cache');
	headers.append('Content-Type', 'application/json');
	return fetch(`${CONF.API_URL}/question`,{
		headers: headers,
		method: "GET"
	})
	.then(response => handleResponse(response))
	.catch(error => Promise.reject(error));
};

export const updateQuestion = (id, body) => {
	var headers = new Headers();
	headers.append('cache-control', 'no-cache');
	headers.append('Content-Type', 'application/json');
	return fetch(`${CONF.API_URL}/question/${id}`,{
		headers: headers,
		body: JSON.stringify(body),
		method: "PUT"
	})
	.then(response => handleResponse(response))
	.catch(error => Promise.reject(error));
};

export const getQuestionListBySubject = (subject) => {
	var headers = new Headers();
	headers.append('cache-control', 'no-cache');
	headers.append('Content-Type', 'application/json');
	return fetch(`${CONF.API_URL}/subject/${subject}/question`,{
		headers: headers,
		method: "GET"
	})
	.then(response => handleResponse(response))
	.catch(error => Promise.reject(error));
};

export const deleteQuestion = (id) => {
	var headers = new Headers();
	headers.append('cache-control', 'no-cache');
	headers.append('Content-Type', 'application/json');
	return fetch(`${CONF.API_URL}/question/${id}`,{
		headers: headers,
		method: "DELETE"
	})
	.then(response => handleResponse(response))
	.catch(error => Promise.reject(error));
};