const MiddlewareController = require('../app/controllers/MiddlewareController');
const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

router.get('/create', MiddlewareController.verifyToken, newsController.create);
router.post('/store', newsController.store);
router.get('/:id/edit', MiddlewareController.verifyToken, newsController.edit);
router.post('/handle-form-actions', newsController.handleFormActions);
router.post(
    '/handle-trash-form-actions',
    newsController.handletrashFormActions,
);
router.put('/:id', newsController.update);
router.patch('/:id/restore', newsController.restore);
router.delete('/:id', newsController.destroy);
router.delete('/:id/force', newsController.forceDestroy);
router.delete('/:id/forces', newsController.forcesDestroy);
router.get('/:slug', MiddlewareController.verifyToken, newsController.show);
router.get('/', MiddlewareController.verifyToken, newsController.index);

module.exports = router;
