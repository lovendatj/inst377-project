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

        res.status(200).json({
            results: result
        });
    }
    catch(err){
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}
// Remove once deployed, for testing purposes
const dropAll = async (req, res, next) => {
    let result = undefined;
    try{
        result = await query(
            sql._remove_users
            ,[]
        )
        result = await query(
            sql._remove_orders
            ,[]
        )            
        res.status(200).json(
            {
                results: {
                    users: 'Removed',
                    orders: 'Removed'
                }
            }
        );
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
        const time = new Date().toLocaleString('en-us', {hour: 'numeric', minute: 'numeric'});
        let meal_category = 'B';
        switch(time){
            case time < '11:00':
                meal_category = 'B';
                break;
            case time < '14:00':
                meal_category = 'L';
                break;
            default:
                meal_category = 'D';
                break;
        }

        let result = null;
        if(req.params.hall_id !== undefined){
            result = await query(
                sql.getMenuAtHall
                ,[String(req.params.hall_id), meal_category] 
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

const getHall = async (req, res, next) => {
    try{
        if (req.params.id === undefined){
            res.status(400).json({
                error: 'Bad Request'
            });
            return;
        }
        let result = await query(
            sql.getHallInfo
            ,[req.params.id]
        );
        res.status(200).json({
            results: result
        });
        return;
    } catch (err){
        res.status(500).json({
            error: err
        });
        return;
    }
}

const getOrder = async (req, res, next) => {
    try{
        if (req.body.user_id === undefined      || 
            req.body.order_id === undefined     ||
            req.body.token === undefined){
            res.status(400).json({
                error: 'Bad Request'
            });
            return;
        }
        let order_info = await query(
            sql.getOrder
            ,[req.body.order_id, req.body.user_id, req.body.token]
        );
        let dining_hall_info = await query (
            sql.getHallInfoDay,
            [order_info[0].hall_id,(new Date().toLocaleString('en-us', {weekday:'long'})).toLowerCase()]
        );
        let result = {
            ...order_info[0],
            ...dining_hall_info[0]
        }
        res.status(200).json({
            results: result
        });
        return;
    } catch (err){
        res.status(500).json({
            error: err
        });
        return;
    }
}

const createOrder = async (req, res, next) => {
    try{
        if (req.body.hall_id === undefined      || 
            req.body.user_id === undefined      || 
            req.body.token === undefined        || 
            req.body.timestamp === undefined    || 
            req.body.items === undefined){
            res.status(400).json({
                error: 'Bad Request'
            });
            return;
        }
        let result = await query(
            sql.createOrder
            ,[  req.body.user_id, 
                req.body.token, 
                req.body.hall_id,
                req.body.timestamp, 
                JSON.stringify(req.body.items)
            ]
        );
        result = await query(
            `
                SELECT user_id, token, order_id FROM orders
                WHERE user_id = ? AND token = ? 
            `,
            [req.body.user_id, req.body.token]
        );
        res.status(200).json({
            results: result[0]
        });
        return;
    }
    catch(err){
        res.status(500).json({
            error: err
        });
        return;
    }
}

const deleteOrder = async (req, res, next) => {
    try{
        if (req.body.user_id === undefined      ||
            req.body.token === undefined        ||
            req.body.order_id === undefined){
            res.status(400).json({
                error: 'Bad Request'
            });
            return;
        }
        let result = await query(
            sql.deleteOrder
            ,[req.body.order_id, req.body.user_id, req.body.token]
        );
        res.status(200).json({
            results: result
        });
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
    } catch(err){
        res.status(500).json({
            error: err
        });
        return;
    }
}
// export modules
export {
    getDayDiningHallHours,
    getMenuAtHall,
    getHall,
    validateUser,
    createNewUser,
    getAllTables,
    dropAll,
    createOrder,
    getOrder,
    deleteOrder
};