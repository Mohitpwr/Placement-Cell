const student=require('../models/student')

module.exports.studentsList=async(req,res)=>{
    const students=await student.find({});

    res.render('studentList',{
        students:students
    });
   
}

module.exports.addStudent=(req,res)=>{

    student.create(req.body,(err,student)=>{
             if(err){
                 console.log('error in adding student',err);
             }
          
           
    })
    res.redirect('back');

}

module.exports.studentDetail=async(req,res)=>{
         const id=req.params.id
       studentD=await student.findById(id)
       
       res.render('studentDetails',{
           student:studentD
       })


}