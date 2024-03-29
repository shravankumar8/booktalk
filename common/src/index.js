import { z } from "zod";
// const z=require("zod")
function inputvalidation(username, password){
    let titleInputProps = z.object({
      username: z.string().min(1).email(),
      password: z.string().min(6),
    });
    const parsedInput = titleInputProps.safeParse({
      username,
      password,
    });
    return parsedInput
}
export { inputvalidation};
