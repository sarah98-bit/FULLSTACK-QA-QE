async function fetchData(callback) {
    try {
        const response = await fetch("http://localhost:3000/books");
        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

function specialBooks(data) {
    const filterByPage = data.filter((bookObj) => bookObj.pages > 500);
    console.log("CAUTION: Books above 500 pages");
    console.log(filterByPage);
    

}


function prettifiedBooks(data) {
    const myBooks = data.map((book) => {
        const { title, genre, year, author, pages } = book;
        // console.log(title, genre)
    return `${title} by ${author} - ${genre} (${pages} pages) (${year})`
    });

    console.log("Formatted Book List:");
    console.log(myBooks);
}


function filteredBooks(data){
    const filterByYear = data.filter((Book) => Book.year > 1950)
    console.log(filterByYear)
}
function filteredBooksByGenre(data){
    const filteredByGenre = data.filter((Book) => Book.genre === 'Fantasy')
    console.log(filteredByGenre)
}

function sortBooksByYear(data){
    const SortedBooks = data.sort((a,b) => a.year - b.year)
    return SortedBooks
}

function sortBooksByPages(data){
    const sortedByPage = data.sort((a,b) => a.pages - b.pages)
    console.log(sortedByPage)
}
fetchData(filteredBooksByGenre)