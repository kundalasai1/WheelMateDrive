import { WheelMateLogo } from "./logo";
export function LoadingLogo({label="Preparing your ride"}:{label?:string}){
  return <div className="loading-screen" role="status" aria-live="polite"><div className="loading-brand-mark"><span className="loading-orbit" aria-hidden="true"/><span className="loading-orbit loading-orbit-two" aria-hidden="true"/><WheelMateLogo className="loading-logo-image" priority/></div><span className="loading-label">{label}</span><span className="loading-dots" aria-hidden="true"><i/><i/><i/></span></div>;
}
