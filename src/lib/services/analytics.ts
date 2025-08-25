import { browser } from '$app/environment';
import { PUBLIC_WRITE_KEY_RUDDERSTACK, PUBLIC_DATA_PLANE_URI_RUDDERSTACK } from '$env/static/public';

let rudderAnalyticsInstance: any = null;
let initializationPromise: Promise<void> | null = null;

async function initialize(): Promise<void> {
	// Only initialize in browser and production environment
	if (!browser || import.meta.env.DEV) {
		if (import.meta.env.DEV) {
			console.log('RudderStack analytics disabled in development mode');
		}
		return;
	}

	// Check if we have the required configuration
	if (!PUBLIC_WRITE_KEY_RUDDERSTACK || !PUBLIC_DATA_PLANE_URI_RUDDERSTACK) {
		console.warn('RudderStack configuration is missing');
		return;
	}

	// Dynamically import RudderAnalytics
	const { RudderAnalytics } = await import('@rudderstack/analytics-js');
	
	// Create singleton instance
	rudderAnalyticsInstance = new RudderAnalytics();
	
	// Load the analytics library
	rudderAnalyticsInstance.load(
		PUBLIC_WRITE_KEY_RUDDERSTACK,
		PUBLIC_DATA_PLANE_URI_RUDDERSTACK
	);
}

function ensureInitialized(): Promise<void> {
	if (!initializationPromise) {
		initializationPromise = initialize();
	}
	return initializationPromise;
}

export async function page(name?: string, properties?: Record<string, any>): Promise<void> {
	await ensureInitialized();
	
	if (rudderAnalyticsInstance) {
		rudderAnalyticsInstance.page(name, properties);
	} else if (import.meta.env.DEV && browser) {
		console.log('RudderStack page event (dev mode):', { name, properties });
	}
}

export async function track(event: string, properties?: Record<string, any>): Promise<void> {
	await ensureInitialized();
	
	if (rudderAnalyticsInstance) {
		rudderAnalyticsInstance.track(event, properties);
	} else if (import.meta.env.DEV && browser) {
		console.log('RudderStack track event (dev mode):', { event, properties });
	}
}

export async function identify(userId: string, traits?: Record<string, any>): Promise<void> {
	await ensureInitialized();
	
	if (rudderAnalyticsInstance) {
		rudderAnalyticsInstance.identify(userId, traits);
	} else if (import.meta.env.DEV && browser) {
		console.log('RudderStack identify (dev mode):', { userId, traits });
	}
}

export async function reset(): Promise<void> {
	await ensureInitialized();
	
	if (rudderAnalyticsInstance) {
		rudderAnalyticsInstance.reset();
	} else if (import.meta.env.DEV && browser) {
		console.log('RudderStack reset (dev mode)');
	}
}