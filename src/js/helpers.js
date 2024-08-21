import { REQUEST_TIMEOUT_SECONDS } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const AJAXCall = async function (url, postData = undefined) {
    try {
        const fetchPromise = postData ? fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        }) : fetch(url);

        const response = await Promise.race([fetchPromise, timeout(REQUEST_TIMEOUT_SECONDS)]);
        const json = await response.json();

        if (!response.ok) {
            const { message, errorMessage } = json;
            throw new Error(message || errorMessage);
        };

        return json;
    } catch (err) {
        throw err;
    };
};