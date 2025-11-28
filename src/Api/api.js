const API_URL = "http://localhost:8080/api";

export const get = (url) => fetch(API_URL + url).then(res => res.json());

export const post = (url, body) =>
    fetch(API_URL + url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }).then(res => res.json());

export const put = (url, body) =>
    fetch(API_URL + url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }).then(res => res.json());

export const remove = (url) =>
    fetch(API_URL + url, {
        method: "DELETE"
    });
