#!/usr/bin/env python3
"""
Backend API Testing for D.S.P.Film's Photography Website
Tests all backend endpoints and validates data structure and content
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from frontend/.env
BASE_URL = "https://dsp-film-portfolio.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.results = {
            "total_tests": 0,
            "passed": 0,
            "failed": 0,
            "errors": []
        }
        
    def log_result(self, test_name, success, message="", data=None):
        """Log test result"""
        self.results["total_tests"] += 1
        if success:
            self.results["passed"] += 1
            print(f"✅ {test_name}: PASSED - {message}")
        else:
            self.results["failed"] += 1
            self.results["errors"].append(f"{test_name}: {message}")
            print(f"❌ {test_name}: FAILED - {message}")
        
        if data and success:
            print(f"   Data sample: {json.dumps(data, indent=2)[:200]}...")
            
    def test_api_health(self):
        """Test basic API health endpoint"""
        try:
            response = requests.get(f"{BASE_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "D.S.P.Film's Photography API" in data["message"]:
                    self.log_result("API Health Check", True, f"API is running, version: {data.get('version', 'unknown')}", data)
                    return True
                else:
                    self.log_result("API Health Check", False, f"Unexpected response format: {data}")
            else:
                self.log_result("API Health Check", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("API Health Check", False, f"Connection error: {str(e)}")
        return False
        
    def test_content_api(self):
        """Test content management API"""
        try:
            response = requests.get(f"{BASE_URL}/content", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check for expected content sections
                    sections = [item.get('section') for item in data if 'section' in item]
                    expected_sections = ['hero', 'about', 'contact']
                    
                    found_sections = [s for s in expected_sections if s in sections]
                    
                    # Look for Devendra's information
                    devendra_info = False
                    phone_found = False
                    location_found = False
                    
                    for item in data:
                        value = str(item.get('value', '')).lower()
                        if 'devendra' in value:
                            devendra_info = True
                        if '8308398378' in value:
                            phone_found = True
                        if 'ahilyanagar' in value:
                            location_found = True
                    
                    message = f"Found {len(data)} content items, sections: {found_sections}"
                    if devendra_info:
                        message += ", Devendra info: ✓"
                    if phone_found:
                        message += ", Phone: ✓"
                    if location_found:
                        message += ", Location: ✓"
                        
                    self.log_result("Content API", True, message, data[:2] if data else [])
                    return True
                else:
                    self.log_result("Content API", False, f"Expected array, got: {type(data)}")
            else:
                self.log_result("Content API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Content API", False, f"Connection error: {str(e)}")
        return False
        
    def test_services_api(self):
        """Test services API"""
        try:
            response = requests.get(f"{BASE_URL}/services", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check for expected number of services (should be 5)
                    service_count = len(data)
                    
                    # Check for required fields
                    valid_services = 0
                    photo_urls_found = 0
                    
                    for service in data:
                        if all(key in service for key in ['title', 'description', 'features', 'image']):
                            valid_services += 1
                            if service.get('image') and 'http' in service.get('image', ''):
                                photo_urls_found += 1
                    
                    message = f"Found {service_count} services, {valid_services} valid, {photo_urls_found} with photo URLs"
                    expected_count = service_count >= 3  # At least 3 services expected
                    
                    self.log_result("Services API", expected_count, message, data[:1] if data else [])
                    return expected_count
                else:
                    self.log_result("Services API", False, f"Expected array, got: {type(data)}")
            else:
                self.log_result("Services API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Services API", False, f"Connection error: {str(e)}")
        return False
        
    def test_portfolio_api(self):
        """Test portfolio API"""
        try:
            response = requests.get(f"{BASE_URL}/portfolio", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check for expected categories
                    categories = [item.get('category') for item in data if 'category' in item]
                    expected_categories = ['wedding', 'prewedding', 'cinematic', 'maternity']
                    
                    found_categories = [c for c in expected_categories if c in categories]
                    
                    # Check for photo URLs
                    photo_urls_found = 0
                    valid_items = 0
                    
                    for item in data:
                        if all(key in item for key in ['title', 'category', 'image']):
                            valid_items += 1
                            if item.get('image') and 'http' in item.get('image', ''):
                                photo_urls_found += 1
                    
                    message = f"Found {len(data)} portfolio items, categories: {found_categories}, {photo_urls_found} with photo URLs"
                    
                    self.log_result("Portfolio API", True, message, data[:1] if data else [])
                    return True
                else:
                    self.log_result("Portfolio API", False, f"Expected array, got: {type(data)}")
            else:
                self.log_result("Portfolio API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Portfolio API", False, f"Connection error: {str(e)}")
        return False
        
    def test_packages_api(self):
        """Test packages API"""
        try:
            response = requests.get(f"{BASE_URL}/packages", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check for pricing information
                    pricing_found = 0
                    valid_packages = 0
                    expected_prices = ['45,000', '90,000', '₹45,000', '₹90,000']
                    
                    for package in data:
                        if all(key in package for key in ['name', 'price', 'features']):
                            valid_packages += 1
                            price_str = str(package.get('price', ''))
                            if any(price in price_str for price in expected_prices):
                                pricing_found += 1
                    
                    message = f"Found {len(data)} packages, {valid_packages} valid, {pricing_found} with expected pricing"
                    
                    self.log_result("Packages API", True, message, data[:1] if data else [])
                    return True
                else:
                    self.log_result("Packages API", False, f"Expected array, got: {type(data)}")
            else:
                self.log_result("Packages API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Packages API", False, f"Connection error: {str(e)}")
        return False
        
    def test_testimonials_api(self):
        """Test testimonials API"""
        try:
            response = requests.get(f"{BASE_URL}/testimonials", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check for client reviews structure
                    valid_testimonials = 0
                    
                    for testimonial in data:
                        if all(key in testimonial for key in ['name', 'text', 'rating']):
                            valid_testimonials += 1
                    
                    message = f"Found {len(data)} testimonials, {valid_testimonials} valid client reviews"
                    
                    self.log_result("Testimonials API", True, message, data[:1] if data else [])
                    return True
                else:
                    self.log_result("Testimonials API", False, f"Expected array, got: {type(data)}")
            else:
                self.log_result("Testimonials API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Testimonials API", False, f"Connection error: {str(e)}")
        return False
        
    def test_inquiries_post_api(self):
        """Test POST inquiries API"""
        try:
            # Test data for inquiry
            inquiry_data = {
                "name": "Rajesh Kumar",
                "email": "rajesh.kumar@example.com",
                "phone": "9876543210",
                "eventType": "wedding",
                "eventDate": "2024-06-15",
                "message": "Looking for wedding photography services for my daughter's wedding in Pune. Please provide package details."
            }
            
            response = requests.post(f"{BASE_URL}/inquiries", json=inquiry_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, dict) and 'name' in data and data['name'] == inquiry_data['name']:
                    # Check if inquiry was created with proper fields
                    required_fields = ['name', 'email', 'eventType', 'status']
                    has_required = all(field in data for field in required_fields)
                    
                    if has_required and data.get('status') == 'new':
                        self.log_result("POST Inquiries API", True, "Inquiry created successfully with proper status", data)
                        return True
                    else:
                        self.log_result("POST Inquiries API", False, f"Missing required fields or incorrect status: {data}")
                else:
                    self.log_result("POST Inquiries API", False, f"Unexpected response format: {data}")
            else:
                self.log_result("POST Inquiries API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("POST Inquiries API", False, f"Connection error: {str(e)}")
        return False
        
    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 60)
        print("D.S.P.Film's Photography Backend API Testing")
        print("=" * 60)
        print(f"Testing backend at: {BASE_URL}")
        print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("-" * 60)
        
        # Run all tests
        tests = [
            ("API Health Check", self.test_api_health),
            ("Content API", self.test_content_api),
            ("Services API", self.test_services_api),
            ("Portfolio API", self.test_portfolio_api),
            ("Packages API", self.test_packages_api),
            ("Testimonials API", self.test_testimonials_api),
            ("POST Inquiries API", self.test_inquiries_post_api),
        ]
        
        for test_name, test_func in tests:
            print(f"\n🧪 Running {test_name}...")
            test_func()
        
        # Print summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.results['total_tests']}")
        print(f"Passed: {self.results['passed']} ✅")
        print(f"Failed: {self.results['failed']} ❌")
        print(f"Success Rate: {(self.results['passed']/self.results['total_tests']*100):.1f}%")
        
        if self.results['errors']:
            print("\n❌ FAILED TESTS:")
            for error in self.results['errors']:
                print(f"  - {error}")
        
        print(f"\nCompleted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        return self.results['failed'] == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)