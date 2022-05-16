const student=require('../models/student')
const Interview=require('../models/interview')
module.exports.studentsList=async(req,res)=>{
  if(req.isAuthenticated()){
    const students=await student.find({});

    res.render('studentList',{
        students:students
    });
   
  }else{
    res.redirect('/')
  }
    
}

module.exports.addStudent=(req,res)=>{

    student.create(req.body,(err,student)=>{
             if(err){
                 console.log('error in adding student',err);
             }
          
           
    })
    res.redirect('back');

}

module.exports.editDetail=async (req,res)=>{
    const id=req.params.id
   const  studentD =await student.findById(id)
  
   return res.render('editDetail',{
            student:studentD
    })
}

module.exports.studentDetail=async(req,res)=>{
         const id=req.params.id
       studentD=await student.findById(id)
       
       res.render('studentDetails',{
           student:studentD
       })
}

module.exports.updateStudent=async (req,res)=>{
    const id =req.params.id
   


      const company=await  Interview.findOne({
                                              company_name: req.body.company });
            
         if (company) {
                
    student.findByIdAndUpdate(
        id,
        {
          $push: {
            interviews: [
              {
                company: req.body.company,
                date: req.body.date,
                result: req.body.result,
              },
            ],
          },
        },(err,update)=>{
           if(err){
               console.log(err)
           }
           console.log(update.name)


           Interview.updateOne(
            { company_name: req.body.company },
            {
              $push: {
                students: [
                  {
                    student: update.name,
                    result: req.body.result,
                  },
                ],
              },
            },
            function (err, company) {
              if (err) {
                console.log(err);
              }
            })
          }
        
         
        ) } else{
          return res.redirect('back')
       }
               
     
res.redirect('back')
}

module.exports.updateStatus=(req,res)=>{
    const id =req.params.id
  console.log(req.body.status)

    student.findByIdAndUpdate(id,{
        status:req.body.status
    },(err,student)=>{
        if(err){
            console.log("error in updating status",err)
        }
       })
  
    res.redirect('back')
}