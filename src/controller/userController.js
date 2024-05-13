import { getUsers, insertUser } from "#postgres"
import { userValidator } from "#validator";

export const userController = {
    GET: async function(_, res){
        try{    
            const users = await getUsers();
            if(users.length){
                return res.status(200).json(users)                
            }else{
                return res.status(200).json({message: "There are no users yet", statusCode: 200})
            }
        }catch(error){
            return res.status(error.status || 500).json({
                status: error.status || 500,
                message: error.message
            })   
        };
    },
    POST: async function(req, res){
        try{
            const newUser = req.body;
            if(!newUser) return res.status(400).json({message: "The user is invalid !", statusCode: 400})
            if(userValidator.validate(newUser).error instanceof Error){
                return res.status(400).json({message: userValidator.validate(newUser).error.message, statusCode: 400})
            }else{
                const toCheckUserName = await req.toCheckUser(newUser.username);
                if(toCheckUserName){
                    const response = await insertUser(newUser.username, newUser.contact)
                    if(response && response.hasOwnProperty("username")){
                        return res.status(201).json({message: "User successfull created !", user: newUser, statusCode: 201})
                    }else{
                        return res.status(400).json({message: "Invalid user", statusCode: 400})
                    };
                } else{
                    return res.status(400).json({message: "The username has ben created", statusCode: 400})
                }
            };
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                status: error.status || 500,
                message: error.message
            })      
        };
    }
}