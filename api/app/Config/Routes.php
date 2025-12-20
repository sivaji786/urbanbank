<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('api', function($routes) {
    $routes->post('login', 'AuthController::login');
    $routes->get('me', 'AuthController::me');
    $routes->get('stats', 'StatsController::index');

    $routes->resource('news', ['controller' => 'NewsController']);
    $routes->resource('events', ['controller' => 'EventsController']);
    $routes->resource('gallery', ['controller' => 'GalleryController']);
    $routes->resource('downloads', ['controller' => 'DownloadsController']);
    $routes->resource('reports', ['controller' => 'ReportsController']);
    $routes->resource('pages', ['controller' => 'PageController']);
    $routes->resource('team-members', ['controller' => 'TeamMemberController']);
    $routes->resource('deaf-accounts', ['controller' => 'DeafAccountsController']);
    $routes->resource('products', ['controller' => 'ProductController']);
    $routes->get('uploads', 'UploadsController::index');
    $routes->post('uploads', 'UploadsController::upload');
    $routes->post('uploads/document', 'UploadsController::uploadDocument');
    $routes->post('uploads/create-folder', 'UploadsController::createFolder');

    $routes->get('settings', 'SettingsController::index');
    $routes->post('settings', 'SettingsController::update_settings');
    $routes->post('contact', 'ContactController::send');
    $routes->post('applications/deposit', 'ApplicationController::deposit');
    $routes->post('applications/loan', 'ApplicationController::loan');
$routes->resource('branches', ['controller' => 'BranchesController']);

    $routes->options('(:any)', function() {
        $response = service('response');
        $response->setStatusCode(200);
        return $response;
    });
});
