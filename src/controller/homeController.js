import pool from "../configs/connectDB"
import bcrypt from 'bcrypt';

let getHometab = async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM accounts');

    return res.render('index.ejs', { dataAccount: rows });

}

let getDetailTab = async (req, res) => {
    let accountId = req.params.id;
    let [account] = await pool.execute('select * from accounts where id = ?', [accountId]);
    return res.render('detail.ejs', { dataAccount: account[0] });
}

let createNewAccount = async (req, res) => {
    let { page, date, email, password } = req.body;
    // if (!page || !date || !email || !password) {
    //     return res.status(400).send('Missing required parameters');
    // }
    let hashedPassword = await bcrypt.hash(password, 10);
    await pool.execute('insert into accounts(page, date, email,password) values(? , ?, ? , ? )',
        [page, date, email, hashedPassword]);
    return res.redirect('/');
}

let deleteAccount = async (req, res) => {
    let accountId = req.body.accountId;
    await pool.execute('delete from accounts where id = ?', [accountId]);
    await pool.execute('ALTER TABLE accounts AUTO_INCREMENT = 1');
    return res.redirect('/');
}

let getEditTab = async (req, res) => {
    let id = req.params.id;
    let [account] = await pool.execute('Select * from accounts where id = ?', [id]);
    return res.render('update.ejs', { dataAccount: account[0] });
}

let postUpdateAccount = async (req, res) => {
    let { page, date, email, password, id } = req.body;
    await pool.execute('update accounts set page= ?, date= ?, email= ?, password= ? where id= ? ',
        [page, date, email, password, id]);
    return res.redirect('/');
}

module.exports = {
    getHometab, getDetailTab, createNewAccount, deleteAccount, getEditTab, postUpdateAccount
}