export async function fetchData(url = '') {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


export async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json(); // parses JSON response into native JavaScript objects
}