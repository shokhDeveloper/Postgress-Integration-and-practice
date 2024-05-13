import express from "express";
import { PORT } from "#config";
import { model } from "#middlewares";
import { userRouter } from "./router/userRouter.js" ;
import { MutationRouter } from "./router/mutationRouter.js";
import { searchRouter } from "./router/searchRouter.js";
import { bookRouter } from "./router/bookRouter.js";
import { filmRouter } from "./router/filmRouter.js";
const app = express();
app.use(express.json())
app.use(model)

app.use("/users", userRouter);
app.use("/add", MutationRouter);
app.use("/search", searchRouter);
app.use("/books", bookRouter );
app.use("/films", filmRouter)

app.listen(PORT, () => {
    console.log(`Server is running is http://localhost:${PORT}`);
})