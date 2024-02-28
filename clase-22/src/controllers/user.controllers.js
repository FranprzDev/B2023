const registerUser = (req, res) => {
    const { name, email, password, phoneNumber } = req.body
    
    if (!name || !email || !password) {
        res.status(400)
        res.json({ data: null, error: "Body is not right" })
        return undefined
    }

    if (email === "test@test.com") {
        res.status(401)
        res.json({data: null, error: "User alresdy exists"})
        return undefined
    }

    
    if (password.length < 10) {
        res.status(400)
        res.json({data: null, error: "Password too short"})
        return undefined
    } else if (password.length > 32) {
        res.status(400)
        res.json({data: null, error: "Password too long"})
        return undefined
    }

    // Logica para crear el usuario

    res.status(201)
    res.json({ data: { name, email, password, phoneNumber }, error: null })
}

const loginUser = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        res.json({ data: null, error: "Please fill the body with email and password" })
        return undefined
    }

    if (email !== "real@gmail.com") {
        res.status(400)
        res.json({data: null, error: "User doesn't exist"})
        return undefined
    }

    if (password !== 'rolling_code') {
        res.status(401)
        res.json({ data: null, error: 'Password is not valid' })
        return undefined
    }

    res.status(200)
    res.json({ data: { email }, error: null })
}

module.exports = {
    registerUser,
    loginUser   
}