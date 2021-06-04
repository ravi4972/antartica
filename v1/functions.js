const dbConnection = require('./dbCon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

env.config();

module.exports.eastablishDBConn = () => {
    return new Promise((resolve, reject) => {
        dbConnection.connect((err) => {
            if (err) {
                err.errorCode = 500;
                reject(err);
            }
            else {
                resolve("Sucessfully Connected to database server")
            }
        })
    })
}

module.exports.createUser = async function (req, res, next) {
    try {
        let email = req.body.email.trim();
        let password = await createHash(req.body.password.trim());
        let fname = req.body.fname.trim();
        let lname = req.body.lname.trim();
        let empid = req.body.empid.trim();
        let org = req.body.org.trim();

        let query1 = "INSERT INTO users (email, password) VALUES ($1,$2)";
        let input1 = [email, password];

        let query2 = "INSERT INTO employees (firstName,lastName,employeeid,organization,email) VALUES($1,$2,$3,$4,$5)";
        let input2 = [fname, lname, empid, org, email];

        await executeQuery(query1, input1);
        await executeQuery(query2, input2);
        res.status("201").send("Profile Created");
    }
    catch (err) {
        if ((err.message).includes('Duplicate entry')) {
            res.status("300").send("Email already in use");
        }
        else {
            res.status("501").send("Error occured" + err);
        }
    }
}

module.exports.login = async function (req, res, next) {
    try {
        let email = req.body.email.trim();
        let password = req.body.password.trim();

        let query = "SELECT u.email,u.password,e.employeeid FROM users u join employees e on u.email=e.email and u.email=$1";
        let input = [email];
        let result = await executeQuery(query, input);
        

        if (result.rows[0]) {
            let parsedResult = result.rows[0];
            let response = await bcrypt.compare(password, parsedResult.password);
            
            if (response && parsedResult.employeeid) {
                res.locals.employeeid = parsedResult.employeeid;
                res.locals.email = parsedResult.email;
                next();
            }
            else {
                res.status("401").send("Invalid Username/Password");
            }
        }
        else{
            res.status("401").send("Invalid Username/Password");
        }
    } catch (err) {
        res.status("500").send(err.message);
    }
}

module.exports.JWT = async function (req, res, next) {
    try {
        let jwtExpirySeconds = 300;
        let token = await createJWT(res.locals,jwtExpirySeconds);
        res.cookie("AntarticaToken", token, { maxAge: jwtExpirySeconds * 1000 })
        res.status(200).send("JWT token created");
    }
    catch(err){
        res.status(500).send(err.message);
    }
    
}

module.exports.validateReq = (req, res, next) => {

    if (!Object.keys(req.body).length) {
        res.status(500).send("Payload is empty");
    }
    else {
        next();
    }
}

function executeQuery(sql, parameter) {
    return new Promise((resolve, reject) => {
        dbConnection.query(sql, parameter, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    })
}

function createHash(data) {
    return new Promise((resolve, reject) => {
        try {
            let saltrounds = 10;
            bcrypt.genSalt(saltrounds).then((salt) => {
                bcrypt.hash(data, salt).then((hashed) => {
                    resolve(hashed);
                }).catch((err) => {
                    reject(err);
                })
            }).catch((err) => {
                reject(err);
            })
        } catch (err) {
            reject(err);
        }
    })
}

function createJWT(tokenPayload,jwtExpirySeconds) {
    return new Promise((resolve, reject) => {
        try {
            let JWTBody = JSON.parse(JSON.stringify(tokenPayload));
            resolve(jwt.sign({ JWTBody }, process.env.TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds
            }));
        }
        catch (err) {
            reject(err);
        }
    })
}

