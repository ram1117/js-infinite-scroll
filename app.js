let booksBaseUrl = 'http://gutendex.com/books/?page=';
let page = 1;
const booksContainerEl = document.getElementById('books-container');

const fetchBooks = async (page) => {
  const response = await fetch(`${booksBaseUrl}${page}`);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.Error}`);
  }
  const data = await response.json();
  return data.results;
};

const displayBooks = async () => {
  results = await fetchBooks(page);
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
};

const joinAuthors = (authors) =>{
  let auths = "";
  authors.forEach(author=>{
    auths+=` ${author.name}`
  })
  return auths;
}

displayBooks();
