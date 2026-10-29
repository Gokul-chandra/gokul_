/**
 * Seed script.
 *  - Categories are real platform data.
 *  - Admin account is created only if ADMIN_EMAIL and ADMIN_PASSWORD are set.
 *  - Demo developers are clearly labelled "[DEMO]" and flagged isDemo. They have NO reviews,
 *    NO ratings and NO statistics. Delete them before going live:
 *      DELETE FROM "User" WHERE "isDemo" = true;
 */
import { PrismaClient, Role, ExperienceLevel } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  ["college-project", "College project"],
  ["final-year-project", "Final-year project"],
  ["portfolio", "Portfolio"],
  ["business-website", "Business website"],
  ["e-commerce", "E-commerce"],
  ["booking-system", "Booking system"],
  ["blog", "Blog"],
  ["landing-page", "Landing page"],
  ["dashboard", "Dashboard"],
  ["website-redesign", "Website redesign"],
  ["custom-project", "Custom project"],
];

async function main() {
  for (const [slug, name] of categories) {
    await prisma.category.upsert({ where: { slug }, update: { name }, create: { slug, name } });
  }

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    if (adminPassword.length < 12) throw new Error("ADMIN_PASSWORD must be at least 12 characters");
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        name: "Platform Admin",
        role: Role.ADMIN,
        passwordHash: await bcrypt.hash(adminPassword, 12),
        emailVerified: new Date(),
      },
    });
    console.log("Admin account ensured:", adminEmail);
  } else {
    console.log("ADMIN_EMAIL / ADMIN_PASSWORD not set; skipping admin creation.");
  }

  if (process.env.SEED_DEMO === "true") {
    const demo = [
      { email: "demo.dev1@devbridge.invalid", name: "[DEMO] Developer One", skills: ["React", "Node.js"], languages: ["TypeScript"] },
      { email: "demo.dev2@devbridge.invalid", name: "[DEMO] Developer Two", skills: ["WordPress", "PHP"], languages: ["PHP"] },
    ];
    for (const d of demo) {
      const user = await prisma.user.upsert({
        where: { email: d.email },
        update: {},
        create: {
          email: d.email,
          name: d.name,
          role: Role.DEVELOPER,
          isDemo: true,
          passwordHash: await bcrypt.hash(crypto.randomUUID(), 12), // unusable password
        },
      });
      await prisma.developerProfile.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          displayName: d.name,
          bio: "Demo profile for UI testing. Not a real developer.",
          skills: d.skills,
          languages: d.languages,
          experienceLevel: ExperienceLevel.INTERMEDIATE,
          published: true,
        },
      });
    }
    console.log("Demo developers seeded (labelled [DEMO]).");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
