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

const projectSchema = new Schema({
    projectAdmin: String,
    projectName: String,
    members: Array
})

export const Project = models.project || model('project', projectSchema)

const TaskSchema = new Schema({
    projectID: String,
    name: String,
    nature: String,
    startdate: Date,
    enddate: Date,
    projectStatus: String,
    person: String
});

export const Task = models.task || model('task', TaskSchema)