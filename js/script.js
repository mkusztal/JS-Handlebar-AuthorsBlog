'use strict';

const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  tagLink: Handlebars.compile(
    document.querySelector('#template-tag-link').innerHTML
  ),
  authorLink: Handlebars.compile(
    document.querySelector('#template-author-link').innerHTML
  ),
  authorListLink: Handlebars.compile(
    document.querySelector('#template-authorlist-link').innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector('#template-tagcloud-link').innerHTML
  ),
};

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  tagsListSelector: '.tags.list',
  articleAuthorSelector: '.post-author',
  authorsListSelector: '.authors.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size',
};

const titleClickHandler = function (event) {
  console.log('Link was clicked!');
  event.preventDefault();
  const clickedElement = this;

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');

  /* find the correct article using the selector (value of 'href' attribute) */
  const findArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */
  findArticle.classList.add('active');
};

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(
    opts.articleSelector + customSelector
  );
  let html = '';

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitleElement = article.querySelector(opts.titleSelector);

    /* get the title from the title element */
    const articleTitle = articleTitleElement.innerHTML;

    /* create HTML of the link */
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */
    html += linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

// CalculateTagsParams
function calculateTagsParams(tags) {
  const params = { min: 9999, max: 0 };
  for (let tag in tags) {
    params.min = Math.min(tags[tag], params.max);
    params.max = Math.max(tags[tag], params.max);
  }

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
  }

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagsClass(count, params) {
  const normalizedCound = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCound / normalizedMax;
  const classNumber = Math.floor(percentage * (opts.CloudClassCount - 1) + 1);
  return opts.CloudClassPrefix + '-' + classNumber;
}

// GENERATE TAGS
function generateTags() {
  //create a new variable allTags with an empty array
  let allTags = {};

  /* find all articles */
  const findArticles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */
  for (let article of findArticles) {
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const tagsAttribute = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = tagsAttribute.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkTagHTMLData = { tag: tag };
      const tagHTML = templates.tagLink(linkTagHTMLData);
      /* add generated code to HTML variable */
      html += tagHTML;
      // check if this link is not already in allTags
      if (!allTags[tag]) {
        // add tag to allTags object
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    const tagArticleList = article.querySelector(opts.articleTagsSelector);
    tagArticleList.innerHTML = html;
    /* END LOOP: for every article: */
  }

  // right column
  const allTagsData = { tags: [] };

  const tagList = document.querySelector(opts.tagsListSelector);
  const tagsParams = calculateTagsParams(allTags);

  // START LOOP: for each tag in allTags
  for (let tag in allTags) {
    //generate code of a link and add it to allTagsHTML
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagsClass(allTags[tag], tagsParams),
    });
    // END LOOP: for each tag in allTags:
  }

  // add HTML from allTagsHTML to tagList
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData: ', allTagsData);
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

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tag of activeTags) {
    /* remove class active */
    tag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href^="#tag-' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tag of tagLinks) {
    /* add class active */
    tag.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
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

  /* ARTICLE FILTER FOR TAGS LIST*/
  const tagLinksList = document.querySelectorAll('.list.tags a');
  /* START LOOP: for each link */
  for (let tagLink of tagLinksList) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

// GENERATE AUTHORS

function generateAuthors() {
  let allAuthors = {};
  // find all articles
  const articles = document.querySelectorAll(opts.articleSelector);

  // START LOOP: for every article
  for (let article of articles) {
    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    const authorHTMLData = { author: articleAuthor };
    const authorHTML = templates.authorLink(authorHTMLData);

    html = html + '' + authorHTML;

    if (!allAuthors[articleAuthor]) {
      //add generated code to allTags array
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    const authorName = article.querySelector(opts.articleAuthorSelector);
    authorName.innerHTML = html;

    // END LOOP: for every article
  }

  // find list of authors in right column
  const authorList = document.querySelector(opts.authorsListSelector);

  // generate all links html
  const allAuthorsData = { allAuthors: [] };

  // START LOOP: for each author in allAuthors
  for (let author in allAuthors) {
    // generate code of a link
    allAuthorsData.allAuthors.push({
      author: author,
    });

    // END LOOP: for each author in allAuthors
  }
  // add html from allAuthors to authorList
  authorList.innerHTML = templates.authorListLink(allAuthorsData);
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

  const author = href.replace('#author-', '');

  // remove active selector
  const activeAuthor = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeClick of activeAuthor) {
    activeClick.classList.remove('active');
  }

  const targetAuthor = document.querySelectorAll(
    'a[href^="#author-' + href + '"]'
  );

  for (let click of targetAuthor) {
    click.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

// ADD CLICK LISTENER TO AUTHORS

function addClickListenersToAuthors() {
  // find all authors
  const authorLinks = document.querySelectorAll('.post-author a');
  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }

  const authorListLinks = document.querySelectorAll('.list.authors a');

  for (let authorLink of authorListLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
