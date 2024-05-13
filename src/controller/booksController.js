import { getBooks, insertBook, searchBook } from "#postgres";
import { booksValidator } from "#validator";

export const booksController = {
    GET: async function(req, res) {
        try{
            const books = await getBooks();
            const {bookId} = req.params;
            if(bookId){
                const book = await searchBook(bookId);
                if(!book) return res.status(404).json({message: "The book is not found !", statusCode: 404});
                return res.status(200).json(book);
            }
            return res.status(200).json(books)
        }catch(error){
            return res.status(error.status || 500).json({
                message: error.message,
                statusCode: error.status || 500
            });
        };
    },
    POST: async function(req, res){
        try{
            const newBooks = req.body;
            if(booksValidator.validate(newBooks).error instanceof Error){
                return res.status(400).json({message: booksValidator.validate(newBooks).error.message, statusCode: 400 });  
            }else{
                const response = await insertBook(newBooks.book_name, newBooks.book_year, newBooks.book_ganre);
                console.log(response)
                if(response && response.hasOwnProperty("book_name")){
                    return res.status(201).json({message: "Book successfully created ! ", book: newBooks, statusCode: 201})
                }else{
                    const toCheckBook = await req.toCheckBook(newBooks.book_name);
                    if(!toCheckBook){
                        return res.status(400).json({message: "The book has ben created !", statusCode: 400});
                    }else{
                        return res.status(400).json({message: "Invalid book", statusCode: 400})
                    }
                }
            }
        }catch(error){
            return res.status(error.status || 500).json({
                message: error.message,
                statusCode: error.status || 500
            })
        }
    }
}