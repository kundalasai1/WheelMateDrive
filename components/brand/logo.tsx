import Image from "next/image";
export function WheelMateLogo({className="", priority=false}:{className?:string;priority?:boolean}){
  return <Image src="/brand/wheelmate-logo.webp" alt="WheelMateDrive — Your Journey, Our Driver" width={435} height={334} priority={priority} className={className}/>;
}
