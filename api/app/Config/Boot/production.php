<?php

/*
 |--------------------------------------------------------------------------
 | ERROR DISPLAY
 |--------------------------------------------------------------------------
 | Don't show ANY in production environments. Instead, let the system catch
 | it and display a generic error message.
 |
 | If you set 'display_errors' to '1', CI4's detailed error report will show.
 */
error_reporting(E_ALL & ~E_DEPRECATED);
// If you want to suppress more types of errors.
// error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT & ~E_USER_NOTICE & ~E_USER_DEPRECATED);
ini_set('display_errors', '0');

/*
 |--------------------------------------------------------------------------
 | DEBUG MODE
 |--------------------------------------------------------------------------
 | Debug mode is an experimental flag that can allow changes throughout
 | the system. It's not widely used currently, and may not survive
 | release of the framework.
 */
defined('CI_DEBUG') || define('CI_DEBUG', false);

/*
 |--------------------------------------------------------------------------
 | LOCALE POLYFILL
 |--------------------------------------------------------------------------
 | Polyfill for missing Locale class when intl extension is not available
 */
if (!class_exists('Locale')) {
    class Locale
    {
        private static $default = 'en';

        public static function getDefault()
        {
            return self::$default;
        }

        public static function setDefault($locale)
        {
            self::$default = $locale;
            return true;
        }

        public static function acceptFromHttp($header)
        {
            return self::$default;
        }

        public static function getPrimaryLanguage($locale)
        {
            $parts = explode('_', $locale);
            return $parts[0] ?? 'en';
        }

        public static function getRegion($locale)
        {
            $parts = explode('_', $locale);
            return $parts[1] ?? '';
        }

        public static function canonicalize($locale)
        {
            return str_replace('-', '_', $locale);
        }
    }
}

