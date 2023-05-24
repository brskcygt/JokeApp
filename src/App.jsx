import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: between;
  height: 100%;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  alignt-items: center;
`;

const JokerText = styled.a`
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 100px;
  margin-right: 20px;
  transition: all 300ms;
  cursor: pointer;
  letter-spacing: 0.8rem;
  color: rgb(45, 45, 214);
  font-weight: 700;

  &:hover {
    color: purple;
    scale: 1.2;
    transform: rotate(5deg);
    text-shadow: -1px -1px 0px #000, 0px -1px 0px #000, 1px -1px 0px #000,
      -1px 0px 0px #000, 1px 0px 0px #000, -1px 1px 0px #000, 0px 1px 0px #000,
      1px 1px 0px #000;
    transition: all 300ms;
  }
`;

const JokerFace = styled.img`
  width: 200px;
  height: 200px;
  transition: scale 300ms;

  &:hover {
    scale: 1.1;
    transform: rotate(720deg);
    transition: all 1s;
    cursor: pointer;
  }
`;

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const SearchBar = styled.input`
  width: 300px;
  height: 30px;
  margin-right: 20px;
  background: white;
  border: none;
  border-radius: 10px;
  color: black;
  font-size: 24px;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

const SubmitBtn = styled.button`
  width: 100px;
  height: 40px;
  background: purple;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Jokes = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const Joke = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  
`;

const JokeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  width: 1000px;
  height: 200px;
  background: white;
  color: black;
  border:none;
  border-radius:20px 20px 0 0;
`;

const JokeCategory = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  justify-content: space-between;
  width: 1000px;
  height: 50px;
  background: purple;
  font-size: 1.2rem;
`;

const ErrorText = styled.p`
  font-size:24px;
  color:black;
`;

function App() {
  const [jokes, setJokes] = useState([]);
  const [error,setError] = useState(false);
  const [search,setSearch] = useState("");

  const fetchJokes = async () => {
    const { data } = await axios.get(
      `https://v2.jokeapi.dev/joke/${search}?amount=10`
    );

    if (!data.error) {
      setJokes(data.jokes);
      setError(false);
    }else{
      setJokes([]);
      setError(true);
    }
  };

  return (
    <Container>
      <Navbar>
        <JokerText>Joker</JokerText>
        <JokerFace src="../Joker.png"></JokerFace>
      </Navbar>
      <Search>
        <SearchBar onChange={(e)=>setSearch(e.target.value)}/>
        <SubmitBtn onClick={fetchJokes}>Submit</SubmitBtn>
      </Search>
      <Jokes>
        {!error ? jokes.map((joke) => (
          <Joke key={joke.id}>
            <JokeContent>
              <div style={{marginRight:"50px"}}>{joke.setup || joke.joke}</div>
              <div>{joke.delivery}</div>
            </JokeContent>
            <JokeCategory>
              <div>{joke.category}</div>
              <div>{joke.type}</div>
            </JokeCategory>
          </Joke>
        )):(<ErrorText>Sorry no jokes found! Try "Programming, Misc, Dark, Pun, Spooky, Christmas</ErrorText>)}
      </Jokes>
    </Container>
  );
}

export default App;
