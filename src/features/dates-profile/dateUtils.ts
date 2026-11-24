const DAY_MS = 86_400_000;
export function isValidDateKey(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y,m,d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y,m-1,d,12));
  return date.getUTCFullYear()===y && date.getUTCMonth()===m-1 && date.getUTCDate()===d && y>=1900;
}
export function dateKeyToUtc(value: string) {
  if (!isValidDateKey(value)) return null;
  const [y,m,d]=value.split("-").map(Number);
  return new Date(Date.UTC(y,m-1,d,12));
}
export function formatDateKey(value: string, style: "long"|"short"|"numeric" = "long") {
  const date=dateKeyToUtc(value); if(!date) return "Date unavailable";
  return new Intl.DateTimeFormat("en-IN",{day:"numeric",month:style==="numeric"?"2-digit":style==="short"?"short":"long",year:"numeric",timeZone:"UTC"}).format(date);
}
export function coupleDateKey(now: Date, timeZone: string) {
  const parts=new Intl.DateTimeFormat("en-CA",{timeZone,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);
  const get=(t:Intl.DateTimeFormatPartTypes)=>parts.find(p=>p.type===t)?.value??"";
  return `${get("year")}-${get("month")}-${get("day")}`;
}
export function dateKeyOrdinal(value: string) { const d=dateKeyToUtc(value); return d ? Math.floor(d.getTime()/DAY_MS) : NaN; }
export function daysBetweenDateKeys(a: string,b: string) { return dateKeyOrdinal(b)-dateKeyOrdinal(a); }
export function getMeetingCountdown(date: string, now: Date, timeZone: string) {
  const today=coupleDateKey(now,timeZone); const days=daysBetweenDateKeys(today,date);
  return { days, state: days>0?"upcoming" as const:days===0?"today" as const:"past" as const };
}
export function formatDateTimeInZone(iso: string, timeZone: string) {
  const date=new Date(iso); if(Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric",hour:"numeric",minute:"2-digit",timeZone}).format(date);
}
export function localDateTimeToIso(dateKey:string,time:string,timeZone:string):string|null {
  if(!isValidDateKey(dateKey)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return null;
  const [y,m,d]=dateKey.split("-").map(Number),[hh,mm]=time.split(":").map(Number);
  const target=Date.UTC(y,m-1,d,hh,mm); let guess=target;
  try {
    for(let i=0;i<4;i++){
      const p=new Intl.DateTimeFormat("en-US",{timeZone,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date(guess));
      const n=(k:Intl.DateTimeFormatPartTypes)=>Number(p.find(x=>x.type===k)?.value??0);
      guess += target-Date.UTC(n("year"),n("month")-1,n("day"),n("hour"),n("minute"));
    }
    const check=new Intl.DateTimeFormat("en-US",{timeZone,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date(guess));
    const n=(k:Intl.DateTimeFormatPartTypes)=>Number(check.find(x=>x.type===k)?.value??0);
    if(n("year")!==y||n("month")!==m||n("day")!==d||n("hour")!==hh||n("minute")!==mm) return null;
    return new Date(guess).toISOString();
  } catch { return null; }
}
export function getAutomaticMilestones(startDate:string, now:Date, timeZone:string) {
  if(!isValidDateKey(startDate)) return [];
  const today=coupleDateKey(now,timeZone), elapsed=daysBetweenDateKeys(startDate,today);
  const items:{id:string;title:string;date:string;description:string;status:"upcoming"|"completed"}[]=[];
  const add=(id:string,title:string,date:string,description:string)=>items.push({id,title,date,description,status:date>=today?"upcoming":"completed"});
  add("days-together",`${Math.max(0,elapsed)} days together`,today,"Every day, a little more us.");
  const [sy,sm,sd]=startDate.split("-").map(Number),[ty]=today.split("-").map(Number);
  const monthsElapsed=(ty-sy)*12+(Number(today.slice(5,7))-sm);
  for(let monthCount=Math.max(1,monthsElapsed-2);monthCount<=monthsElapsed+12;monthCount++){
    const total=sm-1+monthCount,year=sy+Math.floor(total/12),month=((total%12)+12)%12+1;
    const last=new Date(Date.UTC(year,month,0)).getUTCDate(),day=Math.min(sd,last);
    const key=`${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    if(key>=startDate) add(`month-${year}-${month}`,`${monthCount} months together`,key,"Another little chapter together.");
  }
  for(let year=sy+1;year<=ty+2;year++){
    const last=new Date(Date.UTC(year,sm,0)).getUTCDate(),day=Math.min(sd,last),key=`${year}-${String(sm).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    if(key>=startDate) add(`year-${year}`,`${year-sy} year${year-sy===1?"":"s"} together`,key,"Your relationship anniversary.");
  }
  return items.sort((a,b)=>a.date.localeCompare(b.date));
}
