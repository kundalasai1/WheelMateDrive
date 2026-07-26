/* eslint-disable react-hooks/set-state-in-effect */
"use client";import {useEffect,useState} from "react";
export function LanguageSwitcher(){const [lang,setLang]=useState("en");useEffect(()=>setLang(localStorage.getItem("wmd_locale")||"en"),[]);return <select aria-label="Language" value={lang} onChange={e=>{localStorage.setItem("wmd_locale",e.target.value);document.cookie=`wmd_locale=${e.target.value};path=/;max-age=31536000`;location.reload()}}><option value="en">English</option><option value="te">తెలుగు</option><option value="hi">हिन्दी</option></select>}
