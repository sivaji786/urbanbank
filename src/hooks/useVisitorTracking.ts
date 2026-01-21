import { useEffect } from 'react';
import client from '../api/client';

// Generate a session ID for this browser session
const generateSessionId = () => {
    let sessionId = sessionStorage.getItem('visitor_session_id');
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('visitor_session_id', sessionId);
    }
    return sessionId;
};

export const useVisitorTracking = () => {
    useEffect(() => {
        const trackVisit = async () => {
            // Check if already tracked in this session
            const hasTracked = sessionStorage.getItem('visitor_tracked');
            if (hasTracked === 'true') {
                console.debug('Visitor already tracked in this session');
                return;
            }

            try {
                const sessionId = generateSessionId();
                const referrer = document.referrer || null;
                const pageUrl = window.location.href;

                await client.post('track-visit', {
                    session_id: sessionId,
                    referrer,
                    page_url: pageUrl,
                });

                // Mark as tracked for this session
                sessionStorage.setItem('visitor_tracked', 'true');
            } catch (error) {
                // Silently fail - don't disrupt user experience
                console.debug('Visitor tracking failed:', error);
            }
        };

        // Track visit after a small delay to not block initial page load
        const timer = setTimeout(trackVisit, 1000);

        return () => clearTimeout(timer);
    }, []); // Run only once on mount
};
