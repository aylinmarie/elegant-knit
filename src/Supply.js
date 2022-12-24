import React from "react";
import stylesheet from "./App.module.css";
import { useState, useEffect } from "react";

import Hero from"./components/Hero";

const query = `
{
  supplyCollection {
    items {
      supplyName
      link
      supplier
    } 
  }
}
` 

const Supply = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/` + process.env.REACT_APP_CONTENTFUL_SPACE_ID + `/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: `Bearer ` + process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        setPage(data.supplyCollection.items[0]);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  return (
    <div className={stylesheet.root}>
      <Hero title="Supplies" />
    </div>
  );
};

export default Supply;
