"use client";
import Link from "next/link";
import { Menu, UserRound, X } from "lucide-react";
import { WheelMateLogo } from "@/components/brand/logo";
import { useState } from "react";
const links=[["/book","Book a Driver"],["/how-it-works","How It Works"],["/safety","Safety"],["/services","Services"],["/register/driver","Become a Driver"]] as const;
export function Header(){const[open,setOpen]=useState(false);return <header className="site-header"><div className="container header-inner"><Link href="/" className="brand" aria-label="WheelMateDrive home"><WheelMateLogo className="brand-logo" priority/></Link><nav className="desktop-nav" aria-label="Primary navigation">{links.map(([h,l])=><Link key={h} href={h}>{l}</Link>)}</nav><div className="header-actions"><Link href="/login" className="sign-in-button"><UserRound size={16}/> Sign In</Link><button type="button" className="menu-button" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button></div></div>{open&&<nav className="mobile-nav" aria-label="Mobile navigation"><div className="container">{links.map(([h,l])=><Link key={h} href={h} onClick={()=>setOpen(false)}>{l}</Link>)}<Link href="/login" onClick={()=>setOpen(false)}>Sign In</Link></div></nav>}</header>}
