import { appRouter } from '@/trpc'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

function handler(req: Request) {
	fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: appRouter,
		// @ts-expect-error context already passed from express middleware
		createContext() {
			return {}
		}
	})
}
export { handler as GET, handler as POST }
