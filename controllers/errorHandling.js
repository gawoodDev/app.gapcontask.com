class ERROR {
   
   constructor(err){
      this.err = err;
      this.message = this.err.message;
      this.code = this.err.code;
      
   }
   
   handle(res){
      res.status(this.code).json({message: this.message});
   }
}




module.exports = ERROR