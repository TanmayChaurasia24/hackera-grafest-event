import slowDown from "express-slow-down";
console.log("calling slow down") 
export const submissionslowdown = slowDown({
    windowMs: 60*1000,
    delayAfter: 3,
    delayMs: () => 1000,
    keyGenerator: (req) => req.body.teamId || req.ip,
    legacyHeaders:false
});
