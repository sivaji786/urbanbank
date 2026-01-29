<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// Auth routes
$routes->post('login', 'AuthController::login');
$routes->get('me', 'AuthController::me');
$routes->post('update-profile', 'AuthController::updateProfile');
$routes->post('change-password', 'AuthController::changePassword');
$routes->get('stats', 'StatsController::index');

// Resource routes
$routes->resource('news', ['controller' => 'NewsController']);
$routes->post('news/(:num)', 'NewsController::update/$1');
$routes->resource('events', ['controller' => 'EventsController']);
$routes->post('events/(:num)', 'EventsController::update/$1');
$routes->resource('gallery', ['controller' => 'GalleryController']);
$routes->post('gallery/(:num)', 'GalleryController::update/$1');
$routes->resource('downloads', ['controller' => 'DownloadsController']);
$routes->post('downloads/(:num)', 'DownloadsController::update/$1');
$routes->resource('reports', ['controller' => 'ReportsController']);
$routes->post('reports/(:num)', 'ReportsController::update/$1');
$routes->resource('pages', ['controller' => 'PageController']);
$routes->post('pages/(:num)', 'PageController::update/$1');
$routes->resource('team-members', ['controller' => 'TeamMemberController']);
$routes->post('team-members/(:num)', 'TeamMemberController::update/$1');
$routes->resource('deaf-accounts', ['controller' => 'DeafAccountsController']);
$routes->resource('products', ['controller' => 'ProductController']);
$routes->post('products/(:num)', 'ProductController::update/$1'); // Handle POST for updates with file uploads
$routes->resource('branches', ['controller' => 'BranchesController']);
$routes->post('branches/(:num)', 'BranchesController::update/$1');
$routes->resource('services', ['controller' => 'ServicesController']);
$routes->post('services/(:num)', 'ServicesController::update/$1');
$routes->resource('service-charges', ['controller' => 'ServiceChargesController']);
$routes->post('service-charges/(:num)', 'ServiceChargesController::update/$1');
$routes->resource('gold-rates', ['controller' => 'GoldRatesController']);
$routes->post('gold-rates/(:num)', 'GoldRatesController::update/$1');
$routes->resource('quick-access', ['controller' => 'QuickAccessController']);
$routes->post('quick-access/(:num)', 'QuickAccessController::update/$1');
$routes->resource('service-icons', ['controller' => 'ServiceIconController']);
$routes->post('service-icons/(:num)', 'ServiceIconController::update/$1');

// Visitor tracking routes
$routes->post('track-visit', 'VisitorController::trackVisit');
$routes->get('visitor-stats', 'VisitorController::getStats');
$routes->get('visitor-logs', 'VisitorController::getLogs');
$routes->get('visitor-daily-stats', 'VisitorController::getDailyStats');
$routes->post('admin/block-ip', 'VisitorController::blockIP');

// Upload routes
$routes->get('media', 'UploadsController::index');
$routes->post('media', 'UploadsController::upload');
$routes->post('media/document', 'UploadsController::uploadDocument');
$routes->post('media/create-folder', 'UploadsController::createFolder');

// Settings routes
$routes->get('settings', 'SettingsController::index');
$routes->post('settings', 'SettingsController::update_settings');

// SEO routes
$routes->get('robots.txt', 'SeoController::robots');
$routes->get('sitemap.xml', 'SeoController::sitemap');

// Application routes
$routes->post('contact', 'ContactController::send');
$routes->post('applications/deposit', 'ApplicationController::submitDeposit');
$routes->post('applications/loan', 'ApplicationController::submitLoan');
$routes->get('applications', 'ApplicationController::index');
$routes->get('applications/statistics', 'ApplicationController::statistics');
$routes->get('applications/branches', 'ApplicationController::getBranches');
$routes->get('applications/check-duplicate', 'ApplicationController::checkDuplicate');
$routes->get('applications/(:num)', 'ApplicationController::show/$1');
$routes->get('applications/(:num)/status-logs', 'ApplicationController::getStatusLogs/$1');
$routes->put('applications/(:num)/status', 'ApplicationController::updateStatus/$1');
$routes->post('applications/(:num)/status', 'ApplicationController::updateStatus/$1');

// Database routes
$routes->get('database/migrate', 'DatabaseController::migrate');
$routes->get('database/seed', 'DatabaseController::seed');

// CORS preflight
$routes->options('(:any)', function () {
    $response = service('response');
    $response->setStatusCode(200);
    return $response;
});

