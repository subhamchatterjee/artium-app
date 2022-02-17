import { Routes, Route, BrowserRouter } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";

import TitleDetails from "../components/TitleDetails";

afterEach(() => {
  cleanup();
});

const TitleDetailsContainer = ({ defaultTitleDetails }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<TitleDetails defaultTitleDetails={defaultTitleDetails} />} />
      </Routes>
    </BrowserRouter>
  )
}

const titleData = {
  "year": "2011–2019",
  "type": "series",
  "image": "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg",
  "rating": 9.2,
  "plot": "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
  "genres": ["Action", "Adventure", "Drama"],
  "actors": ["Emilia Clarke", "Peter Dinklage", "Kit Harington"],
  "writers": ["David Benioff", "D.B. Weiss"],
  "_id": "620cf64c0505c84938ffbd45",
  "name": "Game of Thrones",
  "playTime": "57m"
}

test('Load the Details Page', () => {
  const titleDetailsContainer = render(
    <TitleDetailsContainer defaultTitleDetails={titleData} />
  );

  const titleDetails = screen.getByTestId('title-details');
  expect(titleDetails.firstChild).toHaveTextContent(titleData.name); // Has title name which is mandatory

  if(titleData.type) expect(titleDetails.firstChild).toHaveTextContent(titleData.type); // Has title name
  if(titleData.year) expect(titleDetails.firstChild).toHaveTextContent(titleData.year); // Has title year
  if(titleData.playTime) expect(titleDetails.firstChild).toHaveTextContent(titleData.playTime); // Has play-time
  if(titleData.rating) expect(titleDetails.firstChild.lastChild).toHaveTextContent(titleData.rating); // Has rating

  if(titleData.image) expect(titleDetails.lastChild.firstChild.getAttribute('src')).toBe(titleData.image); // Has image

  if(titleData?.genres?.[0]) expect(titleDetails.lastChild.lastChild).toHaveTextContent(titleData.genres[0]); // Has first genre
  if(titleData?.actors?.[1]) expect(titleDetails.lastChild.lastChild).toHaveTextContent(titleData.actors[1]); // Has second actor
  if(titleData?.writers?.[2]) expect(titleDetails.lastChild.lastChild).toHaveTextContent(titleData.writers[2]); // Has third writer

  if(titleData?.plot) expect(titleDetails.lastChild.lastChild).toHaveTextContent(titleData.plot); // Has plot
});