import z from "zod";

const schema = z.object({
    password: z.string().min(8),
    first_name : z.string(),
    last_name : z.string()
  });
async function zodVerifyTotal(req ,res , next){
    
    try {
        const user_details = {  password : req.body.password , first_name : req.body.first_name , last_name : req.body.last_name};
        const result = await schema.parse(user_details);
        console.log("zod verified");
        // return res.json({message : "zod verified"})
        next();

    } catch (error) {
        console.log("zod error");
        res.json({message : "please provide corrrect email and passsword"});
    }
}

export default zodVerifyTotal;