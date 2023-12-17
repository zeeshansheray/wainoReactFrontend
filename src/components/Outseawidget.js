import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const OutsetaLoginWidget = () => {
  useEffect(() => {
    // Your Outseta script here
    var o_login_options = {
      "id": "Outseta",
      "domain": "waino.outseta.com",
      "load": "auth",
      "auth": {
        "widgetMode": "login",
        "id": "login_embed",
        "mode": "embed",
        "selector": "#login-embed"
      }
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.outseta.com/outseta.min.js';
    script.dataset.options = JSON.stringify(o_login_options);
    script.async = true;

    document.getElementById('login-embed').appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.getElementById('login-embed').removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        {/* Add any additional meta tags or head elements here */}
      </Helmet>
      <div id="login-embed"></div>
    </>
  );
};

export default OutsetaLoginWidget;
