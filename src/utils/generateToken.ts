<<<<<<< HEAD
import jwt from 'jsonwebtoken'
const ACCESS_SECRET='secretutd';

export const generateAccessToken = (userId: string) =>{
    return jwt.sign(
        {userId},
        ACCESS_SECRET,
        {
            expiresIn: '15m'
        }
=======
import jwt from "jsonwebtoken";

const ACCESS_SECRET='secret12345utd';

export const generateAccessToken = (userId: string) => {
    return jwt.sign(
        {userId},
        ACCESS_SECRET,
    {
        expiresIn: '15'
    }
>>>>>>> a79b98c54feac8e0a6f86c2cfd7ad0ca17a16821
    )
}