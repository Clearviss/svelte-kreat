// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		user: {
			name: string
			role: string
			id: string
			money: int
		}
	}

	interface PageData {
		user: {
			name: string
			role: string
			id: string
			money: int
		}
	}
	// interface Platform {}
}



