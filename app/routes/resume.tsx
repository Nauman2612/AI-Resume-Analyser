import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/Components/ATS";
import Detail from "~/Components/detail";
import Summary from "~/Components/summary";
import { usePuterStore } from "~/lib/puter";

export function meta() {
  return [
    { title: "Resume | Review" },
    { name: "description", content: "Detailed overview of you resume" },
  ];
}
const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(()=>{
      if(!isLoading && !auth.isAuthenticated)
        navigate(`/auth/?next=/resume/${id}`)
      
    },[isLoading])

  const { id } = useParams();
  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
      setFeedback(data.feedback);
      console.log({resumeUrl,imageUrl,feedback:data.feedback});
    };
    loadResume();
  }, [id]);
  return (
    <main className="p-0 m-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="Icons/cross.svg" alt="logo" className="h-2.5 w-2.5" />
          <span className="text-grey-800 text-sm font-semibold">
            Back to home page
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className='feedback-section h-[100vh] sticky top-0 flex items-center justify-center'>
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
              <a href={resumeUrl} target="_blank">
                <img src={imageUrl} className="w-full h-full object-contain rounded-2xl"
                title="resume"
                />
              </a>
            </div>
          )}
        </section>
         <section className="feedback-section">
          <h2 className="text-4xl !text-white font-bold">Review Resume</h2>
           {feedback?(
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
               <Summary feedback={feedback}/> 
               <ATS score ={feedback.ATS.score || 0} suggestion={feedback.ATS.tips || []}/>  
                <Detail feedback={feedback}/>
            </div>
           ):(
            <img src="/Images/resume-scan.gif" alt="logo" className="w-full  "/>
           )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
