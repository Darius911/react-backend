const {sql} = require('../dbConnection');
exports.createAppointment = async (newAppointment) => {
    const appointments = await sql`
      INSERT INTO visits ${sql(
        newAppointment,
        'pets_name',
        'owner_name',
        'date',
        'time',
        'notes',
       
      )}
         RETURNING *;
      `;
    return appointments[0];
  };

  exports.getAllAppointments = async () => {
    const appointments = await sql`
      SELECT *
      FROM visits
    `;
    return appointments;
  };

  exports.updateAppointment = async (id, updatedAppointment) => {
    const appointments = await sql`
    update visits set ${sql(
      updatedAppointment,
      'pets_name',
      'owner_name',
      'date',
      'time',
      'notes',
      
    )}
    where id = ${id}
    returning *;
  `;
    return appointments[0];
  };

  exports.getAppointmentById = async (id) => {
    const appointments = await sql`
    SELECT vistis.*
      FROM visits 
      JOIN users ON visits.users.id = users.id
      WHERE visits.id = ${id};
      `;
    return appointments[0]; 
  };



