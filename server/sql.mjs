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
    CREATE VIEW dh_info AS 
    With test AS (
        SELECT
        hh.hall_hours_id,
        hh.hall_id,
        hh.day,
        hs.hours
        FROM
            hall_hours hh
            JOIN hall_schedule hs ON hh.schedule_id = hs.schedule_id
    )
    SELECT * From test;
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
    `SELECT * FROM vdining_hall_info WHERE day = ?;`
    

}
