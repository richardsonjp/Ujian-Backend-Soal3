var express = require('express')
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())

const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'ujian'
})
db.connect()


// untuk lihat semua data
app.get('/karyawan',(req,res)=>{
    var querySel = 'select * from test';
    db.query(querySel, (error, hasil)=>{

        if (error) throw error;
        console.log(hasil)
        res.send(hasil)
    });
})


app.post('/karyawan',(req,res)=>{
    
var reqhari = req.body.tgllahir.substr(0,2)
var reqbulan = req.body.tgllahir.substr(3,2)
var reqtahun = req.body.tgllahir.substr(6,4)

var zodiaks = zodiak(reqhari,reqbulan)

var date = new Date

var tahun = date.getFullYear()

function zodiak(hari,bulan){

var namazodiak = {
    'aries':'aries',
    'taurus':'taurus',
    'gemini':'gemini',
    'cancer':'cancer',
    'leo':'leo',
    'virgo':'virgo',
    'libra':'libra',
    'scorpio':'scorpio',
    'sagitarius':'sagitarius',
    'capricorn':'capricorn',
    'aquarius':'aquarius',
    'pisces':'pisces'
}
    if ((hari >= 21 && bulan == 3) || hari <= 19 && bulan == 4 ) {
        return namazodiak.aries
    }    
    else if ((hari >= 20 && bulan == 4) || hari <= 20 && bulan == 5 ) {
        return namazodiak.taurus
    } 
    else if ((hari >= 21 && bulan == 5) || hari <= 21 && bulan == 6 ) {
        return namazodiak.gemini
    } 
    else if ((hari >= 22 && bulan == 6) || hari <= 22 && bulan == 7 ) {
        return namazodiak.cancer
    }
    else if ((hari >= 23 && bulan == 7) || hari <= 22 && bulan == 8 ) {
        return namazodiak.leo
    }
    else if ((hari >= 23 && bulan == 8) || hari <= 22 && bulan == 9 ) {
        return namazodiak.virgo
    }
    else if ((hari >= 23 && bulan == 9) || hari <= 22 && bulan == 10 ) {
        return namazodiak.libra
    }
    else if ((hari >= 23 && bulan == 10) || hari <= 21 && bulan == 11 ) {
        return namazodiak.scorpio
    }
    else if ((hari >= 22 && bulan == 11) || hari <= 21 && bulan == 12 ) {
        return namazodiak.sagitarius
    }
    else if ((hari >= 22 && bulan == 12) || hari <= 19 && bulan == 1 ) {
        return namazodiak.capricorn
    }
    else if ((hari >= 20 && bulan == 1) || hari <= 18 && bulan == 2 ) {
        return namazodiak.aquarius
    }
    else if ((hari >= 19 && bulan == 2) || hari <= 20 && bulan == 3 ) {
        return namazodiak.pisces
    }
}


    var data = {
        no: null,
        nama: req.body.nama,
        hari: reqhari,
        bulan: reqbulan,
        tahun: reqtahun,
        zodiak: zodiaks,
        usia: tahun - reqtahun
        
    }
    var queryUp = 'insert into test SET ?';
    db.query(queryUp, data, (error, hasil)=>{

        if (error) throw error;
        console.log(hasil)
        res.send({
            status: 'POST SUKSES!',
        })
});
})


app.listen(3210, ()=>{
    console.log('Server aktif @port 3210')
})




