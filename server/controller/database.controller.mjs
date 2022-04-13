import { query } from '../services/database.service.mjs';
import { sql } from '../sql.mjs';

// Remove once deployed, for testing purposes
const getAllTables = async (req, res, next) => {
    try{
        let result; 
        if (req.params.table !== undefined){
            result = await query(
                sql.getAllFromTable,
                [req.params.table]
            )
        }
        else {
            result = await query(
                sql._allTables
                ,[]
            )
        }

        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

const withExample = async (req, res, next) => {
    try{
        let result = await query(
            sql._withExample
            ,[]
        )
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json({
            error: err
        });
    }
}

const getExplore = async (req, res, next) => {
    try{
        let result = await query(
            sql._view_foodInformation
            // "select * from vmeal_info"
            // "drop view vmeal_info"
            ,[]
        )
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json({
            error: err
        });
    }
}

const getMenuAtHall = async (req, res, next) => {
    try{
        if(req.params.hall_id !== undefined){
            let result = await query(
                sql.getMenuAtHall
                ,[String(req.params.hall_id)] 
            )
            res.status(200).json(result);
            return;
        }
        let result = await query(
            sql.getAllMenu
            ,[]
        )
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json({
            error: err
        });
    }
}


// Returns Hours of a Given Dining Hall for a Given Day
// No day parameter returns all hours for all dining halls
// Improper day parameter returns hours for current day
// GET /api/hours/:day
const getDayDiningHallHours = async (req, res, next) => {
    let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dayNames = dayNames.map(day => day.toLowerCase());
    let day = req.params.day;
    if (day === undefined || day.toLowerCase() && dayNames.includes(day.toLowerCase()) === false){
        day = (new Date().toLocaleString('en-us', {weekday:'long'})).toLowerCase();
    }
    else {
        day = req.params.day.toLowerCase();
    }
    try{
        let result = await query(
            sql.getDayDiningHallHours
            ,[day]
        );
        res.status(200).json({
            results: result
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
// export modules
export {
    getDayDiningHallHours,
    getMenuAtHall,
    getAllTables,
    getExplore,
    withExample
};