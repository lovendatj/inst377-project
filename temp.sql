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

CREATE VIEW dh_info AS 
    with test AS (
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