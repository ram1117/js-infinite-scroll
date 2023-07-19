let booksBaseUrl = 'http://gutendex.com/books/?page=';
let page = 1;
const booksContainerEl = document.getElementById('books-container');
const loader = document.getElementById('loader');

const fetchBooks = async (page) => {
  const response = await fetch(`${booksBaseUrl}${page}`);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.Error}`);
  }
  const data = await response.json();
  return data.results;
};

const displayBooks = async (pageNo) => {
  loader.classList.toggle('invisible'); 
  results = await fetchBooks(pageNo);
  const pageInfo = document.createElement('h5');
  pageInfo.textContent = `Page - ${pageNo}`;
  booksContainerEl.appendChild(pageInfo);
  results.forEach((book) => {
    const item = document.createElement('div');
    item.classList.add('book-item');
    item.innerHTML = `
    <div class="book-item">
    <p class="book-title">
    ${book.title}
    </p>
    <p class="book-authors">
    ${joinAuthors(book.authors)}
    </p>
    </div>`;
    booksContainerEl.appendChild(item);
  });
  loader.classList.toggle('invisible');
};

const joinAuthors = (authors) => {
  let auths = '';
  authors.forEach((author) => {
    auths += ` ${author.name}`;
  });
  return auths;
};

window.addEventListener(
  'scroll',
  () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      page++;
      displayBooks(page);
    }
  },
  { passive: true }
);
displayBooks(page);
