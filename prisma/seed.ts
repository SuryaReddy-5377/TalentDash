import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create companies with salary data
  const companies = [
    {
      name: 'Google India',
      slug: 'google',
      normalizedName: 'google',
      industry: 'Technology',
      headquarters: 'Bengaluru, India',
      foundedYear: 1998,
      headcountRange: '10,000+',
    },
    {
      name: 'Amazon India',
      slug: 'amazon',
      normalizedName: 'amazon',
      industry: 'Technology',
      headquarters: 'Bengaluru, India',
      foundedYear: 1994,
      headcountRange: '10,000+',
    },
    {
      name: 'Microsoft India',
      slug: 'microsoft',
      normalizedName: 'microsoft',
      industry: 'Technology',
      headquarters: 'Hyderabad, India',
      foundedYear: 1975,
      headcountRange: '5,000+',
    },
    {
      name: 'Flipkart',
      slug: 'flipkart',
      normalizedName: 'flipkart',
      industry: 'E-commerce',
      headquarters: 'Bengaluru, India',
      foundedYear: 2007,
      headcountRange: '5,000+',
    },
    {
      name: 'TCS',
      slug: 'tcs',
      normalizedName: 'tcs',
      industry: 'IT Services',
      headquarters: 'Mumbai, India',
      foundedYear: 1968,
      headcountRange: '500,000+',
    },
    {
      name: 'Infosys',
      slug: 'infosys',
      normalizedName: 'infosys',
      industry: 'IT Services',
      headquarters: 'Bengaluru, India',
      foundedYear: 1981,
      headcountRange: '300,000+',
    },
    {
      name: 'Meta India',
      slug: 'meta',
      normalizedName: 'meta',
      industry: 'Technology',
      headquarters: 'Bengaluru, India',
      foundedYear: 2004,
      headcountRange: '2,000+',
    },
    {
      name: 'Razorpay',
      slug: 'razorpay',
      normalizedName: 'razorpay',
      industry: 'Fintech',
      headquarters: 'Bengaluru, India',
      foundedYear: 2014,
      headcountRange: '1,000+',
    },
    {
      name: 'Wipro',
      slug: 'wipro',
      normalizedName: 'wipro',
      industry: 'IT Services',
      headquarters: 'Bengaluru, India',
      foundedYear: 1945,
      headcountRange: '200,000+',
    },
    {
      name: 'NVIDIA India',
      slug: 'nvidia',
      normalizedName: 'nvidia',
      industry: 'Technology',
      headquarters: 'Bengaluru, India',
      foundedYear: 1993,
      headcountRange: '1,000+',
    },
  ];

  const levels = ['L3', 'L4', 'L5', 'L6', 'SDE-I', 'SDE-II', 'SDE-III', 'Staff', 'Principal'];
  const roles = ['Software Engineer', 'Product Manager', 'Data Analyst', 'SDE-I', 'SDE-II', 'SDE-III'];
  const locations = ['Bengaluru', 'Mumbai', 'Hyderabad', 'Delhi', 'Pune', 'Chennai'];

  for (const companyData of companies) {
    // Create company
    const company = await prisma.company.upsert({
      where: { slug: companyData.slug },
      update: {},
      create: companyData,
    });

    console.log(`✅ Created company: ${company.name}`);

    // Create 5-8 salary records for each company
    const numSalaries = Math.floor(Math.random() * 4) + 5; // 5-8 records
    
    for (let i = 0; i < numSalaries; i++) {
      const level = levels[Math.floor(Math.random() * levels.length)];
      const role = roles[Math.floor(Math.random() * roles.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const baseSalary = Math.floor(Math.random() * 3000000) + 800000; // 8-38 LPA
      const bonus = Math.floor(Math.random() * 300000);
      const stock = Math.floor(Math.random() * 200000);
      const experienceYears = Math.floor(Math.random() * 8) + 2; // 2-10 years

      await prisma.salary.create({
        data: {
          companyId: company.id,
          role: role,
          level: level,
          location: location,
          currency: 'INR',
          experienceYears: experienceYears,
          baseSalary: baseSalary,
          bonus: bonus,
          stock: stock,
          totalCompensation: baseSalary + bonus + stock,
          source: 'SCRAPED',
          confidenceScore: 0.7 + Math.random() * 0.3,
          isVerified: true,
        },
      });
    }
    
    console.log(`  📊 Created ${numSalaries} salary records`);
  }

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });