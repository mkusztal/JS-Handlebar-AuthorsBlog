const titleClickHandler = function (event) {
  console.log('Link was clicked!');
  event.preventDefault();
  const clickedElement = this;

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  // console.log(activeLinks);

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');
  // console.log(activeArticles);

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');

  /* find the correct article using the selector (value of 'href' attribute) */
  const findArticle = document.querySelector(articleSelector);
  // console.log(findArticle);
  /* add class 'active' to the correct article */
  findArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  // console.log(titleList);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    // console.log(articleId);

    /* find the title element */
    const articleTitleElement = article.querySelector(optTitleSelector);
    // console.log(articleTitleElement);

    /* get the title from the title element */
    const articleTitle = articleTitleElement.innerHTML;
    // console.log(articleTitle);

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
      // console.log(linkHTML);

    /* insert link into titleList */
    html += linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  // console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){

  const optArticleTagsSelector = '.post-tags .list';

  /* find all articles */
  const findArticles = document.querySelectorAll(optArticleTagsSelector);
  console.log(findArticles);
  /* START LOOP: for every article: */
  for(let article of findArticles){

    /* find tags wrapper */
    const findTagsWrapper = document.querySelector('.wrapper');
    // console.log(findTagsWrapper);
    
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = '.news .design .tutorial';
    const tagsAttribute = article.getAttribute(articleTags)

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    const articleTagTitle = findArticles.innerHTML;
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkTagHTML =
      '<li><a href="#' +
      articleTags +
      '"><span>' +
      articleTagTitle +
      '</span></a></li>';
      /* add generated code to HTML variable */
      html += linkTagHTML;
    }
    /* END LOOP: for each tag */

  }
    /* insert HTML of all the links into the tags wrapper */
    findArticles.innerHTML = html;
  /* END LOOP: for every article: */
}

generateTags();
