"use client";
import {useState} from "react";
import type {DriverProfile} from "@/models/DriverProfile";

type EditableProfile={
  fullName:string; city:string; drivingLicenceNumber:string; licenceExpiry:string;
  drivingExperienceYears:string; emergencyContact:string; upiId:string; address:string;
};

function initialProfile(profile?:DriverProfile):EditableProfile{
  return {
    fullName:profile?.fullName ?? "",
    city:profile?.city ?? "",
    drivingLicenceNumber:profile?.drivingLicenceNumber ?? "",
    licenceExpiry:profile?.licenceExpiry ? new Date(profile.licenceExpiry).toISOString().slice(0,10) : "",
    drivingExperienceYears:String(profile?.drivingExperienceYears ?? 0),
    emergencyContact:profile?.emergencyContact ?? "",
    upiId:profile?.upiId ?? "",
    address:profile?.address ?? "",
  };
}

export function DriverProfileForm({profile}:{profile?:DriverProfile}){
  const [state,setState]=useState<EditableProfile>(()=>initialProfile(profile));
  const [message,setMessage]=useState("");
  function field(name:keyof EditableProfile,label:string,type="text"){
    return <label>{label}<input type={type} value={state[name]} onChange={e=>setState(current=>({...current,[name]:e.target.value}))}/></label>;
  }
  async function submit(e:React.FormEvent){
    e.preventDefault();setMessage("Saving…");
    const payload={...state,drivingExperienceYears:Number(state.drivingExperienceYears)};
    const res=await fetch("/api/driver/profile",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});
    const data=await res.json();setMessage(res.ok?"Profile saved successfully.":data.error??"Could not save profile.");
  }
  return <form className="card form-grid" onSubmit={submit}>{field("fullName","Full name")}{field("city","City")}{field("drivingLicenceNumber","Driving licence number")}{field("licenceExpiry","Licence expiry","date")}{field("drivingExperienceYears","Experience (years)","number")}{field("emergencyContact","Emergency contact")}{field("upiId","UPI ID")}<label className="full">Address<textarea value={state.address} onChange={e=>setState(current=>({...current,address:e.target.value}))}/></label><div className="full form-actions"><button className="btn btn-primary">Save profile</button><span className="muted">{message}</span></div></form>;
}
