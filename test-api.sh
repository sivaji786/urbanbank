#!/bin/bash

# API Endpoint Test Script
# This script tests all API endpoints to identify missing or broken functionality

API_BASE_URL="http://localhost:8080/api"
PROD_API_URL="https://gcub.digitalks.in/api/public/index.php"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "Urban Bank API Endpoint Test"
echo "=========================================="
echo ""

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4
    
    echo -n "Testing: $description... "
    
    if [ "$method" == "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" -X GET "${API_BASE_URL}${endpoint}")
    elif [ "$method" == "POST" ]; then
        response=$(curl -s -w "\n%{http_code}" -X POST "${API_BASE_URL}${endpoint}" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" == "200" ] || [ "$http_code" == "201" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $http_code)"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $http_code)"
        echo "  Response: $body"
        return 1
    fi
}

# Track results
total_tests=0
passed_tests=0
failed_tests=0

echo "Testing Public Endpoints"
echo "----------------------------------------"

# Test Stats
test_endpoint "GET" "/stats" "Dashboard Statistics"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

# Test News
test_endpoint "GET" "/news" "Get All News"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

test_endpoint "GET" "/news/1" "Get News by ID"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

# Test Events
test_endpoint "GET" "/events" "Get All Events"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

# Test Gallery
test_endpoint "GET" "/gallery" "Get Gallery Images"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

# Test Downloads
test_endpoint "GET" "/downloads" "Get Downloads"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

# Test Financial Reports
test_endpoint "GET" "/reports" "Get Financial Reports"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

# Test Products
test_endpoint "GET" "/products?category=deposit" "Get Deposit Products"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

test_endpoint "GET" "/products?category=loan" "Get Loan Products"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

test_endpoint "GET" "/products/1" "Get Product by ID"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

# Test Branches
test_endpoint "GET" "/branches" "Get All Branches"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

# Test Team Members
test_endpoint "GET" "/team-members" "Get Team Members"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

# Test Deaf Accounts
test_endpoint "GET" "/deaf-accounts" "Get Deaf Accounts Info"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

# Test Settings
test_endpoint "GET" "/settings" "Get Settings"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

# Test Slider
test_endpoint "GET" "/slider" "Get Slider Images"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

# Test Pages
test_endpoint "GET" "/pages/about-us" "Get About Us Page"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

test_endpoint "GET" "/pages/vision-mission" "Get Vision Mission Page"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

test_endpoint "GET" "/pages/management" "Get Management Page"
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

echo ""
echo "Testing Application Endpoints"
echo "----------------------------------------"

# Test Loan Application
test_endpoint "POST" "/applications/loan" "Submit Loan Application" \
    '{"name":"Test User","email":"test@example.com","phone":"1234567890","loan_type":"Home Loan"}'
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

# Test Deposit Application
test_endpoint "POST" "/applications/deposit" "Submit Deposit Application" \
    '{"name":"Test User","email":"test@example.com","phone":"1234567890","deposit_type":"Fixed Deposit"}'
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

echo ""
echo "Testing Authentication Endpoints"
echo "----------------------------------------"

# Test Login
test_endpoint "POST" "/auth/login" "Admin Login" \
    '{"email":"admin@urbanbank.com","password":"admin123"}'
((total_tests++))
[ $? -eq 0 ] && ((passed_tests++)) || ((failed_tests++))

echo ""
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo "Total Tests: $total_tests"
echo -e "Passed: ${GREEN}$passed_tests${NC}"
echo -e "Failed: ${RED}$failed_tests${NC}"
echo ""

if [ $failed_tests -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please check the API configuration.${NC}"
    exit 1
fi
