import { useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | 'product';
    schema?: any;
    canonical?: string;
}

export function SEO({
    title,
    description,
    keywords,
    ogImage,
    ogType = 'website',
    schema,
    canonical
}: SEOProps) {
    const { settings } = useSettings();

    useEffect(() => {
        // 1. Update Title
        const siteName = settings.site_name || 'Guntur Co-operative Urban Bank';
        const siteTitle = settings.meta_title || siteName;
        const finalTitle = title ? `${title} | ${siteName}` : `${siteTitle} - ${settings.site_tagline || 'Banking Excellence'}`;
        document.title = finalTitle;

        // 2. Helper to get or create elements
        const getOrCreateMeta = (name: string, isProperty = false) => {
            const attr = isProperty ? 'property' : 'name';
            let element = document.head.querySelector(`meta[${attr}="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attr, name);
                document.head.appendChild(element);
            }
            return element;
        };

        const getOrCreateScript = (id: string) => {
            let element = document.getElementById(id) as HTMLScriptElement;
            if (!element) {
                element = document.createElement('script');
                element.id = id;
                document.head.appendChild(element);
            }
            return element;
        };

        // 3. Update Meta Description & Keywords
        const finalDescription = description || settings.meta_description_seo || settings.site_description || 'The Guntur Co-operative Urban Bank Limited stands as a premiere co-operative bank in Andhra Pradesh.';
        getOrCreateMeta('description').setAttribute('content', finalDescription);

        const finalKeywords = keywords || settings.meta_keywords;
        if (finalKeywords) {
            getOrCreateMeta('keywords').setAttribute('content', finalKeywords);
        }

        // 4. OpenGraph Tags
        const finalOgImage = ogImage || settings.og_image;
        getOrCreateMeta('og:title', true).setAttribute('content', finalTitle);
        getOrCreateMeta('og:description', true).setAttribute('content', finalDescription);
        getOrCreateMeta('og:type', true).setAttribute('content', ogType);
        if (finalOgImage) {
            getOrCreateMeta('og:image', true).setAttribute('content', finalOgImage);
        }

        const domain = settings.domain_name || window.location.origin;
        const path = window.location.hash || '';
        const finalUrl = `${domain}${path.startsWith('/') ? '' : '/'}${path}`;
        getOrCreateMeta('og:url', true).setAttribute('content', finalUrl);

        // 5. Twitter Cards
        getOrCreateMeta('twitter:card').setAttribute('content', 'summary_large_image');
        getOrCreateMeta('twitter:title').setAttribute('content', finalTitle);
        getOrCreateMeta('twitter:description').setAttribute('content', finalDescription);
        if (finalOgImage) {
            getOrCreateMeta('twitter:image').setAttribute('content', finalOgImage);
        }

        // 6. Canonical Link
        const isCanonicalEnabled = settings.canonical_enabled === '1';
        let linkElement = document.head.querySelector('link[rel="canonical"]');
        if (isCanonicalEnabled) {
            let finalCanonical = canonical;
            if (!finalCanonical) {
                const domain = settings.domain_name || window.location.origin;
                const path = window.location.hash || '';
                finalCanonical = `${domain}${path.startsWith('/') ? '' : '/'}${path}`;
            }

            if (!linkElement) {
                linkElement = document.createElement('link');
                linkElement.setAttribute('rel', 'canonical');
                document.head.appendChild(linkElement);
            }
            linkElement.setAttribute('href', finalCanonical);
        } else if (linkElement) {
            linkElement.remove();
        }

        // 7. Robots Meta (Noindex/Nofollow)
        const isNoIndex = settings.noindex_enabled === '1';
        if (isNoIndex) {
            getOrCreateMeta('robots').setAttribute('content', 'noindex, nofollow');
        } else {
            const robotsMeta = document.head.querySelector('meta[name="robots"]');
            if (robotsMeta) robotsMeta.remove();
        }

        // 8. Webmaster Verification
        if (settings.google_verification) getOrCreateMeta('google-site-verification').setAttribute('content', settings.google_verification);
        if (settings.bing_verification) getOrCreateMeta('msvalidate.01').setAttribute('content', settings.bing_verification);
        if (settings.yandex_verification) getOrCreateMeta('yandex-verification').setAttribute('content', settings.yandex_verification);
        if (settings.pinterest_verification) getOrCreateMeta('p:domain_verify').setAttribute('content', settings.pinterest_verification);

        // 9. Analytics Integration
        const isAnalyticsEnabled = settings.analytics_enabled === '1';
        if (isAnalyticsEnabled) {
            // Google Analytics (Gtag)
            if (settings.ga_tracking_id) {
                const gaScript = getOrCreateScript('ga-external');
                gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${settings.ga_tracking_id}`;
                gaScript.async = true;

                const gaInline = getOrCreateScript('ga-inline');
                gaInline.text = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${settings.ga_tracking_id}', { 'anonymize_ip': ${settings.anonymize_ip === '1'} });
        `;
            }

            // Google Tag Manager
            if (settings.gtm_id) {
                const gtmScript = getOrCreateScript('gtm-script');
                gtmScript.text = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${settings.gtm_id}');
        `;
            }

            // Facebook Pixel
            if (settings.fb_pixel_id) {
                const fbScript = getOrCreateScript('fb-pixel');
                fbScript.text = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${settings.fb_pixel_id}');
          fbq('track', 'PageView');
        `;
            }

            // Custom Tracking Scripts
            if (settings.custom_scripts) {
                const customId = 'custom-tracking-scripts';
                let customEl = document.getElementById(customId);
                if (!customEl) {
                    customEl = document.createElement('div');
                    customEl.id = customId;
                    customEl.style.display = 'none';
                    document.head.appendChild(customEl);
                }
                customEl.innerHTML = settings.custom_scripts;
            }
        }

        // 10. JSON-LD Schema
        const scriptId = 'seo-schema-script';
        let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
        if (scriptElement) {
            scriptElement.remove();
        }

        if (schema) {
            scriptElement = document.createElement('script');
            scriptElement.id = scriptId;
            scriptElement.type = 'application/ld+json';
            scriptElement.text = JSON.stringify(schema);
            document.head.appendChild(scriptElement);
        }


        return () => {
            // Cleanup schema on unmount if needed, though usually pages replace it
        };
    }, [title, description, keywords, ogImage, ogType, schema, canonical, settings]);

    return null;
}
