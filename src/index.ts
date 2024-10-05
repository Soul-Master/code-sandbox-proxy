import { getParameters } from 'codesandbox-import-utils/lib/api/define';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const targetUrl = new URL('https://codesandbox.io/api/v1/sandboxes/define');

// Iterate over all query parameters
for (const [key, value] of urlParams.entries()) {
  if (key === 'parameters') {
    // Decode, parse, and process the "parameters" field
    const decodedValue = decodeURIComponent(value);
    const parsedJSON = JSON.parse(decodedValue);
    const newParameters = getParameters(parsedJSON);
    targetUrl.searchParams.append('parameters', newParameters);
  } else {
    // Append other parameters as they are
    targetUrl.searchParams.append(key, value);
  }
}

window.location.href = targetUrl.href;