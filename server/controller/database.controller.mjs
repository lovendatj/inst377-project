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
// Remove once deployed, for testing purposes
const dropAll = async (req, res, next) => {
    try{
        let result = await query(
            sql._remove_users
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

const validateUser = async (req, res, next) => {    
    if (req.body.username === undefined || req.body.password === undefined){
        res.status(400).json({
            error: 'Bad Request'
        });
        return;
    }
    try{
        let result = await query(
            sql.validateUser
            ,[req.body.username, req.body.password]
        )
        if (result.length === 0){
            res.status(401).json({
                error: 'Invalid username or password'
            });
            return;
        }
        res.status(200).json({
            user : {...result[0]}
        });
    }
    catch(err){
        res.status(500).json({
            error: err
        });
    }
}

const createNewUser = async (req, res, next) => {
    try{
        let result = await query(
            sql.createUser
            ,[req.body.username, req.body.password]
        )
        res.status(200).json({
            user : {...result[0]}
        });
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error: err
        });
    }
}

const getMenuAtHall = async (req, res, next) => {
    try{
        let result = null;
        if(req.params.hall_id !== undefined){
            result = await query(
                sql.getMenuAtHall
                ,[String(req.params.hall_id)] 
            )
            if (result.length === 0){
                res.status(404).json({
                    error: 'No menu found'
                });
                return;
            }
            res.status(200).json({
                results: result
            });
        } else {
            result = await query(
                sql.getAllMenu
                ,[]
            )
            res.status(200).json({
                results: result
            });
        }
        return;
    }
    catch(err){
        res.status(500).json({
            error: err
        });
        return;
    }
}

// Returns Hours of a Given Dining Hall for a Given Day
// No day parameter returns all hours for all dining halls
// Improper day parameter returns hours for current day
// GET /api/hours/:day

let dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const getDayDiningHallHours = async (req, res, next) => {
    let day = req.params.day;
    if (day === undefined || 
        dayNames.includes(day.toLowerCase()) === false){
        day = (new Date().toLocaleString('en-us', {weekday:'long'})).toLowerCase();
    } 
    try{
        let result = await query(
            sql.getDayDiningHallHours
            ,[day]
        );
        res.status(200).json({
            results: result
        });
        return;
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
        return;
    }
}
// export modules
export {
    getDayDiningHallHours,
    getMenuAtHall,
    validateUser,
    createNewUser,
    getAllTables,
    dropAll
};