const express = require("./index")[1]

const router = express.Router()

const app = require("./index")[0]

require("./Models/index.js")

const Student = require("./Models/student")

app.engine("art", require('express-art-template'))

app.set("view options", {
    debug: process.env.NODE_ENV !== 'production'
})

router.get("/list", async (req, res, next) => {
    try {
        let students = await Student.find()
        res.render("list.art", {
            list: students
        })
    } catch (error) {
        next(error)
    }

})


router.get("/add", (req, res) => {
    res.render("add.art", {})
})

router.get("/edit", async (req, res, next) => {
    try {
        let student = await Student.findById(req.query.id)
        console.log(student);
        let courses = ["html", "css", "js", "vue", "node", "ts", "react"]
        let coursesChecked = []
        courses.forEach(item => {
            let checked = student.courses.includes(item)
            coursesChecked.push(checked)
        })
        let data = {
            student: student,
            courses: courses,
            coursesChecked: coursesChecked
        }
        res.render("edit.art", data)
    } catch (error) {
        next(error)
    }

})

router.get("/delete", async (req, res, next) => {
    try {
        await Student.deleteOne({
            "_id": req.query.id
        })
        res.redirect(301, "/list")
    } catch (error) {
        next(error)
    }

})

router.post("/add", async (req, res, next) => {
    try {
        console.log(req.body);
        let student = await new Student(req.body)
        student.save()
        res.redirect(301, "/list")
    } catch (error) {
        next(error)
    }
})

router.post("/edit", async (req, res, next) => {
    try {
        await Student.findById(req.query.id).update(
            req.body
        )
        res.redirect(301, "/list")
    } catch (error) {
        next(error)
    }
})

module.exports = router