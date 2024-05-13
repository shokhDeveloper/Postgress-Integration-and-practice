import Joi from "joi"
export const userValidator = Joi.object({
    username: Joi.string().max(32).min(3).error(() => new Error("Username is required !")).required(),
    contact: Joi.string().max(12).pattern(/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/).error(() => new Error("Contact is required"))
})
export const booksValidator = Joi.object({
    book_name: Joi.string().max(32).min(3).error(() => new Error("Book name is required !")).required(),
    book_year: Joi.number().error(() => new Error("Book year is required")).required(),
    book_ganre: Joi.string().max(32).min(3).error(() => new Error("Book ganre is required")).required() 
})
export const filmValidator = Joi.object({
    film_name: Joi.string().max(32).min(1).error(() => new Error("Film is required !")).required(),
    film_year:  Joi.number().error(() => new Error("Film year is required")).required(),
    film_ganre: Joi.string().max(32).min(3).error(() => new Error("film ganre is required")).required() 
})