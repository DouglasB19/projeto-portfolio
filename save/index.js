const mysql=require('mysql');

class ClassCrud{

    constructor()
    {
        this.sql=mysql.createPool({
            user: "root",
            password: "",
            host: "localhost",
            database: "teste"
        });
    }

    read(req,res)
    {
        if(!req.params.id){
            this.sql.getConnection(function(err,connection){
                connection.query("select * from cadastro order by id asc",function(err,results,fields){
                    //res.json(results); //-- Para o sistema com json
                    res.render('select',{data:results}); //-- Para o sistema aclopado
                });
            });
        }else{
            this.sql.getConnection(function(err,connection){
                connection.query("select * from cadastro where id=? order by id asc",[req.params.id],function(err,results,fields){
                    //res.json(results); //-- Para o sistema com json
                    res.render('select',{data:results}); //-- Para o sistema aclopado
                });
            });
        }
    }

    create(req,res)
    {
        this.sql.getConnection(function(err,connection){
            connection.query("insert into cadastro values (?,?,?,?)",[req.body.id,req.body.name,req.body.email,req.body.comentario]);
            //res.send('Cadastro mandando com sucesso'); //-- Para o sistema com json
            res.render('controllerForm'); //-- Para o sistema aclopado
        });
    }

    deletes(req,res)
    {
        this.sql.getConnection(function(err,connection){
            connection.query("delete from cadastro where id=?",[req.params.id]);
            res.render('deletar');
        });
    }

    update(req,res,controller=null)
    {
        if(controller==null){
            this.sql.getConnection(function(err,connection){
                connection.query("select * from cadastro where id=?",[req.params.id],function(err,results,fields){
                    res.render('update',{id:req.params.id,name:results[0].Nome,email:results[0].Email,comentario:results[0].Comentario});
                });
            });
        }else{
            this.sql.getConnection(function(err,connection){
                connection.query("update user set Nome=?,Email=?,Comentario=? where id=?",[req.body.name,req.body.email,req.body.comentario,req.body.id]);
                res.render('controllerUpdate');
            });
        }
    }
}
module.exports=ClassCrud;