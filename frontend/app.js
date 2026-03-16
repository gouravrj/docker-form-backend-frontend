const express = require("express")
const axios = require("axios")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const BACKEND_URL = process.env.BACKEND_URL || "http://backend:5000"

app.get("/", (req, res) => {
    res.send(`
        <h2>User Form</h2>
        <form method="POST" action="/submit">
            Name: <input name="name"/><br/><br/>
            Email: <input name="email"/><br/><br/>
            <button type="submit">Submit</button>
        </form>
    `)
})

app.post("/submit", async (req, res) => {

    const { name, email } = req.body

    try {

        const response = await axios.post(`${BACKEND_URL}/api/submit`, {
            name,
            email
        })

        res.send(`<h3>${response.data.message}</h3>`)

    } catch (error) {

        res.send("Error connecting to backend")

    }

})

app.listen(3000, "0.0.0.0", () => {
    console.log("Frontend running on port 3000")
})