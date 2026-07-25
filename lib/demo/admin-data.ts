export const demoBookings = [
  {id:"WMD-24071",route:"Hindupur Railway Station → Lepakshi Temple",city:"Hindupur",status:"driver_assigned",fare:899,schedule:"2026-07-26T09:30:00+05:30",customer:"Anil Kumar",driver:"Ramesh K"},
  {id:"WMD-24072",route:"RTC Bus Stand → Bengaluru Airport",city:"Hindupur",status:"searching_driver",fare:2499,schedule:"2026-07-26T13:00:00+05:30",customer:"Sneha Reddy",driver:"Unassigned"},
  {id:"WMD-24073",route:"MG Road → Whitefield",city:"Bengaluru",status:"confirmed",fare:749,schedule:"2026-07-26T17:45:00+05:30",customer:"Kiran S",driver:"Naveen P"},
  {id:"WMD-24074",route:"Penukonda → Puttaparthi",city:"Penukonda",status:"completed",fare:1299,schedule:"2026-07-25T07:00:00+05:30",customer:"Ravi Teja",driver:"Arjun M"},
  {id:"WMD-24075",route:"Anantapur → Dharmavaram",city:"Anantapur",status:"cancelled",fare:1099,schedule:"2026-07-25T16:20:00+05:30",customer:"Meghana",driver:"Unassigned"},
];

export const demoDrivers = [
  {id:"DRV-101",name:"Ramesh Kumar",email:"ramesh@example.com",city:"Hindupur",licence:"AP02 20210012345",kyc:"approved",availability:"Online",rating:4.8,trips:328},
  {id:"DRV-102",name:"Naveen Prasad",email:"naveen@example.com",city:"Bengaluru",licence:"KA03 20200098765",kyc:"approved",availability:"Online",rating:4.7,trips:211},
  {id:"DRV-103",name:"Arjun M",email:"arjun@example.com",city:"Penukonda",licence:"AP39 20220045678",kyc:"under_review",availability:"Offline",rating:4.5,trips:96},
  {id:"DRV-104",name:"Suresh Babu",email:"suresh@example.com",city:"Anantapur",licence:"AP02 20190033221",kyc:"more_information_required",availability:"Offline",rating:4.2,trips:74},
];

export const demoReviews = [
  {id:"REV-1",date:"2026-07-25",direction:"Customer → Driver",score:5,feedback:"Professional and punctual driver.",status:"published"},
  {id:"REV-2",date:"2026-07-25",direction:"Driver → Customer",score:4,feedback:"Customer was ready on time.",status:"published"},
  {id:"REV-3",date:"2026-07-24",direction:"Customer → Driver",score:2,feedback:"Driver arrived late without informing.",status:"pending"},
];

export const demoPricing = [
  {_id:"PR-1",city:"Hindupur",tripType:"local",baseFare:399,baseKilometres:5,perKilometreFare:15,perHourFare:120,minimumFare:399,nightSurcharge:100,weekendSurcharge:0,waitingChargePerHour:120,outstationAllowance:300,driverFoodAllowance:250,overnightAllowance:500,platformFee:25,taxPercent:18,surgeMultiplier:1,active:true},
  {_id:"PR-2",city:"Bengaluru",tripType:"outstation",baseFare:699,baseKilometres:10,perKilometreFare:18,perHourFare:150,minimumFare:699,nightSurcharge:150,weekendSurcharge:100,waitingChargePerHour:150,outstationAllowance:400,driverFoodAllowance:300,overnightAllowance:700,platformFee:35,taxPercent:18,surgeMultiplier:1.1,active:true},
];
