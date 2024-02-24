
const db = require("../db/db.js");


exports.ADD_PROD = function ({title, user_id, ref_key}, done) {
    
    
    let query = `INSERT INTO prodlist (title, ref_key, user_id) VALUES ("${title}", "${ref_key}", "${user_id}")`;

    db.query(query, (err) => {
        if (err) return done(e, false)
        console.log("Projet ajouter avec success!");
        done(null, true)
    })
    
}


exports.DELETE_PROD = function ({id, user_id}, done) {
    
    
    return

    let query = `DELETE FROM prodlist WHERE id="${id}" AND user_id="${user_id}"`;
    
    db.query(query, (err) => {
        
        if (err) return done(e, false)
        console.log("Projet ajouter avec success!");
        done(null, true)
        
    });
    
}


exports.UPDATE_PROD = function () {
    
    
}



exports.GET_ALL_USER_PROD = function ({user_id, mode, referer}, done){
  let query = `SELECT * FROM prodlist WHERE user_id="${user_id}"`;
    if(!user_id){
      query = `SELECT * FROM prodlist`;
    }
  
    db.query(query, (err, result)=>{
        if (err) return done(err, false)
        
        if(mode == "cors"){
            
            done(null, true, result)
            
        }else if(mode === "navigate"){
            
            done(null, true, result)

        }
        else{
            
        }
        
        //console.log("res ufhhfultt", result)
    })
    
}

const {getTaskBy} = require("../api/taskApi.js")

exports.GET_ALL_TASK_FROM = function ({user_id, id}, done){
    
    let query = `SELECT * FROM prodlist WHERE user_id="${user_id}" AND id="${id}"`;
    
    db.query(query, (err, result)=>{
        if (err) return done(e, false, null);
        
        if(!result) return done(null, false, null);
        
        let datas  = result.find(item=>{
          return item.id === id
        })
        
        
        getTaskBy({type: "ref", user_id, key: datas.ref_key}, (err, success, data)=>{
          
          datas.service = data;
    
          if(!datas) return done(null, false, null);
            
          return done(null, true, datas);
          
        })
       
    })
    
};



let by =  [
  "user_id", "id", "ref", "echeance", "priority", "createdDate"
  
  ]
  
  //(type, user_id, key) user_id => []
  //(type, user_id, key) ref => []
  //(type, user_id, key) id => {}


const GET_PROD_BY = function ({type,user_id, key} , done){
  
  console.log("Select all task from db",user_id)
    
  let query ;
  
  if(!type && !key) return done("No key", false, null);
  
  
  query = `SELECT * FROM prodlist WHERE user_id="${user_id}" AND ${type}="${key}"`;
    
    
  db.query(query,
    (err, result)=>{
      if (err) done(err, false)
      return done(null, true, result);
  })
  
}

exports.GET_PROD_BY = GET_PROD_BY;


/*
GET_PROD_BY({type: "ref", user_id: "001A", key: "0B_"}, (err, success, datas)=>{
  
  if (err) throw err;
   console.log(datas);
  
})
*/





