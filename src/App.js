import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import './App.css';
import MovieRow from './components/MovieRow/MovieRow';
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie";
import Header from "./components/Header/Header";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(()=>{
    const loadAll = async () => {
      // Pegando a lista TOTAL

      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

    }

    loadAll();
  }, []);

useEffect(()=>{
  const scrollListener = () => {
    if(window.scrollY > 10){
      setBlackHeader(true)
    }
    else {
      setBlackHeader(false)
    }
  }

  window.addEventListener('scroll', scrollListener);
  return () => {
    window.removeEventListener('scroll', scrollListener);
  }
}, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} /> 
      }

      <section className="lists">
        {movieList.map((item, key)=>{
          return <MovieRow key={key} title={item.title} items={item.items} />
        })}
      </section>   

      <footer>
        <p>Feito por <a href="https://github.com/OliveiraEK"> Erik </a></p> <br/>
        Direitos de imagem para <a>Netflix</a> e 
        dados pegos do site <a className="link2">Themoviedb.org</a>.
      </footer>


      {movieList.length <=0 &&
      <div className="loading">
        <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt="carregando" />
      </div>
    }
    </div>
  );
}


