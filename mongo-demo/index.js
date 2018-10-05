const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag...'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished }
    }
});
const Course = mongoose.model('courses', courseSchema);

async function createCourse() {
    const course = new Course({
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true,
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field]);
        }
    }
}

async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateCourse(id) {
    const course = await Course.updateOne({ author: 'Jack' }, {
        $set: {
            author: 'Xin'
        }
    })
}

function execute(callback) {
    mongoose.connect('mongodb://localhost/mongo-exercise')
        .then(() => createCourse())
        .then(callback)
        .catch(err => console.log('Error: ' + err.message));
}

execute(getCourses);