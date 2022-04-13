import express from 'express';
import {
    getMenuAtHall,
    getDayDiningHallHours,
    withExample
} from '../controller/database.controller.mjs';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API',
    });
});

apiRoutes.get('/test', withExample);

apiRoutes.get('/hours', getDayDiningHallHours)
    .get('/hours/:day', getDayDiningHallHours);

apiRoutes.get('/meals', getMenuAtHall)
    .get('/meals/:hall_id', getMenuAtHall);
// apiRoutes.get('/all', getAllTables)
// apiRoutes.get('/all/:table', getAllTables)

export default apiRoutes;