import z from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
  });
async function zodVerify(req ,res , next){
    const user_details = {email : req.body.email , password : req.body.password};
    try {

        const result = await schema.parse(user_details);
        console.log("zod verified");
        // return res.json({message : "zod verified"})
        next();

    } catch (error) {
        console.log("zod error");
        res.json({message : "please provide corrrect email and passsword"});
    }
}

export default zodVerify