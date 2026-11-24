import type { CoupleProfile, ImportantDate, ManualMilestone, Meeting, NotificationPreferences, CoupleSettings } from "./types";
export const initialCoupleProfile:CoupleProfile={displayName:"Our little world",relationshipStartDate:"2024-02-14",partners:[{id:"you",name:"Alex",initials:"A",avatarUri:null},{id:"partner",name:"Sam",initials:"S",avatarUri:null}]};
export const initialMeeting:Meeting={title:"Until We Meet",date:"2026-12-17",time:"18:00",location:"Jalandhar"};
export const initialImportantDates:ImportantDate[]=[
{id:"date-start",title:"The day we became us",date:"2024-02-14",type:"relationship-start",description:"Our beginning.",creatorId:"shared"},
{id:"date-birthday-you",title:"Alex’s birthday",date:"2004-06-12",type:"birthday",description:"",creatorId:"shared"},
{id:"date-birthday-partner",title:"Sam’s birthday",date:"2004-09-08",type:"birthday",description:"",creatorId:"shared"}
];
export const initialManualMilestones:ManualMilestone[]=[{id:"milestone-first-trip",title:"Our first trip together",date:"2025-05-18",description:"A day we still talk about.",creatorId:"you"}];
export const initialNotifications:NotificationPreferences={loveNotes:true,dailyUs:true,meetingReminders:true,affection:false};
export const initialSettings:CoupleSettings={timezone:"Asia/Kolkata",dateFormat:"long",privacyPreference:"private"};
