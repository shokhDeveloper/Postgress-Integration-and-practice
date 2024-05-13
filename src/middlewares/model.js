import { getBooks, getUsers } from "#postgres";

export const model = (req, _, next) => {
    req.toCheckUser = async (username) => {
        let users = await getUsers();
        if(users.some((user) => user.username == username)) return false;
        return true
    },
    req.toCheckBook = async (book_name) => {
        let books = await getBooks();
        if(books.some((book) => book.book_name == book_name)) return false;
        return true
    };
    return next();
}