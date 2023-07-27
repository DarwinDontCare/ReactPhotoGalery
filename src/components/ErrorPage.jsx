import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
  
    return (
      <div id="error-page" style={{position: "absolute", backgroundColor: "rgba(43, 43, 43, 0.979)", height: "100%", width: "100%", textAlign: "center"}}>
        <h1 style={{marginTop: "18%"}}>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
        <i>{error.statusText || error.message}</i>
        </p>
      </div>
    );
}
