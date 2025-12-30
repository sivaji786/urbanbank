<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\SettingsModel;

class SeoController extends ResourceController
{
    protected $modelName = 'App\Models\SettingsModel';
    protected $format = 'json';

    public function robots()
    {
        $settings = $this->model->getSettingsArray();
        $enabled = isset($settings['robots_enabled']) ? $settings['robots_enabled'] === '1' : true;

        if (!$enabled) {
            return $this->response->setStatusCode(404);
        }

        $content = $settings['robots_content'] ?? "User-agent: *\nDisallow: /admin/\nDisallow: /private/";

        return $this->response
            ->setBody($content)
            ->setHeader('Content-Type', 'text/plain; charset=UTF-8');
    }

    public function sitemap()
    {
        $settings = $this->model->getSettingsArray();
        $enabled = isset($settings['sitemap_enabled']) ? $settings['sitemap_enabled'] === '1' : true;

        if (!$enabled) {
            return $this->response->setStatusCode(404);
        }

        // Generate dynamic sitemap XML
        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        $domain = !empty($settings['domain_name']) ? rtrim($settings['domain_name'], '/') : rtrim(base_url(), '/');
        $priority = $settings['sitemap_priority'] ?? '0.5';
        $frequency = strtolower($settings['sitemap_frequency'] ?? 'weekly');

        // Static routes
        $routes = ['', 'about-us', 'management', 'vision-mission', 'contact', 'deaf-accounts', 'gallery', 'downloads', 'financial-reports', 'deposits', 'loans', 'services', 'news'];

        foreach ($routes as $route) {
            $xml .= '<url>';
            $xml .= '<loc>' . $domain . '/' . ($route ? '#' . $route : '') . '</loc>';
            $xml .= '<changefreq>' . $frequency . '</changefreq>';
            $xml .= '<priority>' . ($route === '' ? '1.0' : $priority) . '</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return $this->response
            ->setBody($xml)
            ->setHeader('Content-Type', 'application/xml; charset=UTF-8');
    }
}
