const {sql} = require('../dbConnection');

exports.createInvoice = async (newInvoice) => {
    const invoices = await sql `
    INSERT INTO invoices ${sql(
        newInvoice,
        'invoice_code',
        'due_date',
        'name',
        'money_amount',
        'status'
    )}
    RETURNING *
    `
    return invoices[0];
};

exports.getInvoiceByinvoice_code = async (invoice_code) => {
    const invoices = await sql`
    SELECT invoices.*
      FROM invoices
      WHERE invoices.invoice_code = ${invoice_code};
      `;
    return invoices[0]; 
  };

  exports.generateUniqueCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    return code;
  };

  exports.getAllInvoices = async () => {
    const invoices = await sql`
      SELECT *
      FROM invoices
    `;
    return invoices;
  };

  exports.updateInvoice = async (invoice_code, updatedInvoice) => {
    const invoices = await sql`
    update invoices set ${sql(
        updatedInvoice,
      'due_date',
      'name',
      'money_amount',
      'status',
      
    )}
    where invoice_code = ${invoice_code}
    returning *;
  `;
    return invoices[0];
  };

  exports.deleteInvoice = async (invoice_code) => {
    const invoices = await sql`
      DELETE FROM invoices
      WHERE invoice_code = ${invoice_code}
      RETURNING *;
    `;
    
    return invoices[0];
  };

  
  exports.filterInvoices = async (filter) => {
    
  
  
    const invoices = await sql`
    SELECT invoices.*
      FROM invoices
      WHERE invoices.status LIKE ${filter.status.substring(0, 2) + '%'} 
     `;
    
    return invoices;
  };
