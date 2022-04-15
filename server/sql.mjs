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
    _create_user:
    `
    CREATE TABLE users (
        user_id INT NOT NULL AUTO_INCREMENT,
        user_name VARCHAR(255) NOT NULL,
        user_password TEXT NOT NULL,
        salt TEXT NOT NULL,
        token TEXT NOT NULL,
        PRIMARY KEY (user_id)
    );
    `,
    _create_salt_trigger:
    `
    CREATE TRIGGER user_salt_trigger BEFORE INSERT ON users
    FOR EACH ROW
    BEGIN
        SET NEW.salt = UUID();
        SET NEW.user_password = SHA2(CONCAT(NEW.salt, NEW.user_password), 256);
        SET NEW.token = UUID();
    END;
    `,
    _get_users:
    `
    SELECT * FROM users;`,
    _remove_users:
    `DELETE FROM users;
    `,
    validateUser:
    `
    SELECT 
        user_id,
        user_name,
        token
    FROM users 
    WHERE 
        user_name = ? AND 
        user_password = (SHA2(CONCAT(salt, ?), 256));
    `,
    createUser: 
    `
    INSERT INTO users (user_name, user_password)
    VALUES (?, ?);
    `,
    validateUserAction:
    `
    SELECT EXISTS(
        SELECT 1
        FROM users
        WHERE user_name = ? AND token = ?
    )
    `,
    getAllFromTable:
    `SELECT * FROM ??;`,
    getDayDiningHallHours:
    `SELECT * FROM vdining_hall_info WHERE day = ?;`,
    getAllMenu:
    `SELECT * FROM vmeal_info;`,
    getMenuAtHall:
    `SELECT * FROM vmeal_info WHERE hall_id = ?;`,
    getHallInfo:
    `SELECT * FROM vdining_hall_info WHERE hall_id = ?;`,
}
