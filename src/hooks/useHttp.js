import { useState, useEffect, useCallback } from "react";

// helper-function, that wraps the http-request sending logic:
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
    // if response already contains some error-message - show it, but if not - show our generic hardcoded message.
  }
  return resData;
}

// custom hook:
export default function useHttp(url, config, initalData) {
  // requestConfig = object includes: url, config
  // later added another argument: initialData

  // state:
  const [data, setData] = useState(initalData); // success-case
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(); // fail-case

  // function which is updating a state based on sent request:
  // wrapping this function whith useCallback, to avoid infinite loop:
  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false); // here: not loading anymore
    },
    [url, config]
  ); // sendRequest function will be recreated only when it's dependencies change

  useEffect(() => {
    if (config && (config.method === "GET" || !config.method) || !config) {
      sendRequest();
    }
    // every GET-request in this app should be sent when the component containing it gets rendered;
    // if config-object is set/true and if method is GET, or if we have no method set, 
    // or if we have no config-object at all (it means default: GET-request) - we send request; 
    // otherwise we don't want to send it

  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest, // now every component which uses this custom-hook cna use sendRequest-function - exposed
  };
  // whatever component is using this custom-hook, it can get this object with data, isLoading and error-state
}
