const { dbConnection } = require('../database/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const obtenerUsuarios = async (req, res = response) => {
    try {
        res.json('data')
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const registrarUsuario = async (req, res = response) => {
    try {
        const { nombre, email, rol, password } = req.body;
        dbConnection.query(`SELECT * FROM usuarios WHERE LOWER(email) = LOWER(${dbConnection.escape( email )});`, 
            (err, result) => {
                if (result.length) {
                    return res.status(409).send({
                        msg: 'Correo de usuario en uso!'
                    });
                } else {
                    // username is available
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).send({
                                msg: err
                            });
                        } else {
                            dbConnection.query(
                                `INSERT INTO usuarios (nombre, email, rol, password) VALUES ('${nombre}', ${dbConnection.escape(email)}, ${rol} ,${dbConnection.escape(hash)})`,
                                (err, result) => {
                                    if (err) {  res.status(500).json({ msg: err.message }) }
                                    return res.status(200).send({
                                        msg: 'Usuario Agregado Correctamente!'
                                    });
                                }
                            );
                        }
                    });
                }
            }
        );
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const loginUsuario = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        dbConnection.query(`SELECT * FROM usuarios WHERE email = ${dbConnection.escape(email)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                return res.status(400).send({
                    msg: err
                });
            }
            if (!result.length) {
                return res.status(401).send({
                msg: 'Email or password is incorrect!'
                });
            }
            bcrypt.compare(password, result[0]['password'],
            (bErr, bResult) => {
                if (bErr) {
                    return res.status(401).send({
                        msg: 'Email or password is incorrect!'
                    });
                }
                if (bResult) {
                    const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
                    dbConnection.query(`UPDATE usuarios SET last_login = now() WHERE id = '${result[0].id}'`);
                    return res.status(200).send({
                        msg: 'Logged in!',
                        token,
                        user: result[0]
                    });
                }
                return res.status(401).send({
                    msg: 'Username or password is incorrect!'
                });
            })
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    obtenerUsuarios,
    registrarUsuario,
    loginUsuario
}