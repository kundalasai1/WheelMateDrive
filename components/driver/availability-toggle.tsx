"use client";
import {useState} from "react";
export function AvailabilityToggle({initial=false,disabled=false}:{initial?:boolean;disabled?:boolean}){
 const [online,setOnline]=useState(initial);const [busy,setBusy]=useState(false);const [message,setMessage]=useState("");
 async function toggle(){setBusy(true);setMessage("");const next=!online;const res=await fetch("/api/driver/availability",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({isAvailable:next})});const data=await res.json();if(res.ok){setOnline(next);setMessage(next?"You are now available for trips.":"You are now offline.")}else setMessage(data.error??"Unable to update availability.");setBusy(false)}
 return <div><button className={online?"btn btn-primary":"btn btn-secondary"} disabled={disabled||busy} onClick={toggle}>{busy?"Updating…":online?"Go offline":"Go online"}</button>{message&&<p className="muted compact-note">{message}</p>}</div>
}
