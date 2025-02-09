const {sql} = require('../dbConnection');
exports.createAppointment = async (newAppointment) => {
    const appointments = await sql`
      INSERT INTO visits ${sql(
        newAppointment,
        'user_id',
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

  exports.getAppointmentById = async (id, userId) => {
    const appointments = await sql`
      SELECT * FROM visits 
      WHERE id = ${id} AND user_id = ${userId};
    `;
    return appointments[0]; // Gražina tik vieną įrašą
  };
//visi vieno vartotojo vizitai
  exports.getUserAppointments = async (userId) => {
    const appointments = await sql`
      SELECT * FROM visits
      WHERE user_id = ${userId};
    `;
    return appointments;
};



exports.editAppointment = async (id, userId, visitData) => {
  const columns = Object.keys(visitData);
  const updatedVisit = await sql`
    UPDATE visits SET ${sql(visitData, columns)}
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *;
  `;
  return updatedVisit[0];
};

//delete 

exports.deleteAppointment = async (id, userId) => {
  const deletedAppointment = await sql`
    DELETE FROM visits WHERE id = ${id} 
    ${userId ? sql`AND user_id = ${userId}` : sql``}
    RETURNING *;
  `;
  return deletedAppointment[0];
};

//filter appointments using query string
exports.filterAppointments = async (filter) => {
  // Validate filter values to prevent SQL injection
  const validDirections = ['ASC', 'DESC'];
  const sortDirection = validDirections.includes(filter.sort?.toUpperCase())
    ? filter.sort.toUpperCase()
    : 'ASC';

  const appointments = await sql`
    SELECT visits.* 
    FROM visits
    WHERE visits.date <= ${filter.date}
      ${filter.owner_name ? sql`AND visits.owner_name LIKE ${'%' + filter.owner_name + '%'}` : sql``}
      ${filter.pets_name ? sql`AND visits.pets_name LIKE ${'%' + filter.pets_name + '%'}` : sql``}
    ORDER BY visits.pets_name ${sql.unsafe(sortDirection)}   
  `;
  return appointments;
};


exports.createAppointmentRating = async (id, userId, visitData) => {
  const columns = Object.keys(visitData);
  const updatedVisit = await sql`
    UPDATE visits SET ${sql(visitData, columns)}
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *;
  `;
  return updatedVisit[0];
};



