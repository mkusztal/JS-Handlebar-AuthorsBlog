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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  // optTagsListSelector = ".tag.list",
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
  console.log(customSelector);

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  // console.log(titleList);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
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

// GENERATE TAGS

function generateTags() {
  /* find all articles */
  const findArticles = document.querySelectorAll(optArticleSelector);
  console.log(findArticles);

  /* START LOOP: for every article: */
  for (let article of findArticles) {
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const tagsAttribute = article.getAttribute('data-tags');
    console.log('Tags: ', tagsAttribute);

    /* split tags into array */
    const articleTagsArray = tagsAttribute.split(' ');
    console.log('Tags array: ', articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkTagHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      /* add generated code to HTML variable */
      html += linkTagHTML;
    }
    /* END LOOP: for each tag */
    const tagList = article.querySelector(optArticleTagsSelector);
    tagList.innerHTML = html;
  }
  /* insert HTML of all the links into the tags wrapper */
  /* END LOOP: for every article: */
}

generateTags();

// TAG CLICK HANDLER

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  // const readTagClicked = document.querySelector(href);
  // readTagClicked.classList.add('active');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('Tag click handler: ', tag);

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tag of activeTags) {
    /* remove class active */
    tag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagSelector = clickedElement.getAttribute('href');
  const targetTag = document.querySelector(tagSelector);
  console.log(targetTag);

  /* START LOOP: for each found tag link */
  for (let tag of targetTag) {
    /* add class active */
    tag.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTags('[data-tags~="' + tag + '"]');
}

// ADD CLICK LISTENER TO TAGS

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

// GENERATE AUTHORS

function generateAuthors() {
  // find all articles
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    // find author of article
    const author = document.querySelector(optArticleAuthorSelector);
    console.log(author);

    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const articleAuthor = 'data-author';
    const authorAttribute = article.getAttribute(articleAuthor);
    console.log(authorAttribute);

    const findAuthorHTML = article.innerHTML;

    const linkAuthorHTML =
      '<li><a href"#">' +
      article +
      '"><span>' +
      findAuthorHTML +
      '</span></a></li>';
    html += linkAuthorHTML;

    author.innerHTML = html;
  }
}

generateAuthors();

// ADD CLICK HANDLER AUTHORS

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-name', '');
  console.tag(author);

  // remove active selector
  const activeAuthor = document.querySelectorAll(
    'a.active[href="author-name"]'
  );

  for (let activeClick of activeAuthor) {
    activeClick.classList.remove('active');
  }

  // add active to author selector
  const authorSelector = clickedElement.getAttribute('href');
  const targetAuthor = document.querySelector(authorSelector);

  for (let click of targetAuthor) {
    click.classList.add('active');
  }
}

// ADD CLICK LISTENER TO AUTHORS

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.list.authors span');

  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
