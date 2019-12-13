const settings =  {  
    headers: { },
    baseURL: ""
}

function isString (value) {
    return typeof value === 'string' || value instanceof String;
}

function getHeaders(body, headers) {
    const result = Object.assign({}, settings.headers, headers);  
    if(body && !result["Content-Type"] && !isString(body)) {
        result["Content-Type"] = "application/json";
    }
    return result;
}

function getParams(data) {
    return Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + 
            (data[k] !== undefined && data[k] !== null ? encodeURIComponent(data[k]) : "")    
    }).join('&');
}

function fetchPromise(url, method, obj, headers) {
    const promise = new Promise((resolve, reject) => {
        const query = settings.baseURL + url;
        const body = isString(obj) ? obj : JSON.stringify(obj);
        const allHeaders = getHeaders(obj, headers);

        fetch(query, {
            method: method,
            headers: allHeaders,
            body: body
        })

        .then(response => {
            const contentType = response.headers.get("content-type")
            const status = response.status;
            const statusText = response.statusText;
            let content;      
            if (contentType && contentType.indexOf("application/json") !== -1) {
                content = response.json();
            } else {
                content = response.text();
            }
            
            if(status < 400) {
                return content.then(data => 
                    resolve({
                        data,
                        status,
                        contentType,
                        statusText
                    }));
            } else {
                return reject({
                    status,
                    statusText
                })
            }
        })
        .catch(error => {
            reject(error);
        });
    });

    return promise;
}

export default {
    query(url, params) {
        const query = url + (params ? "?" + getParams(params) : "");  
        return settings.baseURL + query;
    },
    get(url, params, headers) {
        const query = url + (params ? "?" + getParams(params) : "");  
        return fetchPromise(query, 'get', undefined, headers);      
    },
    post(url, params, obj, headers) {
        const query = url + (params ? "?" + getParams(params) : "");  
        return fetchPromise(query, 'post', obj, headers);
    },
    put(url, params, obj, headers) {
        const query = url + (params ? "?" + getParams(params) : "");  
        return fetchPromise(query, 'put', obj, headers);
    },  
    delete(url, params, headers) {
        const query = url + (params ? "?" + getParams(params) : "");  
        return fetchPromise(query, 'delete', undefined, headers);      
    },
    upload(url, file, onProgress, onStart) {
        const mainPromise = new Promise((mainResolve, mainReject) => {
            try {
                const xhr = new XMLHttpRequest();
                if(onStart) {
                    xhr.upload.addEventListener("loadstart", onStart, false);  
                }
                if(onProgress) {
                    xhr.upload.addEventListener("progress", onProgress, false);  
                }
                
                // xhr.upload.addEventListener("load", (response) => {
                //     console.log(xhr.status);
                // }, false);
                
                const loadPromise = new Promise((resolve, reject) => {
                    xhr.upload.addEventListener("loadend", resolve, false);
                    xhr.upload.addEventListener("error", reject, false);
                    xhr.upload.addEventListener("abort", reject, false);    
                });

                xhr.onreadystatechange = function () {
                    if (this.readyState === XMLHttpRequest.DONE) {
                        loadPromise.then(() => {
                            if(this.status < 400) {
                                mainResolve(this);
                            } else {
                                mainReject({ responseText: this.responseText, statusText: this.statusText, status: this.status });
                            }    
                        }).catch((error) => {
                            mainReject(error);
                        });  
                    }
                }    

                const formData = new FormData();
                formData.append('file', file);

                const query = settings.baseURL + url;
                xhr.open("POST", query);
                xhr.send(formData);
                
            } catch (error) {
                mainReject(error);
            }
        });
        return mainPromise;
    },
    settings: settings,
};
