import React, { useMemo } from "react";
import PreviewArticle from "./PreviewArticle.js";

const PreviewArticles = ({ match, articles, filteredArticles, error }) => {
  return (
    <>
      {error ? (
        <div className="error">{error}</div>
      ) : filteredArticles && filteredArticles.length === 0 ? (
        <div>게시글이 존재하지 않습니다</div>
      ) : (
        <div className="preview__articles">
          {filteredArticles &&
            filteredArticles.map(article => {
              return <PreviewArticle key={article.id} article={article} />;
            })}
        </div>
      )}
    </>
  );
};

export default PreviewArticles;
