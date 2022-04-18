import pool from '../configs/Database';
let getAllUsers = async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.status(200).json({
        messae: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;

    if (!firstName || !lastName || !email || !address) {
        return res.send(200).json({
            messae: 'erorr'
        })
    }

    await pool.execute('INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, address]);

    return res.send(200).json({
        messae: 'ok'
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;

    if (!firstName || !lastName || !email || !address || !id) {
        return res.send(200).json({
            messae: 'erorr'
        })
    }

    await pool.execute('UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?',
        [firstName, lastName, email, address, id]);
    return res.send(200).json({
        messae: 'ok'
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.send(200).json({
            messae: 'erorr'
        })
    }

    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
    return res.send(200).json({
        messae: 'ok'
    })
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}