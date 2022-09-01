const mongoose = require('mongoose')

const connectDB = (password) => {
    const url = `mongodb+srv://fullstack:${password}@cluster0.szjyaqq.mongodb.net/noteApp?retryWrites=true&w=majority`

    mongoose.connect(url)
    
    const dataSchema = new mongoose.Schema({
        name: String,
        number: String,
        id: Number
    })

    const Person = mongoose.model('Person', dataSchema)

    return Person
}

const addNumber = (Person, newName, newNumber) => {
    const person = new Person({
        name: newName, 
        number: newNumber,
        id: Math.floor(Math.random() * 100)
    })

    person.save().then(result => {
        console.log('person saved !! ')
        mongoose.connection.close()
    })
}

const getAllNumber = (Person) => {
    Person.find({}).then( result => {
        result.forEach(element => {
            console.log(element)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}else if (process.argv.length === 5){
    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]
    const Person = connectDB(password)
    addNumber(Person, name, number)

}else{
    const password = process.argv[2]
    const Person = connectDB(password)
    getAllNumber(Person)

}

