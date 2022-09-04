import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Register User
export const register = async (req, res) => {
    try {
        const {username, password} = req.body
        const isUsed = await User.findOne({username})

        if(isUsed){
            return res.json({
                message: ' Цей username вже зайнятий'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash
        })

        const token = jwt.sign({
            id: newUser._id,
        },
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
        )
       
        await newUser.save()


        res.json({
            newUser, token,  message: 'Реєстрація пройшла успішно'
        })

    } catch (error) {
        res.json('Помилка при створенні користувача')
    }

}
//Login User
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.json({
                message:'Такого користувача не існує'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            return res.json({
                message: 'Не вірний пароль'
            })
        }

        const token = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
        )
       

        res.json({
            token, user, message: 'Ви увійшли в систему'
        })

    } catch (error) {
        res.json({ message:'Помилка при авторизації'})
    }
}
//Get Me
export const getMe = async (req, res) => {
    try {
        // const user = await User.findOne(req.username)
        const user = await User.findById(req.ObjectId)

        if (!user) {
            return res.json({
                message:'Такого користувача не існує'
            })
        }

        const token = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
        )

        res.json({
            token,
            user,
           
        })
    } catch (error) {
        res.json({ message:'Відсутній досутп'})
    }
}