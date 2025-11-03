# cURL examples (use browser session cookies after OAuth)

# Get top searches (public)
curl http://localhost:4000/api/top-searches

# Login using browser by opening http://localhost:4000/auth/google
# Then use cookie jar saved to cookies.txt for API calls
curl -b cookies.txt -c cookies.txt -X POST http://localhost:4000/api/search -H "Content-Type: application/json" -d '{"term":"mountains"}'

# Get history (requires cookie)
curl -b cookies.txt http://localhost:4000/api/history
