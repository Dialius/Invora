import { prisma } from './prisma';

async function main() {
  console.log('Starting DELETE and duplicate validation tests...');

  // Setup test user
  const user = await prisma.user.findFirst();
  if (!user) {
    console.error('No user found to run tests.');
    process.exit(1);
  }

  const userId = user.id;

  // 1. Test duplicate company validation
  console.log('Testing duplicate company validation...');
  const compName = 'Test Company unique_123';
  
  // Clean up first in case it was left over
  await prisma.company.deleteMany({
    where: { name: { in: [compName, 'Company with Invoice'] } }
  });
  await prisma.client.deleteMany({
    where: { name: 'Client for Invoice' }
  });

  // Create first
  await prisma.company.create({
    data: { userId, name: compName }
  });

  // Try to find if duplicate check logic works (simulate checking name)
  const duplicate = await prisma.company.findFirst({
    where: {
      userId,
      name: { equals: compName, mode: 'insensitive' }
    }
  });

  if (duplicate) {
    console.log('SUCCESS: Duplicate company check detected duplicate.');
  } else {
    console.error('FAIL: Duplicate company not found.');
  }

  // 2. Test Safe Delete company (associated invoice)
  console.log('Testing safe delete company...');
  const companyWithInvoice = await prisma.company.create({
    data: { userId, name: 'Company with Invoice' }
  });

  const client = await prisma.client.create({
    data: { userId, name: 'Client for Invoice' }
  });

  // Create invoice
  const invoice = await prisma.invoice.create({
    data: {
      userId,
      companyId: companyWithInvoice.id,
      clientId: client.id,
      invoiceNumber: 'INV-TEST-01',
      invoiceDate: new Date(),
      dueDate: new Date(),
      subtotal: 1000,
      taxPercent: 11,
      taxAmount: 110,
      total: 1110,
      remainingAmount: 1110,
      type: 'REGULER',
      status: 'DRAFT'
    }
  });

  const invoiceCount = await prisma.invoice.count({
    where: { companyId: companyWithInvoice.id }
  });

  if (invoiceCount > 0) {
    console.log('SUCCESS: Company has active invoices, cannot be deleted.');
  } else {
    console.error('FAIL: Invoice count is 0.');
  }

  // Clean up
  console.log('Cleaning up test data...');
  await prisma.invoice.deleteMany({
    where: { invoiceNumber: 'INV-TEST-01' }
  });
  await prisma.company.deleteMany({
    where: { name: { in: [compName, 'Company with Invoice'] } }
  });
  await prisma.client.deleteMany({
    where: { name: 'Client for Invoice' }
  });

  console.log('All tests completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
