import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    organization: String,
    email: String,
    password: String
})

const Users = models.user || model('user', userSchema);
export default Users

const classSchema = new Schema({
    classTeacher: String,
    className: String,
    members: Array
})

export const StudentClass = models.class || model('class', classSchema)

const TaskSchema = new Schema({
    classID: String,
    name: String,
    description: String,
    enddate: Date,
});



export const Task = models.task || model('task', TaskSchema)