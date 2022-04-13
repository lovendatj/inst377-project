CREATE VIEW vdh_info AS 
SELECT
    dh.hall_id,
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
    ) cte ON dh.hall_id = cte.hall_id;


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

--------------------------------------------------------------------------------
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    uuid TEXT NOT NULL,
);

CREATE TRIGGER user_hash_gen BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    SET NEW.uuid = SHA2(CONCAT(NEW.user_name, NEW.uuid), 256);
END;


--------------------------------------------------------------------------------
CREATE FUNCTION validate_user_exist(user_name TEXT, uuid TEXT)
RETURNS INTEGER
BEGIN
    IF EXISTS(SELECT * FROM users WHERE user_name = user_name AND uuid = uuid)
    THEN
        RETURN 1;
    ELSE
        RETURN 0;
    END IF;
END;

CREATE TRIGGER hash_order BEFORE INSERT ON order_history
FOR EACH ROW
BEGIN
    SET NEW.uuid = SHA2(CONCAT(NEW.user_name, NEW.uuid), 256);
    IF validate_user_exist(NEW.user_name, NEW.uuid) = 0
    THEN
        RAISE(ABORT, 'Invalid user');
    END IF;
END;

CREATE TABLE order_history (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    uuid TEXT NOT NULL,
    FOREIGN KEY (user_name, uuid) REFERENCES users(user_name, uuid)
)
CREATE TABLE order_history_macros (
    order_info_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    calories INTEGER NOT NULL,
    service_size INTEGER NOT NULL,
    cholesterol INTEGER NOT NULL,
    sodium INTEGER NOT NULL,
    carbs INTEGER NOT NULL,
    protein INTEGER NOT NULL,
    fat INTEGER NOT NULL,
    quantity INTEGER NOT NULL
    FOREIGN KEY (order_id) REFERENCES order_history(order_id),
)