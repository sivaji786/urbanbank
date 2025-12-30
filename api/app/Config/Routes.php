<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// Auth routes
$routes->post('login', 'AuthController::login');
$routes->get('me', 'AuthController::me');
$routes->get('stats', 'StatsController::index');

// Resource routes
$routes->resource('news', ['controller' => 'NewsController']);
$routes->resource('events', ['controller' => 'EventsController']);
$routes->resource('gallery', ['controller' => 'GalleryController']);
$routes->resource('downloads', ['controller' => 'DownloadsController']);
$routes->resource('reports', ['controller' => 'ReportsController']);
$routes->resource('pages', ['controller' => 'PageController']);
$routes->resource('team-members', ['controller' => 'TeamMemberController']);
$routes->resource('deaf-accounts', ['controller' => 'DeafAccountsController']);
$routes->resource('products', ['controller' => 'ProductController']);
$routes->resource('branches', ['controller' => 'BranchesController']);
$routes->resource('services', ['controller' => 'ServicesController']);
$routes->resource('service-charges', ['controller' => 'ServiceChargesController']);

// Visitor tracking routes
$routes->post('track-visit', 'VisitorController::trackVisit');
$routes->get('visitor-stats', 'VisitorController::getStats');
$routes->get('visitor-logs', 'VisitorController::getLogs');
$routes->get('visitor-daily-stats', 'VisitorController::getDailyStats');

// Upload routes
$routes->get('uploads', 'UploadsController::index');
$routes->post('uploads', 'UploadsController::upload');
$routes->post('uploads/document', 'UploadsController::uploadDocument');
$routes->post('uploads/create-folder', 'UploadsController::createFolder');

// Settings routes
$routes->get('settings', 'SettingsController::index');
$routes->post('settings', 'SettingsController::update_settings');

// SEO routes
$routes->get('robots.txt', 'SeoController::robots');
$routes->get('sitemap.xml', 'SeoController::sitemap');

// Application routes
$routes->post('contact', 'ContactController::send');
$routes->post('applications/deposit', 'ApplicationController::deposit');
$routes->post('applications/loan', 'ApplicationController::loan');

// CORS preflight
$routes->options('(:any)', function () {
    $response = service('response');
    $response->setStatusCode(200);
    return $response;
});

