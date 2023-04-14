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
    IsVoted: {
        type: DataTypes.BOOLEAN
    },
    IsLiked: {
        type: DataTypes.BOOLEAN
    }
});

const Question = db.define('Question', {
    QuestionText: {
        type: DataTypes.STRING
    },
    Timer: {
        type: DataTypes.INTEGER
    },
    OptionalImageURL: {
        type: DataTypes.STRING
    },
    NumberOfAnswers: {
        type: DataTypes.INTEGER
    },
});

const Answer = db.define('Answer', {
    AnswerText: {
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

User.belongsToMany(Test, {through: Vote})
Test.belongsToMany(User, {through: Vote})

Test.hasMany(Question, {onDelete:'CASCADE'})
Question.belongsTo(Test)

Question.hasMany(Answer, {onDelete: 'CASCADE'})
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