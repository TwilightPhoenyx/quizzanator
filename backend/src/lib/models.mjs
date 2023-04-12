import { Sequelize, DataTypes }  from 'sequelize';

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './db/quizzanator-database.sqlite'
});

const User = db.define('User', {
    Username: {
        type: DataTypes.STRING,
        unique: true
    },
    PasswordFootprint: {
        type: DataTypes.STRING
    },
    ProfilePictureURL: {
        type: DataTypes.STRING
    },
    Email: {
        type: DataTypes.STRING
    }
});

const Test = db.define('Test', {
    Title: {
        type: DataTypes.STRING
    },
    NumberLikes: {
        type: DataTypes.INTEGER
    },
    NumberDislikes: {
        type: DataTypes.INTEGER
    },
    TimesCompleted: {
        type: DataTypes.INTEGER
    },
    AverageScore: {
        type: DataTypes.INTEGER
    },
    IsPublished: {
        type: DataTypes.BOOLEAN
    }
});

const Vote = db.define('Vote', {
    UserId:{
        type:DataTypes.INTEGER,
        references:{
            model: User,
            key: 'id'
        }
    },
    TestId:{
        type:DataTypes.INTEGER,
        references:{
            model: Test,
            key: 'id'
        }
    },
    IsVoted: {
        type: DataTypes.BOOLEAN
    },
    IsLiked: {
        type: DataTypes.BOOLEAN
    }
});

const Question = db.define('Question', {
    Text: {
        type: DataTypes.STRING
    },
    Timer: {
        type: DataTypes.INTEGER
    },
    OptionalImageURL: {
        type: DataTypes.STRING
    },
    NumberOfQuestions: {
        type: DataTypes.INTEGER
    },
});

const Answer = db.define('Answer', {
    Text: {
        type: DataTypes.STRING
    },
    IsCorrect: {
        type: DataTypes.BOOLEAN
    },
});

const Tag = db.define('Tag', {
    TagName: {
        type: DataTypes.STRING
    }
});

User.hasMany(Test)
Test.belongsTo(User)

User.belongsToMany(Test, {through: Vote, foreignKey: 'UserId' })
Test.belongsToMany(User, {through: Vote, foreignKey: 'TestId' })

Test.hasMany(Question)
Question.belongsTo(Test)

Question.hasMany(Answer)
Answer.belongsTo(Question)

Test.belongsToMany(Tag, {through: "TestTag"})
Tag.belongsToMany(Test, {through: "TestTag"})

await db.sync({ alter: true })

export {
    User,
    Test,
    Vote,
    Question,
    Answer,
    Tag
}