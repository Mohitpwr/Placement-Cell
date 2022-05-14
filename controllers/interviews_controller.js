const interview=require('../models/interview')

module.exports.interviews=async (req,res)=>{
    interviews= await interview.find({});
    res.render('interviewList',{interviews:interviews})
}

module.exports.addInterview=async (req,res)=>{
  const company= await interview.findOne({ company_name: req.body.company_name })
      
         
    
          if (!company) {
            interview.create(
              {
                company_name: req.body.company_name,
                date: req.body.interview_date,
              },
              function (err, new_interview) {
                if (err) {
                  console.log("cant create interview", err);
                  return res.redirect("back");
                }
                // req.flash("success", "Interview Added Successfully");
                return res.redirect("back");
              }
            );
          } else {
            console.log("interview is already added");
            // req.flash("success", "Interview is already added");
            return res.redirect("back");
          }
        }
      


      module.exports.interviewDetails = async (req, res) => {
        
        try {
            const interviews = await interview.findOne({ _id: req.params.id })
            // return res.status(200).json({
            //   message: "Here is the list of all the Interviews",
            //   interviews,
            // });
            console.log(interviews)
            return res.render("interviewDetails", {
              title: "MY page",
              interview: interviews,
            });
          } catch (err) {
            console.log("error while fetching all the interviews from the DB!", err);
            return res.status(500).json({
              message: "error while fetching all the interviews from the DB!",
            });
          }
        };
        