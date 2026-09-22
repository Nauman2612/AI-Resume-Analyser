import React from "react";

export interface ATSSuggestion {
  type: "good" | "improve";
  tip: string;
}

export interface ATSProps {
  score: number;
  suggestions?: ATSSuggestion[];
  suggestion?: ATSSuggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions, suggestion }) => {
  const list = suggestions || suggestion || [];

  let bgGradient = "from-red-100";
  let iconPath = "/Icons/ats-bad.svg";
  let subtitle = "Needs Improvement";

  if (score > 69) {
    bgGradient = "from-green-100";
    iconPath = "/Icons/ats-good.svg";
    subtitle = "Great Job!";
  } else if (score > 49) {
    bgGradient = "from-yellow-100";
    iconPath = "/Icons/ats-ats-warning.svg";
    subtitle = "Good Start!";
  }

  return (
    <div className={`w-full rounded-2xl p-6 shadow-md bg-gradient-to-b ${bgGradient} to-white flex flex-col gap-6`}>
      {/* Top Section */}
      <div className="flex flex-row items-center gap-4">
        <img src="/Icons/ats-good.svg" alt="ATS Score Icon" className="w-10 h-10" />
        <h2 className="text-2xl font-bold text-gray-900">
          ATS Score - {score}/100
        </h2>
      </div>

      {/* Description Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-800">{subtitle}</h3>
        <p className="text-gray-600 text-sm">
          Applicant Tracking System (ATS) ats-goods if your resume is readable, well-formatted, and optimized for automated HR screeners.
        </p>

        {/* List of Suggestions */}
        {list.length > 0 && (
          <div className="flex flex-col gap-3 my-2">
            {list.map((item, index) => (
              <div key={index} className="flex flex-row items-start gap-3">
                <img
                  src={item.type === "good" ? "/Icons/ats-good.svg" : "/Icons/ats-warning.svg"}
                  alt={item.type}
                  className="w-5 h-5 mt-0.5"
                />
                <p className="text-sm text-gray-700">{item.tip}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm font-medium text-gray-700 italic border-t border-gray-100 pt-3">
          Keep refining your resume to maximize your chances of getting hired!
        </p>
      </div>
    </div>
  );
};

export default ATS;