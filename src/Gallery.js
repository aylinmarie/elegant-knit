import { useEffect, useState } from "react";
import axios from "axios";

import { Pagination, Stack, Checkbox, FormControlLabel } from "@mui/material";
import { Masonry } from "@mui/lab";

import { capitalize } from "./utility/capitalize";
import { sortAlphabetically } from "./utility/sortAlphabetically";
import stylesheet from "./Gallery.module.css";
import usePagination from "./components/Pagination/usePagination";
import Hero from "./components/Hero";


// Set this in local .env file
const usernameKey = process.env.REACT_APP_RAVELRY_USERNAME_KEY;
const passwordKey = process.env.REACT_APP_RAVELRY_PASSWORD_KEY;
const username = "aylinmarie";
const base = "https://api.ravelry.com";
const url = base + "/people/" + username + "/favorites/list.json";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [filterBy, setFilterBy] = useState([]);
  const [error, setError] = useState(null);
  let DESIGNERS = [];
  let TYPE = [];

  // Set filter for creators
  if (items) {
    DESIGNERS.push(items.map((item) => item.favorited?.designer?.name).filter(Boolean));
  }
  // const CREATORS = sortAlphabetically([...new Set(DESIGNERS[0])]);

  // Set filter for types
  if (items) {
    TYPE.push(items.map((item) => item.tag_list).filter(Boolean));
  }
  const TYPES = sortAlphabetically([...new Set(TYPE[0])]);

  // Filter patterns
  const updateFilter = (item) => {
    if (filterBy.includes(item)) {
      setFilterBy((prevValues) => prevValues.filter((v) => v !== item));
    } else {
      setFilterBy((prevValues) => [...prevValues, item]);
    }
  };

  // TO-DO: Refactor to be an AND conditional
  let FILTERED_ITEMS =
    filterBy.length > 0
      ? items.filter(
          (item) =>
            filterBy.includes(item.favorited.designer.name) ||
            filterBy.includes(item.tag_list)
        )
      : items;

  // Pagination
  let [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const count = Math.ceil(FILTERED_ITEMS.length / PER_PAGE);
  const _DATA = usePagination(FILTERED_ITEMS, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  // Fetch data
  useEffect(() => {
    axios(url, {
      auth: {
        username: usernameKey,
        password: passwordKey,
      },
    })
      .then((response, error) => {
        setItems(response.data.favorites);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  // If data cannot be retrieved, return error message
  if (error) {
    return error;
  }

  // Return patterns
  return (
    items && (
      <>
      <Hero title="Modern needlework patterns">
        Collection of minimal knit and crochet patterns.
      </Hero>

      <div className={stylesheet.wrapper}>
        <div>
          <h3>Patterns by Type</h3>
          {/* <fieldset className={stylesheet.filter}>
            <legend>Creators</legend>
            {CREATORS.map((creator) => {
              return (
                <FormControlLabel
                  key={creator}
                  label={capitalize(creator)}
                  control={
                    <Checkbox
                      size="small"
                      label={capitalize(creator)}
                      value={filterBy.includes(creator)}
                      onChange={() => updateFilter(creator)}
                    />
                  }
                />
              );
            })}
          </fieldset> */}
          <fieldset className={stylesheet.filter}>
            <legend className="visuallyHidden">Type</legend>
            {TYPES.map((type) => {
              return (
                type && (
                  <FormControlLabel
                    key={type}
                    label={capitalize(type)}
                    control={
                      <Checkbox
                        size="small"
                        value={filterBy.includes(type)}
                        onChange={() => updateFilter(type)}
                      />
                    }
                  />
                )
              );
            })}
          </fieldset>
        </div>
        
        <h2 className="visuallyHidden">Gallery of Knit Patterns</h2>
        <Stack spacing={6}>
          <Masonry columns={{ xs: 1, sm: 1, md: 2, lg: 3}} spacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
            {_DATA.currentData().map((item) => {
              return (
                item.type === "pattern" && item.favorited && item.favorited.designer && (
                  <a
                    key={item.favorited.name}
                    href={`https://www.ravelry.com/patterns/library/${item.favorited.permalink}`}
                    target="_blank"
                    rel="noreferrer"
                    className={stylesheet.link}
                  >
                    <div className={stylesheet.card}>
                      <img
                        src={item.favorited.first_photo?.medium2_url}
                        alt=""
                      />
                      <div className={stylesheet.copy}>
                        <p>{capitalize(item.favorited.name)}</p>
                        <p className={stylesheet.designer}>
                          <span className="visuallyHidden">Designer: </span>
                          {item.favorited.designer.name?.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </a>
                )
              );
            })}
          </Masonry>
          <Pagination
            className={stylesheet.pagination}
            count={count}
            onChange={handleChange}
            page={page}
            color="primary"
          />
        </Stack>
      </div>
      </>

    )
  );
};

export default Gallery;
