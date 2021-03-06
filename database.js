
const sql = require('mysql');
const bcrypt = require('bcrypt-nodejs');


let connection = sql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12236743',
    password: 'STn4EmWzgf',
    database: 'sql12236743',
    multipleStatements:true
});


function connect(){
    connection.connect();
}

function getAllUsers(users){
    connection.query('Select * from UserDetails', function(err,data){
        users(data);
    });
}

function addUser(details){

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(details.password, salt);


    connection.query(`Create table if not exists UserDetails(
                                id int primary key AUTO_INCREMENT,
                                firstname varchar(30),
                                lastname varchar(30),
                                username varchar(40),
                                password varchar(100)
                                ); 
                                Insert into UserDetails(firstname,lastname,username,password) values('${details.firstname}','${details.lastname}','${details.username}','${hash}');`, function(err,data){
                if(err) throw err;
                console.log(hash);
    });
}

module.exports = {
    connect,
    getAllUsers,
    addUser
};
