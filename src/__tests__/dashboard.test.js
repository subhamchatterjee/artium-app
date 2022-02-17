import { Routes, Route, BrowserRouter } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";

import Dashboard from "../components/Dashboard";

afterEach(() => {
  cleanup();
});

describe('Renders the Dashboard', () => {
  test('Check if Search showing', () => {
    render(<Dashboard defaultTitles={[]} />);
    const searchText = screen.getByText('Search');
    expect(searchText).toBeInTheDocument();
  });

  test('Check if Search Container showing', () => {
    render(<Dashboard defaultTitles={[]} />);
    const searchContainer = screen.getByTestId('search-container');
    expect(searchContainer).toBeInTheDocument();
  });

  test('Check if Loading called once', () => {
    render(<Dashboard defaultTitles={[]} />);
    const loadingElem = screen.getByText('Loading');
    expect(loadingElem).toBeInTheDocument();
  });

  test('Check if Title loaded', () => {
    let titles = [
      {
        name: "Game of Thrones",
        year: "2011–2019",
        type: "series",
        image: "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg",
        rating: 9.2,
        plot: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
        genres: ["Action", "Adventure", "Drama"],
        actors: ["Emilia Clarke", "Peter Dinklage", "Kit Harington"],
        playTime: '57m',
        writers: ['David Benioff', 'D.B. Weiss']
      }, {
        name: "Iron Man",
        year: "2008",
        type: "movie",
        image: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
        rating: 7.9,
        plot: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
        genres: ['Action', 'Adventure', 'Sci-Fi'],
        actors: ['Robert Downey Jr.','Gwyneth Paltrow','Terrence Howard'],
        playTime: "2h 6m",
        writers: ['Mark Fergus','Hawk Ostby','Art Marcum']
      }
    ];

    render (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Dashboard defaultTitles={titles} />} />
        </Routes>
      </BrowserRouter>
    );
    const titlesContainer = screen.getByTestId('titles');
    expect(titlesContainer).toBeInTheDocument();

    // Check Dashboard has both titles
    const titleContainer1 = screen.getByTestId('title-container-0'),
      titleContainer2 = screen.getByTestId('title-container-1');

    expect(titleContainer1).toBeInTheDocument();
    expect(titleContainer1).toHaveTextContent(titles[0].name); // Check title name is present
    
    const linkToTest = screen.getByTitle(titles[1].name); // Select link element with the title name
    expect(linkToTest.getAttribute("href")).toBe('/title/' + titles[1]._id); // Check if the link has correct redirect url
  });
});