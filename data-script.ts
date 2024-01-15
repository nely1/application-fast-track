// const {PrismaClient} = require('@prisma/client');

// const prisma = new PrismaClient();

// async function main() {
//     try {
//         const commentsToCreate = [{comment: "Length: too long"},
//                                   {comment: "Length: too short"},
//                                   {comment: "Objective not necessary"},
//                                   {comment: "Missing essential skill set"},
//                                   {comment: "Experience missing"}];

//         const comments = await prisma.comment.createMany({data: commentsToCreate});
//         const companyToCreate = {name: "NES", email: "nelsonlynelson@gmail.com", password:"1stGamer11"};
//         const company = await prisma.company.create({data: companyToCreate});
//         const postingToCreate = {title: "Software Engineer position at NES", companyId: 1, closingDate: new Date(), closed: false};
//         const posting = await prisma.posting.create({data: postingToCreate});
//         const applicationToCreate = {postingId: 1, email: "nelson.ly41@gmail.com", resumeFile: "a file"};
//         const application = await prisma.application.create({data: applicationToCreate});
//     }
//     catch (e: any) {
//         console.log(e.message);
//     }
//     finally {
//         await prisma.$disconnect();
//     }
// }

// main();