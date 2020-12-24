import { dbService } from "blogFirebase.js";
import React, { useEffect, useState } from "react";
import PreviewArticle from "./PreviewArticle.js";

const PreviewArticles = ({ match, selectedCategory, setPostCount }) => {
  let dummyCount = 15;
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  const getArticles = async () => {
    setArticles([]);
    const dbArticles = await dbService.collection("posts").get();
    await dbArticles.forEach(article => {
      const aritlcleObject = {
        ...article.data(),
        id: article.id,
      };

      setArticles(prev => [aritlcleObject, ...prev]);
    });
  };

  const filterArticles = () => {
    setFilteredArticles(
      articles.filter(
        article =>
          article.postTypes[0] === selectedCategory ||
          "all" === selectedCategory
      )
    );
  };

  const countPostLength = () => {
    setPostCount(filteredArticles.length);
  };

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    setFilteredArticles(articles);
  }, [articles]);

  useEffect(() => {
    filterArticles();
  }, [selectedCategory]);

  useEffect(() => {
    countPostLength();
  }, [filteredArticles]);

  return (
    <div className="preview__articles">
      {filteredArticles.map(article => {
        return <PreviewArticle key={article.id} article={article} />;
      })}

      {[...Array(dummyCount - articles.length)].map((element, index) => {
        return (
          <div key={index} className="preview__article preview__dummy"></div>
        );
      })}
    </div>
  );
};

export default PreviewArticles;
