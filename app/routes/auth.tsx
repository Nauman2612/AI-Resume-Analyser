import React, { useEffect } from "react";    
import { usePuterStore } from "~/lib/puter";
import { useLocation,useNavigate} from 'react-router'

export const meta = () => [
  { title: "Resumind | Auth" },  { name: "description", content: "Log into your account" }
];

const Route = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();
 
  useEffect(()=>{
    if(auth.isAuthenticated){
      navigate(next)
    }
  },[auth.isAuthenticated,next])
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-2xl">
        <section className="flex flex-col gap-8 rounded-2xl p-10" style={{background:'rgba(12,18,32,0.9)'}}>
          <div className="flex flex-col gap-2">
            <h1>Welcome</h1>
            <h2>Login to you Account</h2>
            <div>
              {isLoading ? (
                <button className="auth-button animate-pulse">
                  <p>Signing you in...</p>
                </button>
              ) : (
                <>
                  {auth.isAuthenticated ? (
                    <button className="auth-button" onClick={auth.signOut}>
                      <p>Log Out</p>
                    </button>
                  ) : (
                    <button className="auth-button" onClick={auth.signIn}>
                      <p>Log In</p>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </section> 
      </div>
    </main>
  );
};

export default Route;
