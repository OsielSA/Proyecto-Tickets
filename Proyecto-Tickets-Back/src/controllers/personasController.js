const connection = require('../config/connection');

function listar(req, res) {
    if(connection) {
        let sql = "SELECT * FROM Personal";
        connection.query(sql, (err, personas) => {
            if(err) {
                res.json(err);
            } else {
                console.log(personas);
                res.json(personas);
            }
        });
    }
}

function obtenerPersona(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = `SELECT * FROM Personal WHERE id = ${connection.escape(id)}`;
        connection.query(sql, (err, persona) => {
            if(err) {
                console.log(err);
            } else {
                var mensaje1 = "";
                if(persona == undefined || persona.length == 0)
                mensaje1 = "persona no encontrada";

                res.json({data: persona, mensaje: mensaje1})
            }
        })
    }
}

function  validaciones(persona) {
    var mensaje ="";
    if(!persona.nombre) {
        return mensaje= "El nombre es obligatorio";
    }
     if(!persona.apellido) {
        return mensaje= "El apellido es obligatorio";
    }
    if(persona.telefono && persona.telefono.length !== 10) {
        return  mensaje= "Telefono debe de ser de 10 caracteres";
    } 
    return mensaje;
}

function crear(req, res) {
    if(connection) {
        console.log(req.body);
        const persona = req.body;
        var mensajev = validaciones(persona);
        if(mensajev !==""){
            return res.status(400).send({ error: true, mensaje: mensajev});
        }

        let sql = "INSERT INTO Personal set ?";

        connection.query(sql, [persona], (err, data) => {
            if(err) {
                console.log(err);
            } else {
                
                res.json({error: false, data, mensaje: "La persona creada con exito."});
            }
        })
    }
}

function editar(req, res) {
    if(connection){
        const { id } = req.params;
        const persona = req.body;
        var mensajev = validaciones(persona);
        if(mensajev !==""){
            return res.status(400).send({ error: true, mensaje: mensajev});
        }
        let sql = "UPDATE Personal set ? WHERE id = ?";
        connection.query(sql, [persona, id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "Datos modificafos";
                if(data.changedRows === 0) {
                    mensaje = "La informacion es la misma";
                    res.json({error: true, data, mensaje: mensaje });
                } else{
                    res.json({error: false, data, mensaje: mensaje });

                }
        
            }
        })
        
    }
}

function eliminar(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = "DELETE from Personal WHERE id = ?";

        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0){
                    mensaje = "Persona no encontrada";
                } else {
                    mensaje = "Persona eliminada con exito";
                }

                res.json({error: false, data, mensaje: mensaje});
            }
        })
    }
}

module.exports = {
    listar,
    obtenerPersona,
    crear,
    editar,
    eliminar
}