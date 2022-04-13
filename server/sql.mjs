export const sql = {
    _allDatabases:
    `SHOW DATABASES;`,
    _allTables:
    `SHOW TABLES;`,
    _dbversion:
    `
    SELECT @@VERSION;
    `,
    _withExample:
    `
    SELECT * From vmeal_info;
    `,  
    _view_foodInformation:
    `    
    CREATE VIEW vmeal_info AS
    SELECT 
        m.meal_name,
        m.meal_category,
        dr.restriction_type,
        ml.hall_id,
        mm.*
    FROM
        meals m
        JOIN macros mm ON m.meal_id = mm.meal_id
        JOIN meals_locations ml ON m.meal_id = ml.meal_id
        JOIN meal_restrictions mr ON m.meal_id = mr.meal_id
        JOIN dietary_restrictions dr ON mr.restriction_id = dr.restriction_id;
    `,
    _view_diningHallInfo:
    `
        CREATE VIEW vdining_hall_info AS
        SELECT
            dh.hall_name,
            dh.hall_address,
            dh.hall_lat,
            dh.hall_long,
            cte.*
        FROM
            dining_hall dh
            JOIN (
                SELECT
                hh.hall_hours_id,
                hh.hall_id,
                hh.day,
                hs.hours
                FROM
                    hall_hours hh
                    JOIN hall_schedule hs ON hh.schedule_id = hs.schedule_id
            ) cte ON dh.hall_id = cte.hall_id;`,
    getAllFromTable:
    `SELECT * FROM ??;`,
    getDayDiningHallHours:
    `SELECT * FROM vdining_hall_info WHERE day = ?;`,
    getAllMenu:
    `SELECT * FROM vmeal_info;`,
    getMenuAtHall:
    `SELECT * FROM vmeal_info WHERE hall_id = ?;`,
    

}
