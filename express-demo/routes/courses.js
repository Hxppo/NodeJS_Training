const Joi = require('joi');
const express = require('express');
const router = express.Router();


const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

router.get('/', (req, res) => {
    res.send([1, 2, 3]);
});

router.get('/:id', (req, res) => {
    let course = courses.find(c => c.id = parseInt(req.params.id));
    if (!course) return res.status(404).send('Not found');

    res.send(course);
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

module.exports = router;

