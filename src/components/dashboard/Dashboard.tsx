import React from "react";
import Topbar from "./Topbar";
import WelcomeCard from "./WelcomeCard";
import StatsCards from "./StatsCards";
import StartInterviewCard from "./StartInterviewCard";
import RecentInterviews from "./RecentInterviews";

function Dashboard() {
  return (
    <div className="space-y-8">
      <Topbar />

      <WelcomeCard />

      <StartInterviewCard />

      <StatsCards />

      

      <RecentInterviews />
    </div>
  );
}

export default Dashboard; 