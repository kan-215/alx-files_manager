import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

function controllerRouting(app) {
  const router = express.Router();
  app.use('/', router);

  // App manger

  // returns if Redis and DB are active
  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  // returns the number of users and files in DB
  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });

  // User manager

  // creates a new user in DB
  router.post('/users', (req, res) => {
    UsersController.postNew(req, res);
  });

  // retrieves the user based on the token used
  router.get('/users/me', (req, res) => {
    UsersController.getMe(req, res);
  });

  // Auth manager

  // signs-in the user by generating a new authentication token
  router.get('/connect', (req, res) => {
    AuthController.getConnect(req, res);
  });

  // signs-out the user based on the token
  router.get('/disconnect', (req, res) => {
    AuthController.getDisconnect(req, res);
  });


  // creates a new file in Database and in disk
  router.post('/files', (req, res) => {
    FilesController.postUpload(req, res);
  });

  //retrieves the file document based on the ID
  router.get('/files/:id', (req, res) => {
    FilesController.getShow(req, res);
  });

  // retrieves all users file documents for a
  // specific parentId and with pagination
  router.get('/files', (req, res) => {
    FilesController.getIndex(req, res);
  });

  // sets isPublic to true on the file document based on the ID
  router.put('/files/:id/publish', (req, res) => {
    FilesController.putPublish(req, res);
  });

  // sets isPublic to false on the file document based on the ID
  router.put('/files/:id/unpublish', (req, res) => {
    FilesController.putUnpublish(req, res);
  });

  // returns the content of the file document based on the ID
  router.get('/files/:id/data', (req, res) => {
    FilesController.getFile(req, res);
  });
}

export default controllerRouting;
