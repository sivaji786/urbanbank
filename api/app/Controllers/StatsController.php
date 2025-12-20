<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\NewsModel;
use App\Models\EventsModel;
use App\Models\GalleryModel;
use App\Models\DownloadsModel;

class StatsController extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $newsModel = new NewsModel();
        $eventsModel = new EventsModel();
        $galleryModel = new GalleryModel();
        $downloadsModel = new DownloadsModel();

        return $this->respond([
            'news' => $newsModel->countAllResults(),
            'events' => $eventsModel->countAllResults(),
            'gallery' => $galleryModel->countAllResults(),
            'downloads' => $downloadsModel->countAllResults(),
        ]);
    }
}
