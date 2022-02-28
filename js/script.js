const titleClickHandler = function (event) {
  console.log('Link was clicked!');
  event.preventDefault();
  const clickedElement = this;

  // const templates = {
  //   artcleLink: Handlebars.compile(
  //     document.querySelector('#template-article-link').innerHTML
  //   ),
  //   tagLink: Handlebars.compile(
  //     document.querySelector('template-tag-link').innerHTML
  //   ),
  //   authorLink: Handlebars.compile(
  //     document.querySelector('template-author-link').innerHTML
  //   ),
  //   tagCloudLink: Handlebars.compile(
  //     document.querySelector('template-tagcloud-link').innerHTML
  //   ),
  //   authorListLin: Handlebars.compile(
  //     document.querySelector('template-authorlist-link').innerHTML
  //   ),
  // };

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

const opts = {
  ArticleSelector: '.post',
  TitleSelector: '.post-title',
  TitleListSelector: '.titles',
  ArticleTagsSelector: '.post-tags .list',
  TagsListSelector: '.tag.list',
  ArticleAuthorSelector: '.post-author',
  CloudClassCount: 5,
  CloudClassPrefix: 'tag-size',
};

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(opts.TitleListSelector);
  // console.log(titleList);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(
    opts.ArticleSelector + customSelector
  );
  let html = '';

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    // console.log(articleId);

    /* find the title element */
    const articleTitleElement = article.querySelector(opts.TitleSelector);
    // console.log(articleTitleElement);

    /* get the title from the title element */
    const articleTitle = articleTitleElement.innerHTML;

    /* create HTML of the link */
    //const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>'; //templates.artcleLink(linkHTMLData);
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

// // CalculateTagsParams
// function calculateTagsParams(tags) {
//   const params = { min: 9999, max: 0 };
//   for (let tag in tags) {
//     params.min = Math.min(tags[tag], params.max);
//     params.max = Math.max(tags[tag], params.max);
//   }

//   for (let tag in tags) {
//     console.log(tag + ' is used ' + tags[tag] + ' times');
//     if (tags[tag] > params.max) {
//       params.max = tags[tag];
//     }
//   }

//   for (let tag in tags) {
//     console.log(tag + ' is used ' + tags[tag] + ' times');
//     if (tags[tag] < params.min) {
//       params.min = tags[tag];
//     }
//   }

//   return params;
// }

// function calculateTagsClass(count, params) {
//   const normalizedCound = count - params.min;
//   const normalizedMax = params.max - params.min;
//   const percentage = normalizedCound / normalizedMax;
//   const classNumber = Math.floor(percentage * (opts.CloudClassCount - 1) + 1);
//   return opts.CloudClassPrefix + classNumber;
// }

// GENERATE TAGS
function generateTags() {
  //create a new variable allTags with an empty array
  let allTags = {};

  /* find all articles */
  const findArticles = document.querySelectorAll(opts.ArticleSelector);
  console.log(findArticles);

  /* START LOOP: for every article: */
  for (let article of findArticles) {
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const tagsAttribute = article.getAttribute('data-tags');
    // console.log('Tags: ', tagsAttribute);

    /* split tags into array */
    const articleTagsArray = tagsAttribute.split(' ');
    // console.log('Tags array: ', articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkTagHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      /* add generated code to HTML variable */
      html += linkTagHTML;
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
    const tagArticleList = article.querySelector(opts.ArticleTagsSelector);
    tagArticleList.innerHTML = html;
    /* END LOOP: for every article: */
  }

  //const allTagsData = { tags: [] };

  //const tagsParams = calculateTagsParams(allTags);
  //console.log('tagParams: ', tagsParams);

  const tagList = document.querySelector(opts.TagsListSelector);
  // create variable for all links HTML code
  let allTagsLinkHTML = '';

  // START LOOP: for each tag in allTags
  for (let tag in allTags) {
    //generate code of a link and add it to allTagsHTML
    // allTagsData.tags.push({
    //   tag: tag,
    //   count: allTags[tag],
    //   className: calculateTagsClass(allTags[tag], tagsParams),
    // });

    // generate code of a link and add it to allTagsLinkHTML
    allTagsLinkHTML +=
      '<li><a href="#tag-' +
      tag +
      '"><span>' +
      tag +
      '(' +
      allTags[tag] +
      ')' +
      '</span></a></li>';
    // END LOOP: for each tag in allTags:
  }

  // add HTML from allTagsHTML to tagList
  tagList.innerHTML = allTagsLinkHTML;
  console.log(allTags);
  //tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
  const tagLinks = document.querySelectorAll('a[href^="#tag-' + href + '"]');
  console.log(tagLinks);

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
  // find all articles
  const articles = document.querySelectorAll(opts.ArticleSelector);

  for (let article of articles) {
    // find author of article
    const author = article.querySelector(opts.ArticleAuthorSelector);

    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
    const authorHTML =
      '<a href="#author-' +
      articleAuthor +
      '"><span>' +
      articleAuthor +
      '</span></a>';

    html = html + '' + authorHTML;

    const authorName = article.querySelector(opts.ArticleAuthorSelector);
    console.log('Author names: ', authorName);
    authorName.innerHTML = html;
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

  const author = href.replace('#author-', '');

  // remove active selector
  const activeAuthor = document.querySelectorAll('a.active[href="#author-"]');

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
  }
  /* END LOOP: for each link */
  const authorListLinks = document.querySelectorAll('.list.authors a');

  for (let authorLink of authorListLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
