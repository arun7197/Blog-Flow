// middleware.ts
// Disable middleware for Netlify edge build
export default function middleware() {
  // Do nothing
}

export const config = {
  matcher: [],
};
