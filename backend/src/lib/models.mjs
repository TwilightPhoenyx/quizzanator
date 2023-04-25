import { Sequelize, DataTypes }  from 'sequelize';

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './db/quizzanator-database.sqlite'
});

const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    passwordFootprint: {
        type: DataTypes.STRING
    },
    profilePictureURL: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
});

const Test = db.define('Test', {
    title: {
        type: DataTypes.STRING
    },
    numberOfLikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    numberOfDislikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    timesCompleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    averageScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

const Vote = db.define('Vote', {
    isVoted: {
        type: DataTypes.BOOLEAN
    },
    isLiked: {
        type: DataTypes.BOOLEAN
    }
});

const Question = db.define('Question', {
    questionText: {
        type: DataTypes.STRING
    },
    timer: {
        type: DataTypes.INTEGER
    },
    optionalImageURL: {
        type: DataTypes.STRING
    },
    numberOfAnswers: {
        type: DataTypes.INTEGER
    },
});

const Answer = db.define('Answer', {
    answerText: {
        type: DataTypes.STRING
    },
    isCorrect: {
        type: DataTypes.BOOLEAN
    },
});

const Tag = db.define('Tag', {
    tagName: {
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

//await db.sync({ alter: true })
await db.sync()

export {
    User,
    Test,
    Vote,
    Question,
    Answer,
    Tag
}