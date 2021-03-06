import express from 'express';
import {
    getMenuAtHall,
    getHall,
    getDayDiningHallHours,
    validateUser,
    dropAll,
    createNewUser,
    getOrder,
    createOrder,
    deleteOrder
} from '../controller/database.controller.mjs';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API',
    });
});


apiRoutes.get('/hours', getDayDiningHallHours)
    .get('/hours/:day', getDayDiningHallHours);

apiRoutes.get('/meals', getMenuAtHall)
    .get('/meals/:hall_id', getMenuAtHall);

apiRoutes.post('/signin', validateUser);
apiRoutes.post('/signup', createNewUser, validateUser);

apiRoutes.get('/hall/:id', getHall);

apiRoutes.post('/order', createOrder)
    .post('/order/:id', getOrder)
    .delete('/order/:id', deleteOrder);

// apiRoutes.delete('/dropall', dropAll);

// Create a default not found route
apiRoutes.get('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found',
    });
});


// apiRoutes.get('/all', getAllTables)
// apiRoutes.get('/all/:table', getAllTables)

export default apiRoutes;