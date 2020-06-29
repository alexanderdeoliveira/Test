var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var cors = require('cors');

const bodyParser = require('body-parser');

const User = require('./models/user')
const Historic = require('./models/historic')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

global.users = [{
    id: 1,
    name: 'admin',
    email: 'admin@admin.com',
    password: '123'
}];

global.historical = [{
    id: 1,
    userId: 1,
    textA: 'asdfasdf',
    textB: 'asdf',
    result: true,
    date: '2020-06-28T19:59:29.331',
    foundIndexes: [0, 1, 2, 3],
    isDelete: false
}];

app.listen(5000, () => console.log('Server online'));

//-> Auth
const verifyJWT = (req, res, next) => {
    let token = req.headers['token'];

    if (!token) {
        return res.status(401).json({ message: false });
    }

    jwt.verify(token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: false });
        }
        req.userId = decoded.idUser;

        next();
    });
}

app.get('/api/v1/auth', verifyJWT, (req, res) => {
    try {
        let user = global.users.find(u => u.id == req.userId);

        if (user) {
            return res.status(200).json({ message: true });
        }

        return res.status(404).json({ message: false });
    } catch (error) {
        return res.status(500).json({ message: false });
    }
});

app.post('/api/v1/auth', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = global.users.find((user) => user.email == email && user.password == password);

    if (typeof user != 'undefined') {
        const token = jwt.sign({ idUser: user.id }, 'secret', {
            expiresIn: 300
        });

        return res.json({ name: user.name, email: user.email, token });
    }

    return res.status(401).json({ message: false });
});

//-> User
app.post('/api/v1/user', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let isExist = false;

    const newUser = new User(global.users.length + 1, email, password, name);

    global.users.forEach((user) => {
        if (user.email == newUser.email) {
            isExist = true;
        }
    });

    if (isExist) {
        return res.status(500).json({ message: false });
    }

    global.users.push(newUser);

    return res.status(200).json({ message: true });
});

app.get('/api/v1/user', verifyJWT, (req, res) => {
    try {
        res.status(200).json({ users: global.users });
    } catch (error) {
        res.status(500).json({ message: false });
    }
});

//-> ----------- historic
app.get('/api/v1/historic', verifyJWT, (req, res) => {
    try {
        const historic = global.historical.filter((h) => h.userId == req.userId && !h.isDelete);
        res.json(historic);
    } catch (error) {
        res.status(500).json({ message: false });
    }
});

app.post('/api/v1/historic', verifyJWT, (req, res) => {
    try {
        let stringA = req.body.stringA;
        let stringB = req.body.stringB;

        let foundIndexes = [];
        let lastIndex = 0;
        let isCorrect = true;

        stringB.split("").forEach((characterB) => {
            let isExist = false;

            stringA.split("").forEach((characterA, indexA) => {
                if (indexA > lastIndex || foundIndexes.length == 0) {

                    if (characterA == characterB && !isExist) {
                        isExist = true;
                        lastIndex = indexA;
                        foundIndexes.push(indexA);
                    }
                }
            });

            if (!isExist) {
                isCorrect = false;
            }
        });

        //Se não encontrar algum caracter eu limpo os índices que foram encontrados
        if (!isCorrect) {
            foundIndexes = [];
        }

        const user = global.users.find(user => user.id == req.userId);
        let data = new Date();
        const historic = new Historic(global.historical.length + 1, user.id, stringA, stringB, isCorrect, new Date(data.valueOf() - data.getTimezoneOffset() * 60000), foundIndexes);

        global.historical.push(historic);

        return res.json(historic);
    } catch (error) {
        return res.status(500).json({ message: false });
    }
});

app.delete('/api/v1/historic/:id', verifyJWT, (req, res) => {
    try {
        const id = req.params.id;

        const index = global.historical.findIndex(h => h.id == id);

        if (index > -1) {
            global.historical[index].isDelete = true;
            return res.json({ message: true });
        }

        return res.status(404).json({ message: false });
    } catch (error) {
        return res.status(500).json({ message: false });
    }
});