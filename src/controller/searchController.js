import { SEARCH_BOOKS, SEARCH_FILMS, SEARCH_QUERY, globalSearch, searchQuery } from "#postgres";

export const searchController = {
    GET: async (req, res) => {
        try{
            const {key} = req.query;
            if(req["_parsedUrl"].pathname == "/users"){
                const search = await searchQuery(SEARCH_QUERY, key);
                if(!search.length) return res.status(400).json({message: "Invalid search params", statusCode: 400})
                return res.status(200).json(search);
            }
            if(req["_parsedUrl"].pathname == "/books"){
                const search = await searchQuery(SEARCH_BOOKS, key);
                if(!search.length) return res.status(400).json({message: "Invalid search params", statusCode: 400})
                return res.status(200).json(search);    
            }
            if(req["_parsedUrl"].pathname == "/films"){
                const search = await searchQuery(SEARCH_FILMS, key);
                if(!search.length) return res.status(400).json({message: "Invalid search params", statusCode: 400})
                return res.status(200).json(search);
            }
            if(req["_parsedUrl"].pathname == "/global"){
                const search = await globalSearch(req.query);
                if(!search.length) return res.status(400).json({message: "Invalid search params", statusCode: 400});
                return res.status(200).json(search);
            }
        }catch(error){
            return res.status(error.status || 500).json({
                message: error.message,
                statusCode: error.status || 500
            })
        }
    }
}