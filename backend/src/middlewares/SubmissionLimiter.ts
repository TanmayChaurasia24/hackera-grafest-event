import rateLimit from "express-rate-limit";
console.log("calling limiter");

export const submissionLimiter = rateLimit({
    windowMs: 60*1000,
    max: 6,
    keyGenerator: (req) => req.body.teamId || req.ip,
    message: {
        message: "sdljasdi384unjenuof38r8328r9den329989"
    },
    standardHeaders: true,
    legacyHeaders: false
});